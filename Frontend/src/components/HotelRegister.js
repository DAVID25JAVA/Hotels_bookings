import React, { useState } from "react";
import { X } from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import toast from "react-hot-toast";

function HotelRegister({ closeRegisterModal }) {
  const { axios, getToken, setIsOwner } = useAppContext();
  const [hotelRegister, setHotelRegister] = useState({
    name: "",
    city: "",
    contact: "",
    address: "",
  });

  const handleHotelRegister = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios.post("/api/hotels", hotelRegister, {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });
      if (data?.success) {
        toast.success(data?.message);
        setIsOwner(true);
        closeRegisterModal();
        setHotelRegister(null);
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      toast.error(error?.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-lg flex justify-between w-full md:max-w-4xl overflow-hidden">
        {/* Left side - Image */}
        <div className="md:w-1/2 hidden md:block">
          <img
            src="./regImage.png"
            alt="Hotel"
            className="object-cover w-full h-full"
          />
        </div>

        {/* Right side - Form */}
        <div className="md:w-1/2  w-full p-9">
          <h2 className="md:text-2xl text-lg font-bold mb-6 text-black">
            Register Your Hotel
          </h2>
          <form
            onSubmit={handleHotelRegister}
            className="space-y-4 flex flex-col items-center"
          >
            <div>
              <label className="block text-gray-600 text-sm font-medium mb-1">
                Hotel Name
              </label>
              <input
                value={hotelRegister?.name}
                onChange={(e) =>
                  setHotelRegister({ ...hotelRegister, name: e.target.value })
                }
                type="text"
                placeholder="Enter hotel name"
                className="w-full border placeholder:text-gray-500 text-black  border-gray-300 rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Contact
              </label>
              <input
                value={hotelRegister?.contact}
                onChange={(e) =>
                  setHotelRegister({
                    ...hotelRegister,
                    contact: e.target.value,
                  })
                }
                type="text"
                placeholder="Enter phone number"
                className="w-full border text-black placeholder:text-gray-500  border-gray-300 rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Address
              </label>
              <input
                value={hotelRegister?.address}
                onChange={(e) =>
                  setHotelRegister({
                    ...hotelRegister,
                    address: e.target.value,
                  })
                }
                type="text"
                placeholder="Enter address"
                className="w-full border text-black placeholder:text-gray-500  border-gray-300 rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 font-medium mb-1">
                City
              </label>
              <input
                value={hotelRegister?.city}
                onChange={(e) =>
                  setHotelRegister({ ...hotelRegister, city: e.target.value })
                }
                type="text"
                placeholder="Enter city"
                className="w-full border text-black  placeholder:text-gray-500  border-gray-300 rounded px-3 py-2"
              />
            </div>

            <button
              type="submit"
              className="w-full  bg-gray-800 cursor-pointer text-white py-2 rounded hover:bg-gray-700"
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
