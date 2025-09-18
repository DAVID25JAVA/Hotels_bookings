import React from "react";
import { assets, roomsDummyData } from "../../public/assets";
import Image from "next/image";
import { useRouter } from "next/router";

function FeaturedDestination() {
  const router = useRouter();
  console.log("rooms Data--->", roomsDummyData);

  return (
    <div className="md:pb-20 bg-green-50 md:max-w-8xl xl:px-20 w-full mx-auto">
      <div className="2xl:container 2xl:mx-auto px-4">
        <p className="font-playfair font-semibold md:font-normal text-black text-2xl md:text-4xl text-center pt-10 md:pt-16">
          Featured Destination
        </p>
        <p className="text-gray-500 text-lg text-center pt-2 max-w-xl mx-auto">
          Discover our handpicked selection of exceptional properties around the
          world, offering unparalleled luxury and unforgettable experiences.
        </p>

        {/* Cards Grid */}
        <div className="flex flex-wrap justify-center gap-6 mt-12">
          {roomsDummyData?.slice(0, 4)?.map((room, index) => (
            <div
              key={room?._id}
              className="relative md:w-[310px] bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
            >
              {/* Best Seller Badge */}
              {index % 2 === 0 && (
                <p className="absolute top-3 left-3 bg-yellow-400 text-white text-xs font-medium px-3 py-1 rounded-full shadow-sm z-10">
                  Best Seller
                </p>
              )}

              {/* Image */}
              <Image
                onClick={() => router.push(`RoomDetails/${room?._id}`)}
                className="object-cover cursor-pointer"
                src={room?.images[0]}
                alt="Hotel image"
                width={310}
                height={200}
              />

              {/* Info */}
              <div className="p-4 space-y-3">
                {/* Name and Rating */}
                <div className="flex justify-between items-center">
                  <p className="text-black font-semibold text-lg">
                    {room?.hotel?.name}
                  </p>
                  <div className="flex items-center gap-1">
                    <Image
                      src={assets?.starIconFilled?.src}
                      width={15}
                      height={15}
                      alt="star"
                    />
                    <span className="text-gray-600 text-sm">4.5</span>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <Image
                    src={assets?.locationIcon?.src}
                    width={15}
                    height={15}
                    alt="location"
                  />
                  <p>{room?.hotel?.address}</p>
                </div>

                {/* Price and Button */}
                <div className="flex justify-between items-center pt-1">
                  <p className="text-black text-base font-semibold">
                    ${room?.pricePerNight}
                    <span className="text-sm text-gray-500"> / night</span>
                  </p>
                  <button className="bg-black cursor-pointer text-white text-sm px-4 py-2 rounded-lg hover:bg-gray-800 transition">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Button */}
        <div className="my-10   md:my-10 flex justify-center items-center">
          <button
            onClick={() => router.push("/Rooms")}
            className="duration-500 hover:bg-gray-300   border cursor-pointer border-gray-400  rounded h-10 w-40 text-black "
          >
            View All Destinations
          </button>
        </div>
      </div>
      {/* Title Section */}
    </div>
  );
}

export default FeaturedDestination;
