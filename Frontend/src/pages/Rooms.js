import React, { useState } from "react";
import { facilityIcons, roomsDummyData } from "../../public/assets";
import StarRating from "@/components/StarRating";
import { useRouter } from "next/router";
import ReactPaginate from "react-paginate";

function Rooms() {
  const router = useRouter();
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 2; // Number of rooms per page

  // Calculate total pages
  const pageCount = Math.ceil(roomsDummyData.length / itemsPerPage);

  // Slice data for current page
  const offset = currentPage * itemsPerPage;
  const currentItems = roomsDummyData.slice(offset, offset + itemsPerPage);

  // Handle page click
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div className="md:max-w-8xl w-full mx-auto xl:px-20 px-4 mt-20  md:my-28">
      <div className="2xl:container 2xl:mx-auto">
        <div>
          <p className="text-black text-2xl md:text-5xl">Hotel Rooms</p>
          <p className="text-gray-500 text-[20px] my-2 md:max-w-2xl w-full">
            Take advantage of our limited-time offers and special packages to
            enhance your stay and create unforgettable memories.
          </p>
        </div>

        <div className="flex justify-between flex-col-reverse md:flex-row">
          {/* Room Details */}
          <div className="md:my-10 md:w-2/3">
            {currentItems.map((item) => (
              <div
                key={item?._id}
                className="flex gap-10 flex-col md:flex-row border-gray-300 pb-10 border-b-[2px] my-10"
              >
                <div
                  onClick={() => router.push(`/RoomDetails/${item?._id}`)}
                  className="cursor-pointer"
                >
                  {item?.images?.slice(0, 1).map((img, index) => (
                    <img
                      key={index}
                      src={img?.src}
                      alt="Room image"
                      className="md:w-[500px] w-full rounded"
                    />
                  ))}
                </div>
                <div className="flex flex-col gap-3">
                  <p className="text-gray-600 text-xl">{item?.hotel?.city}</p>
                  <p className="text-black text-xl md:text-3xl">
                    {item?.hotel?.name}
                  </p>
                  <div className="flex items-center gap-1">
                    <StarRating />
                    <p className="text-black text-lg font-semibold pt-[2px]">
                      200+ review
                    </p>
                  </div>
                  <p className="text-gray-500 text-lg">
                    {item?.hotel?.address}
                  </p>
                  <div className="flex max-w-xl flex-wrap gap-4">
                    {item?.amenities?.slice(0, 3)?.map((amenity, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-center gap-2 w-[144px] h-9 rounded-full bg-gray-100"
                      >
                        <img
                          src={facilityIcons[amenity]?.src}
                          alt={amenity}
                          className="w-4 h-4"
                        />
                        <p className="text-base text-gray-500">{amenity}</p>
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-xl text-gray-700 font-semibold">
                      ${item?.pricePerNight} /night
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Filter Section */}
          <div className="md:w-1/3">
            <div className="md:hidden flex justify-between items-center border border-gray-400 p-3 my-5">
              <p className="text-lg font-semibold text-gray-800">Filter</p>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="text-blue-600 font-semibold"
              >
                {showFilters ? "Hide" : "Show"}
              </button>
            </div>

            <div
              className={`border border-gray-400 md:h-[610px] p-4 ${
                showFilters ? "block" : "hidden"
              } md:block`}
            >
              <div className="flex justify-between items-center border-b-2 border-gray-300 pb-2 mb-4">
                <p className="text-black text-2xl uppercase">Filters</p>
                <p className="text-gray-600 text-xl uppercase cursor-pointer">
                  Clear
                </p>
              </div>

              <div className="mb-6">
                <p className="text-gray-700 font-semibold text-lg mb-2">
                  Popular Filters
                </p>
                {["Single Bed", "Double Bed", "Luxury Room", "Family Suite"].map(
                  (label, idx) => (
                    <div key={idx} className="flex items-center gap-3 mb-2">
                      <input type="checkbox" />
                      <label className="text-gray-500 text-[18px]">{label}</label>
                    </div>
                  )
                )}
              </div>

              <div className="mb-6">
                <p className="text-gray-700 font-semibold text-lg mb-2">
                  Price Range
                </p>
                {["$ 0 to 500", "$ 500 to 1000", "$ 1000 to 2000", "$ 2000 to 3000"].map(
                  (range, idx) => (
                    <div key={idx} className="flex items-center gap-3 mb-2">
                      <input type="checkbox" />
                      <label className="text-gray-500 text-[18px]">{range}</label>
                    </div>
                  )
                )}
              </div>

              <div className="mb-6">
                <p className="text-gray-700 font-semibold text-lg mb-2">
                  Sort By
                </p>
                {["Price Low To High", "Price High To Low", "Newest First"].map(
                  (sort, idx) => (
                    <div key={idx} className="flex items-center gap-3 mb-2">
                      <input type="checkbox" />
                      <label className="text-gray-500 text-[18px]">{sort}</label>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-center my-8">
          <ReactPaginate
            breakLabel="..."
            nextLabel="Next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="< Previous"
            containerClassName="flex gap-2 text-gray-600"
            pageClassName="cursor-pointer px-3 py-1 rounded hover:bg-gray-200"
            previousClassName="cursor-pointer px-3 py-1 rounded hover:bg-gray-200"
            nextClassName="cursor-pointer px-3 py-1 rounded hover:bg-gray-200"
            activeClassName="bg-blue-600 text-white"
          />
        </div>
      </div>
    </div>
  );

   
}

export default Rooms;
