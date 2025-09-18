import React from "react";
import { ArrowRight } from "lucide-react";
import { assets, exclusiveOffers } from "../../public/assets";

function ExclusiveOffer() {
  return (
    <div className="my-10 md:max-w-8xl xl:px-20 px-4 w-full mx-auto">
      <div className="2xl:container 2xl:mx-auto">

      <p className="text-black text-2xl md:text-4xl">Exclusive Offers</p>
      <div className="flex flex-col md:flex-row md:justify-between">
        <p className="text-gray-500 text-lg md:max-w-2xl my-3 md:my-1">
          Take advantage of our limited-time offers and special packages to
          enhance your stay and create unforgettable memories.
        </p>
        <div className="flex gap-1 cursor-pointer hover:bg-gray-300 px-2  duration-500 rounded-full items-center">
          <p className="text-base text-black mt-2 md:mt-0">View All Offers</p>
          <ArrowRight className="text-black" />
        </div>
      </div>

      {/* card */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 my-10 md:my-0">
        {exclusiveOffers?.map((item) => (
          <div
            key={item?._id}
            style={{ backgroundImage: `url(${item?.image?.src})` }}
            className="w-full rounded-3xl h-72 bg-cover bg-center border md:my-10 relative  "
          >
            <p className="bg-white w-20 py-1 font-semibold text-sm absolute top-3 left-3  rounded-full text-gray-500 text-center">
              {item?.priceOff}% Off
            </p>
            <p className=" text-white   font-semibold  absolute text-2xl top-16 left-3  ">
              {item?.title}
            </p>
            <p className=" text-white    absolute text-lg top-24 w-72 left-3  ">
              {item?.description}
            </p>
            <p
              className={`text-white absolute top-40 text-sm w-72 left-3 ${
                item?._id == 3 && "top-48"
              }`}
            >
              Expires {item?.expiryDate}
            </p>

            <button className="absolute bottom-4 left-3 flex items-center gap-1 text-sm cursor-pointer">
              View all offers <ArrowRight />
            </button>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}

export default ExclusiveOffer;
