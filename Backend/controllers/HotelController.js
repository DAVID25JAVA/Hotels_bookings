import Hotel from "../models/Hotel.js";
import User from "../models/User.js";

// Hotel register API;
export const hotelRegister = async (req, res) => {
  try {
    const { name, city, contact, addres } = req?.body;
    const owner = req.user?._id;
    const hotel = await Hotel.findOne({ owner });
    if (hotel)
      return res.json({ success: false, message: "Hotel Already Registered" });

      await Hotel.create({ name, contact, addres, city, owner });
      await User.findByIdAndUpdate(owner, { role: "hotelOwner" });
      res.json({ success: true, message: "Hotel Registered Successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
