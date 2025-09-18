import React from "react";

function Loader() {
  return (
    <div className=" lg:min-h-60 xl:min-h-screen  w-24 flex mx-auto items-center justify-center">
      <div className="border-8 rounded-full md:w-14 md:h-14 w-10 h-10 mx-auto animate-ping border-black"></div>
    </div>
  );
}

export default Loader;
