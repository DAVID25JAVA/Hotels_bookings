import React, { useState } from "react";
import { cities } from "../../public/assets";
import { CalendarDays, Locate, LocateIcon, User } from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import axios from "axios";

function Search() {
  const { router, setSearchCities, searchCities, getToken } = useAppContext();
  const [destination, setDestination] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    router.push(`Rooms?destination=${destination}`);
    await axios.post(
      "/api/user/recent-search-cities",
      { recentSearchCities: destination },
      { headers: { Authorization: `Bearer ${await getToken()}` } }
    );
    setSearchCities((prevSearchCities) => {
      console.log(prevSearchCities, destination);
      const updatedSearchCities = [...prevSearchCities, destination];
      if (updatedSearchCities.length > 3) {
        updatedSearchCities.shift();
      }
      return updatedSearchCities;
    });
  };

  return (
    <>
      <form
        onSubmit={handleSearch}
        className="bg-white text-gray-500 rounded-lg px-6 py-4 md:max-w-3xl max-w-3xs  flex flex-col md:flex-row max-md:it ems-start gap-4 max-md:mx-auto"
      >
        <div>
          <div className="flex items-center gap-2">
            <LocateIcon />
            <label htmlFor="destinationInput">Destination</label>
          </div>
          <input
            list="destinations"
            id="destinationInput"
            type="text"
            placeholder="Type or select a city..."
            value={destination} 
            onChange={(e) => setDestination(e.target.value)} 
            className="w-full rounded border border-gray-200 px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
          <datalist id="destinations">
            {cities?.map((city, index) => (
              <select key={index}>
                <option>{city}</option>
              </select>
            ))}
          </datalist>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <CalendarDays className="w-4" />
            <label htmlFor="checkIn">Check in</label>
          </div>
          <input
            id="checkIn"
            type="date"
            className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
          />
        </div>

        <div>
          <div className="flex items-center gap-2">
            <CalendarDays className="w-4" />
            <label htmlFor="checkOut">Check out</label>
          </div>
          <input
            id="checkOut"
            type="date"
            className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
          />
        </div>

        <div className="flex md:flex-col max-md:gap-2 max-md:items-center">
          <div className="flex">
            <User className="w-4" />
            <label htmlFor="guests">Guests</label>
          </div>
          <input
            min={1}
            max={4}
            id="guests"
            type="number"
            className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none  max-w-16"
            placeholder="0"
          />
        </div>

        <button className="flex items-center justify-center gap-1 rounded-md bg-black py-3 px-4 text-white my-auto cursor-pointer max-md:w-full max-md:py-1">
          <svg
            className="w-4 h-4 text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="2"
              d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
            />
          </svg>
          <span>Search</span>
        </button>
      </form>
    </>
  );
}

export default Search;
