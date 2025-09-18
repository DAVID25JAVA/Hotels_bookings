import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { facilityIcons, roomsDummyData } from "../../../public/assets";
import StarRating from "@/components/StarRating";
import { assets } from "../../../public/assets";
import { roomCommonData } from "../../../public/assets";

function RoomDetails() {
  const router = useRouter();
  const roomsId = router.query?.id;

  const [roomsData, setRoomsData] = useState({});
  const [roomImage, setRoomImage] = useState();

  useEffect(() => {
    const roomData = roomsDummyData?.find((roomId) => roomId?._id == roomsId);
    roomData && setRoomsData(roomData);
    roomData && setRoomImage(roomData?.images[0]);
  }, [roomsId]);

  console.log("Rooms data----->", roomsData);

  return (
    roomsData && (
      <div className="  md:my-36 my-20 md:max-w-8xl w-full mx-auto xl:px-20 px-4">
        <div className="2xl:container 2xl:mx-auto"></div>
        {/* Rooms details code */}
        <div className="flex items-center gap-5">
          <p className="text-black md:text-4xl text-2xl">
            {roomsData?.hotel?.name}{" "}
            <span className="text-base">{`(${roomsData?.roomType})`} </span>
          </p>
          <p className="text-white uppercase bg-orange-500 w-24 h-7 rounded-full text-center flex justify-center  items-center font-semibold">
            20% off
          </p>
        </div>
        <div className="flex gap-3 mt-2 items-center">
          <StarRating />
          <span className="text-black text-lg font-playfair ">200+ review</span>
        </div>
        <p className="text-lg mt-2 text-gray-600 flex items-center gap-2">
          <span>
            <img
              className="w-4"
              src={assets?.locationIcon?.src}
              alt={assets?.locationIcon}
            />
          </span>
          {roomsData?.hotel?.address}
        </p>

        {/* Room Images */}
        <div className="flex flex-col md:flex-row gap-3 my-3">
          <img
            src={roomImage?.src}
            alt="room image"
            className=" rounded-2xl md:w-1/2"
          />
          <div className="grid grid-cols-2  gap-3 cursor-pointer">
            {roomsData?.images?.map((img) => (
              <img
                src={img?.src}
                onClick={() => setRoomImage(img)}
                alt="room img"
                className={`rounded-2xl ${
                  roomImage == img && "border-3 border-orange-500"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Rooms Highlights */}
        <div className="mt-8 flex items-center justify-between flex-wrap">
          <h1 className="text-black text-xl md:text-3xl">
            {" "}
            Experience Luxury Like Never Before
          </h1>
          <p className="text-gray-800 font-semibold text-xl md:text-2xl">
            ${roomsData?.pricePerNight}/night
          </p>
        </div>

        <div className="flex flex-wrap  mt-5 gap-5 ">
          {roomsData?.amenities?.map((item, index) => {
            return (
              <div
                key={index}
                className="w-[140px] bg-gray-100 px-2 py-1 flex items-center justify-center gap-2 rounded-full"
              >
                <img
                  src={facilityIcons[item]?.src}
                  alt={item}
                  className="w-5 h-8"
                />
                <p className="text-black text-sm">{item}</p>
              </div>
            );
          })}
        </div>

        {/* Check Room Availability */}
        <div
          style={{ boxShadow: "0 2px 10px rgba(0,0,0,0.15)" }}
          className="mt-10 py-8 rounded-2xl flex items-center flex-wrap gap-5 md:gap-0 justify-between px-10"
        >
          <div className="flex gap-5 flex-wrap">
            <div className="flex flex-col">
              <label className="text-gray-600 font-semibold">Check-In</label>
              <input
                type="date"
                className="border p-2 border-gray-300 rounded md:w-60 max-w-full text-gray-600"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-600 font-semibold">Check-In</label>
              <input
                type="date"
                className="border p-2 border-gray-300 rounded md:w-60 max-w-full text-gray-600"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-600 font-semibold">Guests</label>
              <input
                type="number"
                value={1}
                className="border p-2 border-gray-300 rounded md:w-16 text-gray-600"
              />
            </div>
          </div>

          {/* Button */}
          <div>
            <button className="bg-blue-600 text-white text-xl md:w-80 w-full px-6 md:px-0 cursor-pointer h-14 rounded">
              Check Availability
            </button>
          </div>
        </div>

        {/* Room Specification  */}
        <div className="mt-10 mb-5">
          {roomCommonData?.map((item, index) => (
            <div key={index} className="">
              <div className="flex items-center gap-3 py-2">
                <img src={item?.icon?.src} alt="icon img" className="w-7" />
                <div>
                  <p className="text-black text-lg">{item?.title}</p>
                  <p className="text-lg text-gray-600">{item?.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <hr className="md:max-w-5xl w-full" />

        <div className="my-10 text-gray-600 text-lg font-playfair w-full md:max-w-5xl">
          <p>
            Escape to comfort and luxury with our top-rated hotel stays. Book
            your perfect getaway in just a few clicks—fast, easy, and secure.
            Choose from a wide range of hotels to fit every budget and style.
            Enjoy exclusive deals, flexible cancellations, and 24/7 customer
            support. Start your journey with us and experience unforgettable
            hospitality.
          </p>
        </div>
        <hr className="md:max-w-5xl w-full" />

        {/* Hosted By */}
        <div className="my-5 md:my-10 flex gap-4">
          <div>
            <img
              src={roomsData?.hotel?.owner?.image}
              className="w-14 h-14 rounded-full"
            />
          </div>
          <div>
            <p className="text-gray-600 font-semibold text-lg">
              Hosted by : {roomsData?.hotel?.name}
            </p>
            <div>
              <div className="flex text-gray-600 items-center gap-2">
                <StarRating />
                <p>200+ reviews</p>
              </div>
            </div>
          </div>
        </div>

        <button className="bg-blue-600 text-white my-2 md:w-40 w-32 h-12 rounded-lg">Contact Now</button>
      </div>
    )
  );
}

export default RoomDetails;
