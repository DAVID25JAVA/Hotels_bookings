import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useState } from "react";
import HotelRegister from "./HotelRegister";

function Layout({ children }) {
  const [isRegisterHotelOpen, setIsRegisterHotelOpen] = useState(false);

  const openRegisterModal = () => setIsRegisterHotelOpen(true);
  const closeRegisterModal = () => setIsRegisterHotelOpen(false);

  return (
    <div>
      <Navbar openRegisterModal={openRegisterModal} />
      <main>{children}</main>
      <Footer />

      {isRegisterHotelOpen && (
        <div className="fixed inset-0  bg-opacity-40 flex items-center justify-center z-50">
          <HotelRegister closeRegisterModal={closeRegisterModal} />
        </div>
      )}
    </div>
  );
}

export default Layout;
