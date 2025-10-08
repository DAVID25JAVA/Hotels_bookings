import React, { useState, useEffect } from "react";

import StarRating from "@/components/StarRating";
import { useRouter } from "next/router";
import ReactPaginate from "react-paginate";
import { useAppContext } from "@/context/AppContext";
import { MapPin } from "lucide-react";
import Loader from "@/components/Loader";

function Rooms() {
  const router = useRouter();
  const [showFilters, setShowFilters] = useState(false);
  const { getToken, rooms, setRooms } = useAppContext();
  const [selectedFilter, setSelectedFilter] = useState({
    roomType: "",
    priceRange: "",
  });
  const [selectedSort, setSelectedSort] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 2;

  // Helper to parse price range string (e.g., "$ 0 to 500" -> [0, 500])
  const parsePriceRange = (rangeStr) => {
    if (!rangeStr) return [0, Infinity];
    const [minStr, maxStr] = rangeStr.split(" to ");
    const min = Number(minStr.replace(/[^\d]/g, ""));
    const max = Number(maxStr.replace(/[^\d]/g, ""));
    return [min, max];
  };

  const matchRoomType = (room) => {
    return (
      selectedFilter.roomType === "" ||
      selectedFilter.roomType === room?.roomType
    );
  };

  const matchesPriceRange = (room) => {
    if (selectedFilter.priceRange === "") return true;
    const price = Number(room?.pricePerNight || 0);
    const [min, max] = parsePriceRange(selectedFilter.priceRange);
    const matches = price >= min && price <= max;

    // console.log(
    //   `Price check: Room ${room?._id} ($${price}) vs Range "${selectedFilter.priceRange}" [${min}, ${max}] = ${matches}`
    // );

    return matches;
  };

  const filterRooms = () => {
    const filtered = rooms.filter(
      (room) => matchRoomType(room) && matchesPriceRange(room)
    );

    // console.log(
    //   `Filtered rooms: ${filtered.length} out of ${rooms.length} (RoomType: "${selectedFilter.roomType}", Price: "${selectedFilter.priceRange}")`
    // );

    return filtered;
  };

  const sortRooms = (filteredRooms) => {
    const sorted = [...filteredRooms].sort((a, b) => {
      const priceA = Number(a?.pricePerNight || 0);
      const priceB = Number(b?.pricePerNight || 0);
      const dateA = new Date(a?.createdAt || 0);
      const dateB = new Date(b?.createdAt || 0);

      if (selectedSort === "Price Low To High") {
        return priceA - priceB;
      }
      if (selectedSort === "Price High To Low") {
        return priceB - priceA;
      }
      if (selectedSort === "Newest First") {
        return dateB - dateA;
      }
      return 0;
    });
    return sorted;
  };

  // console.log("All rooms:", rooms);

  const filteredRooms = filterRooms();
  const sortedRooms = sortRooms(filteredRooms);

  const pageCount = Math.ceil(sortedRooms.length / itemsPerPage);

  const offset = currentPage * itemsPerPage;
  const currentItems = sortedRooms.slice(offset, offset + itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleFilterChange = (value, type) => {
    setSelectedFilter((prevFilters) => {
      const updatedFilter = { ...prevFilters };
      updatedFilter[type] = value;

      setCurrentPage(0);
      return updatedFilter;
    });
  };

  const handleSortChange = (sortOption) => {
    setSelectedSort(sortOption);

    setCurrentPage(0);
  };

  
  const clearFilters = () => {
    setSelectedFilter({ roomType: "", priceRange: "" });
    setSelectedSort("");
    setCurrentPage(0);
  };

  
  if (loading || rooms.length === 0) {
    return <Loader />;
  }

  return (
    <div className="md:max-w-8xl w-full mx-auto xl:px-20 px-4 mt-20 md:my-28">
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
            {currentItems.length > 0 ? (
              currentItems.map((item) => (
                <div
                  key={item?._id}
                  className="flex gap-10 flex-col md:flex-row border-gray-300 pb-10 border-b-[2px] my-10"
                >
                  <div
                    onClick={() => router.push(`/RoomDetails/${item?._id}`)}
                    className="cursor-pointer"
                  >
                    {item?.image?.slice(0, 1).map((img, index) => (
                      <img
                        key={index}
                        src={img}
                        alt="Room image"
                        className="md:w-[300px] md:h-[300px] w-full rounded object-cover"
                        onError={(e) =>
                          (e.target.src = "/assets/placeholder.jpg")
                        }
                      />
                    ))}
                  </div>
                  <div className="flex flex-col gap-3">
                    <p className="text-gray-600 text-md">
                      {item?.hotel?.city || "Unknown City"}
                    </p>
                    <p className="text-black text-xl md:text-3xl">
                      {item?.hotel?.name || "Unnamed Hotel"}
                    </p>
                    <div className="flex items-center gap-1">
                      <StarRating />
                      <p className="text-black text-lg font-semibold pt-[2px]">
                        200+ reviews
                      </p>
                    </div>
                    <p className="text-gray-500 text-md flex gap-1 items-center">
                      <MapPin />
                      {item?.hotel?.address || "Address not available"}
                    </p>
                    <div className="flex max-w-xl flex-wrap gap-4">
                      {item?.amenities?.slice(0, 3)?.map((amenity, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-center gap-2 w-[144px] h-9 rounded-full bg-gray-200"
                        >
                          {/* <img
                            src={facilityIcons[amenity]?.src || "/assets/default-icon.png"}
                            alt={amenity}
                            className="w-4 h-4"
                            onError={(e) => (e.target.src = "/assets/default-icon.png")}
                          /> */}
                          <p className="text-base text-gray-500">{amenity}</p>
                        </div>
                      ))}
                    </div>
                    <div>
                      <p className="text-xl text-gray-700 font-semibold">
                        $ {Number(item?.pricePerNight || 0)} /night
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 text-lg">
                  {sortedRooms.length === 0
                    ? "No rooms match your filters. Try adjusting them."
                    : "No rooms available."}
                </p>
              </div>
            )}
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
              className={`border border-gray-400 md:h-[650px] p-4 ${
                showFilters ? "block" : "hidden"
              } md:block`}
            >
              <div className="flex justify-between items-center border-b-2 border-gray-300 pb-2 mb-4">
                <p className="text-black text-2xl uppercase">Filters</p>
                <button
                  onClick={clearFilters}
                  className="text-gray-600 text-xl uppercase cursor-pointer hover:text-red-500"
                >
                  Clear All
                </button>
              </div>

              {/* Popular Filters (Room Types) - Radio buttons for single-select */}
              <div className="mb-6">
                <p className="text-gray-700 font-semibold text-lg mb-2">
                  Popular Filters
                </p>
                {[
                  { label: "Single Bed", value: "Single" },
                  { label: "Double Bed", value: "Double" },
                  { label: "Luxury Room", value: "Luxury" },
                  { label: "Family Suite", value: "Family Suite" },
                ].map(({ label, value }, idx) => (
                  <div key={idx} className="flex items-center gap-3 mb-2">
                    <input
                      type="radio"
                      name="roomType" // Group for single-select
                      checked={selectedFilter.roomType === value}
                      onChange={() => handleFilterChange(value, "roomType")}
                      id={`roomType-${idx}`}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label
                      htmlFor={`roomType-${idx}`}
                      className="text-gray-500 text-[18px] cursor-pointer"
                    >
                      {label}
                    </label>
                  </div>
                ))}
              </div>

              {/* Price Range - Radio buttons for single-select (now with fixed parsing) */}
              <div className="mb-6">
                <p className="text-gray-700 font-semibold text-lg mb-2">
                  Price Range
                </p>
                {[
                  "$ 0 to 500",
                  "$ 500 to 1000",
                  "$ 1000 to 2000", // Covers your 2000 room
                  "$ 2000 to 3000",
                  "$ 3000 to 5000", // Covers your 4493 room
                ].map((range, idx) => (
                  <div key={idx} className="flex items-center gap-3 mb-2">
                    <input
                      type="radio"
                      name="priceRange" // Group for single-select
                      checked={selectedFilter.priceRange === range}
                      onChange={() => handleFilterChange(range, "priceRange")}
                      id={`price-${idx}`}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label
                      htmlFor={`price-${idx}`}
                      className="text-gray-500 text-[18px] cursor-pointer"
                    >
                      {range}
                    </label>
                  </div>
                ))}
              </div>

              {/* Sort By - Radio buttons for mutual exclusivity (unchanged) */}
              <div className="mb-6">
                <p className="text-gray-700 font-semibold text-lg mb-2">
                  Sort By
                </p>
                {["Price Low To High", "Price High To Low", "Newest First"].map(
                  (sort, idx) => (
                    <div key={idx} className="flex items-center gap-3 mb-2">
                      <input
                        type="radio"
                        name="sort"
                        checked={selectedSort === sort}
                        onChange={(e) => handleSortChange(sort)}
                        id={`sort-${idx}`}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label
                        htmlFor={`sort-${idx}`}
                        className="text-gray-500 text-[18px] cursor-pointer"
                      >
                        {sort}
                      </label>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Pagination - Only show if multiple pages */}
        {pageCount > 1 && (
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
        )}
      </div>
    </div>
  );
}

export default Rooms;
