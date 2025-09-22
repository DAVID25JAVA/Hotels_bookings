import React, { useEffect, useState } from "react";
import { SquarePen } from "lucide-react";
import { Trash2 } from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import toast from "react-hot-toast";

function ListRooms() {
  const [rooms, setRooms] = useState([]);
  const { axios, getToken, user } = useAppContext();

  const getRoomData = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get("/api/rooms/owner", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("data--->", data);

      if (data?.success) {
        setRooms(data?.rooms || []);
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.error("Error fetching rooms:", error);
      toast.error(error?.response?.data?.message || "Failed to fetch rooms");
    }
  };

  // Toggle availability of room
  const toggleAvailability = async (roomId) => {
    try {
      const token = await getToken();
      const { data } = await axios.post(
        "/api/rooms/toggle-availability",
        { roomId }, // Send roomId in body
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Toggle response:", data);

      if (data?.success) {
        toast.success(data?.message || "Availability toggled successfully");
        getRoomData(); // Refetch to update UI with latest data
      } else {
        toast.error(data?.message || "Failed to toggle availability");
      }
    } catch (error) {
      console.error("Error toggling availability:", error);
      toast.error(error?.response?.data?.message || "Failed to toggle availability");
    }
  };

  useEffect(() => {
    if (user) {
      getRoomData();
    }
  }, [user]);

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
            {rooms.map((room) => {
              const isAvailable = room.isAvailable || false; // Default to false if not present
              return (
                <tr key={room._id} className="hover:bg-gray-50">
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
                      {/* Toggle Availability Button */}
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => toggleAvailability(room._id)}
                          className={`relative inline-flex items-center h-6 rounded-full w-11 cursor-pointer transition-colors duration-200 focus:outline-none ${
                            isAvailable ? "bg-green-500" : "bg-gray-300"
                          }`}
                          title={`Toggle ${isAvailable ? "Unavailable" : "Available"}`}
                        >
                          <span
                            className={`transform transition-transform duration-200 inline-block cursor-pointer w-5 h-5 bg-white rounded-full shadow-md ${
                              isAvailable ? "translate-x-5" : "translate-x-1"
                            }`}
                          />
                        </button>
                        <span className="text-xs font-medium text-gray-700">
                          {isAvailable ? "Available" : "Unavailable"}
                        </span>
                      </div>

                      {/* Edit Button */}
                      <button className="bg-green-600 hover:bg-green-700 text-white cursor-pointer p-[2px] rounded-md text-sm transition-colors duration-200">
                        <SquarePen className="p-[2px]" size={16} />
                      </button>

                      {/* Delete Button */}
                      <button className="bg-red-600 hover:bg-red-700 text-white p-[2px] cursor-pointer rounded-md text-sm transition-colors duration-200">
                        <Trash2 className="p-[2px]" size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
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
