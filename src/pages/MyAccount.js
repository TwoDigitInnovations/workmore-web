import React from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ArrowLeft, Box, Heart, MapPin, Edit, LogOut } from "lucide-react";
import Swal from "sweetalert2";

const MyAccount = (props) => {
    const router = useRouter();

    const menuItems = [
        { icon: <Box className="w-10 h-10" />, title: "My Orders", link: "/MyOrders" },
        { icon: <Heart className="w-10 h-10" />, title: "Wishlist", link: "/wishlist" },
        { icon: <MapPin className="w-10 h-10" />, title: "Addresses", link: "/SavedAddress" },
        { icon: <Edit className="w-10 h-10" />, title: "Profile Details", link: "/EditProfile" },
    ];

    const logOut = () => {
        Swal.fire({
            text: "Are you sure you want to logout?",
            showCancelButton: true,
            confirmButtonText: "Yes, Logout",
            cancelButtonText: "Cancel",
            confirmButtonColor: "#D9AB83",
            buttonsStyling: false,
            customClass: {
                popup: "rounded-4xl p-6",
                title: "text-lg font-semibold text-gray-800",
                confirmButton:
                    "bg-yellow-600 text-white font-medium py-2.5 px-6 rounded-lg hover:bg-yellow-700 transition",
                cancelButton:
                    "bg-gray-300 text-gray-800 font-medium py-2.5 px-6 rounded-lg hover:bg-gray-400 transition",
                actions: "flex justify-center gap-4 mt-4",
            },
            width: "380px"
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem("userDetail");
                localStorage.removeItem("token");
                router.push("/login");
            }
        });
    };

    return (
        <div className="md:min-h-[650px] min-h-[800px] flex flex-col items-center bg-white px-4 py-6 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center w-full  mb-6 mt-6 ">
                <Link href="/" className="flex items-center gap-2 text-black">
                    <ArrowLeft className="w-6 h-6 cursor-pointer" />
                    <h1 className="text-xl font-semibold">My Profile</h1>
                </Link>
            </div>

            {/* Profile Info */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center mb-10"
            >
                <div className="w-20 h-20 flex justify-center items-center bg-gray-700 rounded-full mb-3 text-white">
                    <p className="text-white text-4xl"> T </p>
                    </div>
                <h2 className="text-lg font-semibold text-black">Anny</h2>
                <p className="text-gray-400 text-sm">anny@email.com</p>
            </motion.div>

            {/* Menu Items */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 w-full max-w-4xl justify-items-center">
                {menuItems.map((item, i) => (
                    <Link key={i} href={item.link} className="w-full flex justify-center">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.97 }}
                            className="flex flex-col items-center justify-center w-36 h-24 border rounded-xl shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
                        >
                            <div className="mb-2 text-gray-800">{item.icon}</div>
                            <span className="text-md font-medium text-black">{item.title}</span>
                        </motion.div>
                    </Link>
                ))}
            </div>

            {/* Logout Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-12 bg-red-500 text-white px-8 py-2.5 text-md rounded-full shadow-md hover:bg-red-600 transition-all"
                onClick={logOut}
            >
                <div className="flex items-center gap-2">
                    <LogOut className="w-5 h-5" />
                    Logout
                </div>
            </motion.button>
        </div>
    );
};

export default MyAccount;
