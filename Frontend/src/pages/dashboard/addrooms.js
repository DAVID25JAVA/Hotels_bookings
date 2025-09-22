import React, { useState, useRef } from "react";
import { UploadCloud } from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import toast from "react-hot-toast";

const roomTypeOptions = [
  "Select Room Type",
  "Single",
  "Double",
  "Luxury Room",
  "Family Suite",
];

function AddRooms() {
  const [images, setImages] = useState({
    1: null,
    2: null,
    3: null,
    4: null,
  });

  const { axios, getToken } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    pricePerNight: "",
    roomType: "Select Room Type",
    amenities: {
      "Free Wi-Fi": false,
      "Air Conditioning": false,
      TV: false,
      "Mini Bar": false,
      "Room Service": false,
      Parking: false,
      "Pool Access": false,
    },
  });

  // To store refs for each input
  const fileInputs = useRef([]);

  const handleImageChange = (e, key) => {
    const file = e.target.files[0];
    if (file) {
      setImages((prev) => ({
        ...prev,
        [key]: file,
      }));
    }
  };

  const handleUploadClick = (key) => {
    fileInputs.current[key].click();
  };

  const handleAmenityChange = (amenity) => {
    setInput((prev) => ({
      ...prev,
      amenities: {
        ...prev.amenities,
        [amenity]: !prev.amenities[amenity],
      },
    }));
  };

  // console.log("data---->", input);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // Validation
    if (input.roomType === "Select Room Type") {
      toast.error("Please select a room type");
      return;
    }

    if (!input.pricePerNight || input.pricePerNight <= 0) {
      toast.error("Please enter a valid price");
      return;
    }

    const selectedAmenities = Object.keys(input.amenities).filter(
      (key) => input.amenities[key]
    );

    if (selectedAmenities.length === 0) {
      toast.error("Please select at least one amenity");
      return;
    }

    if (!Object.values(images).some((image) => image)) {
      toast.error("Please upload at least one image");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("roomType", input.roomType);
      formData.append("pricePerNight", input.pricePerNight);
      formData.append("amenities", JSON.stringify(selectedAmenities));

      // Adding images to form data
      Object.keys(images).forEach((key) => {
        if (images[key]) {
          formData.append("images", images[key]);
        }
      });

      const { data } = await axios.post("/api/rooms", formData, {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (data?.success) {
        toast.success(data?.message || "Room added successfully!");
        // Reset form
        setInput({
          pricePerNight: "",
          roomType: "Select Room Type",
          amenities: {
            "Free Wi-Fi": false,
            "Air Conditioning": false,
            TV: false,
            "Mini Bar": false,
            "Room Service": false,
            Parking: false,
            "Pool Access": false,
          },
        });
        setImages({
          1: null,
          2: null,
          3: null,
          4: null,
        });
      } else {
        toast.error(data?.message || "Failed to add room");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(
        error?.response?.data?.message || error?.message || "An error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full mx-auto md:p-6 p-4 rounded-lg">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Add Room</h1>
      <p className="text-gray-600 mb-6">
        Welcome! Use this form to add a new room to your listings. Provide
        accurate details and attractive photos to help guests find and book your
        space easily. Make sure to include all the amenities and features to
        showcase your room's best qualities.
      </p>

      <form onSubmit={onSubmitHandler}>
        {/* Image Uploads */}
        <div className="flex flex-wrap gap-4 mb-6">
          {Object.keys(images).map((key) => (
            <div
              key={key}
              className="w-40 h-40 bg-gray-200 rounded-lg shadow-md flex items-center justify-center relative cursor-pointer"
              onClick={() => handleUploadClick(key)}
            >
              {images[key] ? (
                <img
                  src={URL.createObjectURL(images[key])}
                  alt={`preview ${key}`}
                  className="object-cover w-full h-full rounded-lg"
                />
              ) : (
                <div className="flex flex-col items-center text-gray-500">
                  <UploadCloud className="w-8 h-8 mb-2" />
                  <span className="text-sm">Upload</span>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={(el) => (fileInputs.current[key] = el)}
                onChange={(e) => handleImageChange(e, key)}
              />
            </div>
          ))}
        </div>

        {/* Room Type */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Room Type</label>
          <select
            className="border w-full p-[9px] text-gray-500 border-gray-300 rounded-lg"
            value={input.roomType}
            onChange={(e) => setInput({ ...input, roomType: e.target.value })}
          >
            {roomTypeOptions.map((room, index) => (
              <option
                key={index}
                value={room}
                disabled={index === 0}
                className={index === 0 ? "text-gray-400" : "text-black"}
              >
                {room}
              </option>
            ))}
          </select>
        </div>

        {/* Price per Night */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">
            Price per Night ($)
          </label>
          <input
            type="number"
            value={input.pricePerNight}
            onChange={(e) =>
              setInput({ ...input, pricePerNight: e.target.value })
            }
            placeholder="Enter price"
            min="1"
            className="w-full border text-black border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Amenities */}
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Select Amenities</label>
          <div className="grid grid-cols-2 gap-2">
            {Object.keys(input.amenities).map((amenity) => (
              <label key={amenity} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={input.amenities[amenity]}
                  onChange={() => handleAmenityChange(amenity)}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
                <span className="text-gray-700">{amenity}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gray-800 text-white py-2 rounded-md hover:bg-gray-700 cursor-pointer transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <div className="flex items-center mx-auto justify-center gap-4">
              <div className="w-6 h-6 rounded-full border-2 border-white border-t-transparent animate-spin"></div>{" "}
              <span>Adding...</span>
            </div>
          ) : (
            "Add Room"
          )}
        </button>
      </form>

      {/* Debug: Current State */}
      {/* <div className="mt-4 p-4 bg-gray-100 rounded-lg">
        <h3 className="font-bold mb-2">Current State:</h3>
        <pre className="text-sm overflow-auto">
          {JSON.stringify(
            {
              roomType: input.roomType,
              pricePerNight: input.pricePerNight,
              selectedAmenities: Object.keys(input.amenities).filter(
                (key) => input.amenities[key]
              ),
              imageCount: Object.values(images).filter((img) => img !== null)
                .length,
            },
            null,
            2
          )}
        </pre>
      </div> */}
    </div>
  );
}

export default AddRooms;
