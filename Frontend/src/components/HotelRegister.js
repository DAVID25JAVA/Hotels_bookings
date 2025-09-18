import React from "react";
import { X } from "lucide-react";

function HotelRegister({ closeRegisterModal }) {
  return (
    <div className="min-h-screen flex items-center justify-center   p-6">
      <div className="bg-white shadow-lg rounded-lg flex justify-between w-full max-w-4xl overflow-hidden">
        {/* Left side - Image */}
        <div className="w-1/2">
          <img
            src="./regImage.png"
            alt="Hotel"
            className="object-cover w-full h-full"
          />
        </div>

        {/* Right side - Form */}
        <div className="w-1/2 p-8">
          <h2 className="text-2xl font-bold mb-6 text-black">
            Register Your Hotel
          </h2>
          <form className="space-y-4">
            <div>
              <label className="block text-gray-600 text-sm font-medium mb-1">
                Hotel Name
              </label>
              <input
                type="text"
                placeholder="Enter hotel name"
                className="w-full border placeholder:text-gray-500  border-gray-300 rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Phone
              </label>
              <input
                type="text"
                placeholder="Enter phone number"
                className="w-full border placeholder:text-gray-500  border-gray-300 rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Address
              </label>
              <input
                type="text"
                placeholder="Enter address"
                className="w-full border placeholder:text-gray-500  border-gray-300 rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 font-medium mb-1">
                City
              </label>
              <input
                type="text"
                placeholder="Enter city"
                className="w-full border  placeholder:text-gray-500  border-gray-300 rounded px-3 py-2"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Register Hotel
            </button>
          </form>
        </div>
        <button
          onClick={closeRegisterModal}
          className=" flex m-1 text-black cursor-pointer"
        >
          {" "}
          <X className="cursor-pointer" />
        </button>
      </div>
    </div>
  );
}

export default HotelRegister;
