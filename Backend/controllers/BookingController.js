import Booking from "../models/Booking.js";
import Hotel from "../models/Hotel.js";

// function to check availability of room
const checAvailability = async ({ checkInDate, checkOutDate, room }) => {
  try {
    const booking = await Booking.find({
      room,
      checkInDate: { $lte: checkOutDate },
      checkOutDate: { $gte: checkInDate },
    });
    const isAvailable = booking.length === 0;
    return isAvailable;
  } catch (error) {
    console.log(error.message);
  }
};

// check room availbility by API
// Api---->"/api/bookings/check-availability"
export const checkAvailbilityApi = async (req, res) => {
  try {
    const { room, checkInDate, checkOutDate } = req.body;
    const isbookingAvailable = await checAvailability({
      room,
      checkInDate,
      checkOutDate,
    });
    res.json({ success: true, isbookingAvailable });
  } catch (error) {
    res.json({ success: false, message: error?.message });
  }
};

// create new bookings Post API--------->
// API-------> "/api/bookings/book"
export const createBookings = async (req, res) => {
  try {
    const { checkInDate, checkOutDate, guests, room } = req.body;
    const user = req.user._id;
    const isAvailable = await checAvailability({
      room,
      checkInDate,
      checkOutDate,
    });
    if (!isAvailable)
      return res.json({ success: false, message: "Room is not available" });

    console.log("data----->", checkInDate, checkOutDate, guests, room, user);

    //   get total price from room
    const roomData = await Hotel.findById(room).populate("hotel");
    console.log(roomData);
    let totalPrice = roomData.pricePerNight;

    //   Calculate total price based on nights
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const timeDiff = checkOut.getTime() - checkIn.getTime();
    const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));
    totalPrice *= nights;

    const booking = await Booking.create({
      user,
      room,
      checkInDate,
      checkOutDate,
      guests: +guests,
      hotel: roomData?.hotel?._id,
      totalPrice,
    });

    console.log("bboking--->", booking);

    res.json({ success: true, message: "Booking created successfully" });
  } catch (error) {
    console.log(error?.message);
    res.json({ success: false, message: `Booking Faild ${error?.message}` });
  }
};

// Api to get all booking for user
// GET "/api/bookings/user"
export const getAllBookingByUser = async (req, res) => {
  try {
    const user = req.user?._id;
    const getBooking = await Booking.find({ user })
      .populate("room hotel")
      .sort({ createdAt: -1 });
    res.json({ success: true, getBooking });
  } catch (error) {
    res.json({ success: false, message: error?.message });
  }
};

export const getHotelBookings = async (req, res) => {
  try {
    const hotel = await Hotel.findOne({ owner: req.auth.userId });
    if (!hotel) return res.json({ success: false, message: "Hotel not found" });
    const booking = await Booking.find({ hotel: hotel?._id })
      .populate("room hotel user")
      .sort({ created: -1 });

    //   Total booking
    const totalBookings = booking.length;
    // Total revenue
    const revenue = booking.reduce(
      (acc, booking) => acc + booking.totalPrice,
      0
    );
    res.json({ success: true, dashboardData: { totalBookings, revenue } });
  } catch (error) {
    res.json({ success: false, message: "Faild to fetch booking" });
  }
};
