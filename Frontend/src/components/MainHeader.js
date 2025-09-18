import React from "react";
import Search from "./Search";

function MainHeader() {
  return (
    <>
      <div className="relative md:h-screen pb-28">
        {/* Background image - stays behind everything */}
        <div className='absolute inset-0 bg-[url("/heroImage.png")] bg-cover bg-no-repeat bg-center' />

        {/* Content container - properly layered and centered */}
        <div className="relative z-10  h-screen pt-28 md:pt-16 flex flex-col justify-center">
          <div className="md:max-w-8xl xl:px-20 px-4 mx-auto w-full">
            <div className="2xl:container 2xl:mx-auto space-y-4">
              <p className="text-white  md:mt-0 w-64 py-1 rounded-full opacity-75 text-center bg-primary">
                The Ultimate Hotel Experience
              </p>
              <h1 className="text-white font-playfair md:text-6xl text-4xl md:max-w-xl font-semibold">
                Discover Your Perfect Gateway Destination
              </h1>
              <p className="text-white text-lg max-w-xl font-semibold">
                Unparalleled luxury and comfort await at the world's most
                exclusive hotels and resorts.
              </p>

              {/* Search component - now properly visible */}
              <div className="mt-8">
                <Search />
              </div>
            </div>
          </div>
        </div>
      </div>

       
    </>
  );
}

export default MainHeader;
