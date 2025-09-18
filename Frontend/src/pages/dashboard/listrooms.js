import React, { useState } from "react";
import { roomsDummyData } from "../../../public/assets";
import { SquarePen } from "lucide-react";
import { Trash2 } from "lucide-react";

function ListRooms() {
  const [rooms, setRooms] = useState(roomsDummyData);
  console.log("rroms----->", rooms);

  const [activeRoomId, setActiveRoomId] = useState(null);

  const handleToggle = (id) => {
    setActiveRoomId(activeRoomId === id ? null : id);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-4">List Rooms</h1>
      <p className="text-gray-600 mb-6">
        Here are the rooms you've added to your listings. Review, edit, or
        remove them anytime to keep your space up to date. Ensure each room has
        clear photos and detailed information so guests can easily find and
        choose the best option for their stay.
      </p>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full table-auto border-collapse">
          <thead className="bg-gray-100 border-b-2 border-gray-300">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Room Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Facilities
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Price/Night
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {rooms.map((room) => (
              <tr key={room.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {room.roomType}
                  </div>
                  {room.description && (
                    <div className="text-sm text-gray-500">
                      {room.description}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">
                    {room?.amenities && room?.amenities.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {room?.amenities.map((facility, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                          >
                            {facility}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-gray-500">
                        No facilities listed
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    ${room.pricePerNight || room.price || 0}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center space-x-2">
                    {/* Toggle Button */}
                    <button
                      onClick={() => handleToggle(room.id)}
                      className={`relative inline-flex items-center h-6 rounded-full w-11 cursor-pointer transition-colors duration-200 focus:outline-none ${
                        activeRoomId === room.id
                          ? "bg-blue-500"
                          : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`transform transition-transform duration-200 inline-block cursor-pointer w-5 h-5 bg-white rounded-full ${
                          activeRoomId === room.id
                            ? "translate-x-5"
                            : "translate-x-1"
                        }`}
                      />
                    </button>

                    {/* Edit Button */}
                    <button className="bg-green-600 hover:bg-green-700 text-white cursor-pointer p-[2px] rounded-md text-sm transition-colors duration-200">
                      <SquarePen className="p-[2px]" />
                    </button>

                    {/* Delete Button */}
                    <button className="bg-red-600 hover:bg-red-700 text-white p-[2px] cursor-pointer  rounded-md text-sm transition-colors duration-200">
                      <Trash2 className="p-[2px]" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Empty state */}
        {rooms.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No rooms available</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ListRooms;
