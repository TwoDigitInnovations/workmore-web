"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineShoppingBag } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseOutline } from "react-icons/io5";
import Drawer from "@mui/material/Drawer";
import { IoIosArrowForward } from "react-icons/io";
import Swal from "sweetalert2";
import { userContext } from "@/pages/_app";

const Navbar = () => {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showHover, setShowHover] = useState(false);
  const [user, setUser] = useContext(userContext);
  const menuRef = useRef();

  // Common menu links
  const navLinks = [
    { name: "Shop", href: "/shop" },
    { name: "Our Point of Sale", href: "/point-of-sale" },
  ];

  // Auto-close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowHover(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Sync user from localStorage instantly
  useEffect(() => {
    const storedUser = localStorage.getItem("userDetail");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const handleLogout = () => {
    Swal.fire({
      text: "Are you sure you want to logout?",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      confirmButtonColor: "#D9AB83",
      cancelButtonColor: "#D9AB83",
      width: "360px",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("userDetail");
        localStorage.removeItem("token");
        setUser({});
        setShowHover(false);
        router.push("/Signin");
      }
    });
  };

  return (
    <header className="w-full bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <nav className="flex items-center justify-between h-16">
          {/* Logo + Links */}
          <div className="flex gap-8">
            <div
              className="text-xl font-bold text-black cursor-pointer"
              onClick={() => router.push("/")}
            >
              <img src="/Logo.png" className="h-14" alt="Logo" />
            </div>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center space-x-6">
              {navLinks.map((link, i) => (
                <Link
                  key={i}
                  href={link.href}
                  className="text-gray-700 hover:text-black text-sm font-medium flex items-center"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-4" ref={menuRef}>
              {user?.token ? (
                <div
                  className="relative group cursor-pointer"
                  onClick={() => setShowHover(!showHover)}
                >
                  <div className="w-10 h-10 bg-custom-gray rounded-full flex items-center justify-center">
                    <p className="text-white font-bold text-base">
                      {user?.username?.charAt(0).toUpperCase() || "T"}
                    </p>
                  </div>

                  {showHover && (
                    <div className="absolute right-0 top-12 bg-white text-black rounded-lg shadow-lg w-56 py-2">
                      <ul className="divide-y divide-white/20">
                        <li
                          className="px-4 py-2 hover:bg-gray-100 flex justify-between items-center cursor-pointer"
                          onClick={() => {
                            setShowHover(false);
                            router.push("/MyOrders");
                          }}
                        >
                          My Orders <IoIosArrowForward className="text-xl" />
                        </li>
                        <li
                          className="px-4 py-2 hover:bg-gray-100 flex justify-between items-center cursor-pointer"
                          onClick={() => {
                            setShowHover(false);
                            router.push("/MyAccount");
                          }}
                        >
                          My Account <IoIosArrowForward className="text-xl" />
                        </li>
                        <li
                          className="px-4 py-2 hover:bg-gray-100 flex justify-between items-center cursor-pointer"
                          onClick={() => {
                            setShowHover(false);
                            router.push("/EditProfile");
                          }}
                        >
                          Edit Profile <IoIosArrowForward className="text-xl" />
                        </li>
                        <li
                          className="px-4 py-2 hover:bg-gray-100 flex justify-between items-center cursor-pointer"
                          onClick={handleLogout}
                        >
                          Sign Out <IoIosArrowForward className="text-xl" />
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <FaRegUser
                  className="cursor-pointer text-2xl text-gray-700 hover:text-black"
                  onClick={() => router.push("/Signin")}
                  aria-label="Account"
                />
              )}

              <MdOutlineShoppingBag
                className="cursor-pointer text-2xl text-gray-700 hover:text-black"
                onClick={() => router.push("/cart")}
                aria-label="Shopping Bag"
              />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <GiHamburgerMenu
              className="cursor-pointer text-xl text-gray-700"
              onClick={toggleMobileMenu}
              aria-label="Menu"
            />
          </div>
        </nav>
      </div>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={isMobileMenuOpen} onClose={closeMobileMenu}>
        <div className="w-80 h-full bg-white p-6 relative">
          {/* Close icon */}
          <div
            className="absolute top-4 right-4 cursor-pointer"
            onClick={closeMobileMenu}
          >
            <IoCloseOutline className="w-6 h-6 text-gray-700" />
          </div>

          {/* Menu items */}
          <div className="mt-12 space-y-6">
            {navLinks.map((link, i) => (
              <Link
                key={i}
                href={link.href}
                className="text-gray-700 hover:text-black text-base font-medium block"
                onClick={closeMobileMenu}
              >
                {link.name}
              </Link>
            ))}

            <Link
              href="/cart"
              className="text-gray-700 hover:text-black text-base font-medium block"
              onClick={closeMobileMenu}
            >
              Cart
            </Link>

            {user?.token ? (
              <button
                onClick={() => {
                  closeMobileMenu();
                  handleLogout();
                }}
                className="text-gray-700 hover:text-black text-base font-medium block w-full text-left"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => {
                  closeMobileMenu();
                  router.push("/Signin");
                }}
                className="text-gray-700 hover:text-black text-base font-medium block w-full text-left"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </Drawer>
    </header>
  );
};

export default Navbar;
