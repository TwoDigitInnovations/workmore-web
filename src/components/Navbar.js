"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineShoppingBag } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseOutline } from "react-icons/io5";
import Drawer from "@mui/material/Drawer";

const Navbar = () => {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="w-full bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 ">
        <nav className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex gap-8">
            <div
              className="text-xl font-bold text-black cursor-pointer"
              onClick={() => router.push("/")}
            >
              <img src="/Logo.png" className="h-14"/>
            </div>
            <div className="flex items-center space-x-6 md:flex hidden">
              <div className="relative group">
                <Link href="/shop" className="text-gray-700 hover:text-black text-sm font-medium flex items-center">
                  Shop
                  <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </Link>
              </div>

              <Link href="/point-of-sale" className="text-gray-700 hover:text-black text-sm font-medium">
                Our Point of Sale
              </Link>
            </div>
          </div>


          <div className="hidden md:flex items-center space-x-8">

            <div className="flex items-center space-x-4">
              <FaRegUser
                className="cursor-pointer text-2xl text-gray-700 hover:text-black"
                onClick={() => router.push("/Signin")}
                aria-label="Account"
              />
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
          <div className="mt-12">
            <ul className="space-y-6">
              <li>
                <Link
                  href="/shop"
                  className="text-gray-700 hover:text-black text-base font-medium block"
                  onClick={closeMobileMenu}
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  href="/point-of-sale"
                  className="text-gray-700 hover:text-black text-base font-medium block"
                  onClick={closeMobileMenu}
                >
                  Our Point of Sale
                </Link>
              </li>
              <li>
                <Link
                  href="/account"
                  className="text-gray-700 hover:text-black text-base font-medium block"
                  onClick={closeMobileMenu}
                >
                  Account
                </Link>
              </li>
              <li>
                <Link
                  href="/cart"
                  className="text-gray-700 hover:text-black text-base font-medium block"
                  onClick={closeMobileMenu}
                >
                  Cart
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </Drawer>
    </header>
  );
};

export default Navbar;