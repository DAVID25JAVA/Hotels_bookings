import React, { useState, useRef } from "react";
import { UploadCloud } from "lucide-react";

const amenitiesList = [
  "Wi-Fi",
  "Air Conditioning",
  "TV",
  "Mini Bar",
  "Room Service",
  "Parking",
  "Pool Access",
];

function AddRooms() {
  const [images, setImages] = useState([null, null, null, null]);
  const [roomType, setRoomType] = useState("");
  const [price, setPrice] = useState("");
  const [amenities, setAmenities] = useState([]);

  // To store refs for each input
  const fileInputs = useRef([]);

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const updatedImages = [...images];
      updatedImages[index] = URL.createObjectURL(file);
      setImages(updatedImages);
    }
  };

  const handleUploadClick = (index) => {
    fileInputs.current[index].click();
  };

  const handleAmenityChange = (amenity) => {
    if (amenities.includes(amenity)) {
      setAmenities(amenities.filter((a) => a !== amenity));
    } else {
      setAmenities([...amenities, amenity]);
    }
  };

  return (
    <div className=" w-full mx-auto md:p-6 p-4   rounded-lg">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Add Room</h1>
      <p className="text-gray-600 mb-6">
        Welcome! Use this form to add a new room to your listings. Provide
        accurate details and attractive photos to help guests find and book your
        space easily. Make sure to include all the amenities and features to
        showcase your room’s best qualities.
      </p>

      {/* Image Uploads */}
      <div className="flex flex-wrap gap-4 mb-6">
        {images.map((img, index) => (
          <div
            key={index}
            className="w-40 h-40 bg-gray-200 rounded-lg shadow-md flex items-center justify-center relative cursor-pointer"
            onClick={() => handleUploadClick(index)}
          >
            {img ? (
              <img
                src={img}
                alt={`preview ${index + 1}`}
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
              ref={(el) => (fileInputs.current[index] = el)}
              onChange={(e) => handleImageChange(e, index)}
            />
          </div>
        ))}
      </div>

      {/* Room Type */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-1">Room Type</label>
        <input
          type="text"
          value={roomType}
          onChange={(e) => setRoomType(e.target.value)}
          placeholder="Enter room type"
          className="w-full border text-black border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Price per Night */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-1">Price per Night ($)</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Enter price"
          className="w-full border text-black border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Amenities */}
      <div className="mb-6">
        <label className="block text-gray-700 mb-2">Select Amenities</label>
        <div className="grid grid-cols-2 gap-2">
          {amenitiesList.map((amenity) => (
            <label key={amenity} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={amenities.includes(amenity)}
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
        type="button"
        className="w-full  bg-gray-800 text-white py-2 rounded-md hover:bg-gray-700 cursor-pointer transition"
      >
        Add Room
      </button>
    </div>
  );
}

export default AddRooms;
