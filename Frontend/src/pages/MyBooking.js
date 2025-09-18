import React, { useState } from "react";
import { assets, userBookingsDummyData } from "../../public/assets";
import moment from "moment";
import Loader from "@/components/Loader";

function MyBooking() {
  console.log("booking data---->", userBookingsDummyData);
  const [booking, setBoking] = useState(userBookingsDummyData);

  return (
    <div className=" md:max-w-8xl h-screen   xl:px-20 px-5 mx-auto w-full my-28">
      <div className="2xl:container  2xl:mx-auto">
        <p className="md:text-4xl text-3xl   text-black">My Booking</p>
        <p className="text-gray-600 text-lg max-w-xl mt-2">
          Book your stay with us and enjoy comfort, convenience, and warm
          hospitality. Our modern rooms and top-notch amenities ensure a
          relaxing experience. Reserve your room quickly and securely in just a
          few steps.
        </p>

        {!booking ? (
          <Loader />
        ) : (
          <div>
            <div className="hidden md:grid md:grid-cols-[4fr_3fr_0fr] w-full border-b border-gray-300 text-base my-5 md:my-10 py-2 ">
              <div className="w-1/3 text-black font-semibold text-lg ">
                Hotels
              </div>
              <div className="w-[45%] text-black font-semibold text-lg ">
                Date & Timinings
              </div>
              <div className=" text-black font-semibold text-lg ">Payment</div>
            </div>

            {booking?.map((item) => (
              <div
                key={item._id}
                className="flex flex-col md:flex-row gap-5 justify-between border-b-[1px] my-5 pb-5"
              >
                {/* Hotel Details */}
                <div className=" flex flex-col md:flex-row md:items-center gap-5 ">
                  <div className="md:w-44 rounded ">
                    <img src={item?.room?.images[0]?.src} className="rounded" />
                  </div>

                  <div className="">
                    {/* Name */}
                    <p className="text-2xl text-black">
                      {item?.room?.hotel?.name}{" "}
                      <span className="text-base">
                        ({item?.room?.roomType})
                      </span>
                    </p>
                    {/* Location */}
                    <div className="flex items-center gap-2">
                      <img src={assets?.locationIcon?.src} className="w-4" />
                      <p className="text-gray-600 text-base">
                        {item?.room?.hotel?.address}
                      </p>
                    </div>
                    {/* Guest */}
                    <div className="flex items-center gap-2">
                      <img src={assets?.guestsIcon?.src} className="w-4" />
                      <p className="text-gray-600 text-base">
                        Guests: {item?.guests}
                      </p>
                    </div>

                    {/* Total Price */}
                    <div>
                      <p className="text-black text-lg">
                        Total: ${item?.totalPrice}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Date & Time */}
                <div className="flex gap-5 ">
                  <div className="">
                    <p className="text-black text-lg font-semibold">
                      Check In:{" "}
                    </p>
                    <p className="text-gray-600 text-base">
                      {moment(item?.checkInDate).format("MMMM  Do , YYYY")}
                    </p>
                  </div>
                  <div className="">
                    <p className="text-black text-lg font-semibold">
                      Check Out:{" "}
                    </p>
                    <p className="text-gray-600 text-base">
                      {moment(item?.checkOutDate).format("MMMM  Do , YYYY")}
                    </p>
                  </div>
                </div>

                {/* Payment status */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <p
                      className={`h-3 w-3 rounded-full ${
                        item?.isPaid ? "bg-green-600" : "bg-red-500"
                      }`}
                    ></p>
                    <p
                      className={`text-base ${
                        item?.isPaid ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {item?.isPaid ? "Paid" : "Unpaid"}
                    </p>
                  </div>
                  {!item?.isPaid && (
                    <button className="text-gray-600 text-base w-24 h-8 cursor-pointer rounded-full border">
                      Pay now
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyBooking;
