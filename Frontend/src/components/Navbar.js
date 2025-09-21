import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { MenuIcon, X } from "lucide-react";
import { useClerk, UserButton } from "@clerk/nextjs";
import { useAppContext } from "@/context/AppContext";

function Navbar({ openRegisterModal }) {
  // const router = useRouter();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { openSignIn } = useClerk();
  // const { user } = useUser();
  const {
    isOwner,
    user,
    router,
    showHotelReg,
    setShowHotelReg,
  } = useAppContext();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Hotels", path: "/Rooms" },
    { name: "About", path: "/About" },
    { name: "Experience", path: "/Experience" },
    // { name: "Dashboard", path: "/dashboard" },
    // { name: "List Your Hotel", path: "", isShow: true },
  ];

  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    if (isHome) {
      window.addEventListener("scroll", handleScroll);
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  const navbarClasses =
    isHome && !isScrolled
      ? "py-4 md:py-6"
      : "bg-white/80 shadow-md text-gray-700 backdrop-blur-lg py-3 md:py-4";

  const textColorClass = isHome && !isScrolled ? "text-white" : "text-gray-700";
  const underlineColorClass =
    isHome && !isScrolled ? "bg-white" : "bg-gray-700";
  const logoClass = isHome && !isScrolled ? "" : "invert opacity-80";
  const iconClass = isHome && !isScrolled ? "" : "invert";

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${navbarClasses}`}
    >
      <div className="max-w-8xl mx-auto px-5 xl:px-20">
        <div className="flex justify-between items-center 2xl:container 2xl:mx-auto">
          {/* Logo */}
          <div
            onClick={() => router.push("/")}
            className="flex items-center gap-2"
          >
            <img
              src="/logo.png"
              alt="logo"
              className={`h-8 cursor-pointer ${logoClass}`}
            />
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-4 lg:gap-8">
            {navLinks.map((link, i) =>
              link.name === "List Your Hotel" ? (
                <div
                  key={i}
                  onClick={openRegisterModal}
                  className={`group font-semibold flex cursor-pointer flex-col gap-0.5 ${textColorClass}`}
                >
                  {link.name}
                  <div
                    className={`h-0.5 w-0 group-hover:w-full transition-all duration-300 ${underlineColorClass}`}
                  />
                </div>
              ) : (
                <div
                  key={i}
                  onClick={() => router.push(link.path)}
                  className={`group font-semibold flex cursor-pointer flex-col gap-0.5 ${textColorClass}`}
                >
                  {link.name}
                  <div
                    className={`h-0.5 w-0 group-hover:w-full transition-all duration-300 ${underlineColorClass}`}
                  />
                </div>
              )
            )}

            {/* Dashboard Button */}
            {user && (
              <div
                onClick={() =>
                  isOwner ? router.push("/dashboard") : openRegisterModal()
                }
                className={` cursor-pointer font-semibold  px-4 border rounded-full ${textColorClass}`}
              >
                {isOwner ? "Dashboard" : "List Your Hotel"}
              </div>
            )}
          </div>

          {/* Desktop Right */}
          <div className="hidden md:flex items-center gap-4">
            {/* <div onClick={()=>{ }} className="">
              <Search className="cursor-pointer" />
            </div> */}

            {user ? (
              <UserButton>
                <UserButton.MenuItems>
                  <UserButton.Action
                    label="My Bookings"
                    labelIcon={<MenuIcon className="h-5" />}
                    onClick={() => router.push("/MyBooking")}
                  />
                </UserButton.MenuItems>
              </UserButton>
            ) : (
              <button
                onClick={openSignIn}
                className="bg-black font-playfair text-white px-8 py-2.5 cursor-pointer rounded-full ml-4 transition-all duration-500"
              >
                Login
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 md:hidden">
            <svg
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`h-6 w-6 text-white cursor-pointer ${iconClass}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="18" x2="20" y2="18" />
            </svg>
          </div>

          {/* Mobile Menu */}

          <div
            className={`fixed top-0 left-0 w-full h-screen bg-white text-base flex flex-col md:hidden items-center justify-center gap-6 font-medium text-gray-800 transition-all duration-500 ${
              isMenuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <button
              className="absolute top-4 right-4"
              onClick={() => setIsMenuOpen(false)}
            >
              <X />
            </button>

            {navLinks.map((link, i) => (
              <div
                onClick={() => {
                  router.push(link?.path);
                  setIsMenuOpen(false);
                }}
              >
                <p key={i}>{link.name}</p>
              </div>
            ))}

            {user && (
              <div
                onClick={() =>
                  isOwner ? router.push("/dashboard") : (openRegisterModal(true) ,setIsMenuOpen(false))
                }
                className="border px-3 py-1 rounded-full text-sm"
              >
                {isOwner ? "Dashboard" : "List Your Hotel"}
              </div>
            )}

            {user ? (
              <UserButton>
                <UserButton.MenuItems>
                  <UserButton.Action
                    label="My Bookings"
                    labelIcon={<MenuIcon className="h-5" />}
                    onClick={() => router.push("/MyBooking")}
                  />
                </UserButton.MenuItems>
              </UserButton>
            ) : (
              <button onClick={()=>{openSignIn(), setIsMenuOpen(false)}} className="bg-black font-semibold font-playfair text-white px-8 py-2.5 rounded-full transition-all duration-500">
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
