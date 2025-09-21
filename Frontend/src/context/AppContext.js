import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useAuth, useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";
 


axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const router = useRouter();
  const { user } = useUser();
  console.log(user);
  
  const { getToken } = useAuth();
  const [isOwner, setIsOwner] = useState(false);
  const [showHotelReg, setShowHotelReg] = useState(false);
  const [searchCities, setSearchCities] = useState([]);
  const currency = process.env.NEXT_PUBLIC_CURRENCY || $;


  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/user", {
        headers:{Authorization: `Bearer ${await getToken()}`},
      });
      if (data?.success) {
        setIsOwner(data?.role === "hotelOwner");
        setSearchCities(data?.recentSearchCities);
      } else {
        setTimeout(() => {
          fetchUser();
        }, 5000);
      }
    } catch (error) {
      toast.error(error?.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUser();
    }
  }, [user]);

  const value = {
    currency,
    router,
    user,
    getToken,
    isOwner,
    setIsOwner,
    showHotelReg,
    setShowHotelReg,
    axios,
    searchCities,
    setSearchCities,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
