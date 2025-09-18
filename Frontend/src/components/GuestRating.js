import React from "react";
import { testimonials } from "../../public/assets";
import StarRating from "./StarRating";

function GuestRating() {
 

  return (
    <div className="bg-green-50 md:py-10 py-5">
      <p className="text-black text-2xl md:text-4xl text-center">
        What Our Guests Say
      </p>
      <p className="text-gray-500 text-center max-w-2xl mx-auto mt-2 text-lg">
        Discover why discerning travelers consistently choose QuickStay for
        their exclusive and luxurious accommodations around the world.
      </p>

      <div class="flex flex-wrap items-center justify-center gap-20 md:gap-6 md:py-24 py-20">
        {testimonials?.map((item) => (
          <div key={item?._id} class="text-sm w-80 md:h-56 border border-gray-500/30 pb-6 rounded-lg bg-white shadow-[0px_4px_15px_0px] shadow-black/5">
            <div  class="flex flex-col items-center px-5 py-4 relative">
              <img
                class="h-20 w-20 absolute -top-11 rounded-full"
                src={item?.image}
                alt="userImage1"
              />
              <div class="pt-8 text-center">
                <h1 class="text-lg font-medium text-gray-800">
                   {item?.name}
                </h1>
                {/* <p class="text-gray-800/80">Content Creator</p> */}
              </div>
            </div>
            <p class="text-gray-500 px-6 text-[15px] text-center">
              {item?.review}
            </p>
            <div class="flex justify-center pt-4">
              <div class="flex gap-0.5">
                <StarRating/>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GuestRating;
