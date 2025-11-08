import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";
import constant from "@/services/constant";
const MyOrders = () => {
    const [activeTab, setActiveTab] = useState("Products");

    const ordersData = [
        {
            id: "#123456",
            date: "01 August, 2025",
            time: "12:00 PM",
            status: "Processing",
            deliveryDate: "Tuesday, 05 August, 2025",
            address: "123, Anywhere Street, Pincode - 12345",
            total: "€53.20",
            products: [
                {
                    name: "28-Day Detox Tea",
                    price: "28.60",
                    quantity: 1,
                    image:
                        "/insta1.png",
                },
                {
                    name: "Slim Tea",
                    price: "26.60",
                    quantity: 1,
                    image:
                        "/insta1.png",
                },
            ],
        },
        {
            id: "#589626",
            date: "01 August, 2025",
            time: "12:20 PM",
            status: "Processing",
            deliveryDate: "Tuesday, 09 August, 2025",
            address: "123, Anywhere Street, Pincode - 12345",
            total: "€53.20",
            products: [
                {
                    name: "20-Day Detox Tea",
                    price: "45.60",
                    quantity: 1,
                    image:
                        "/insta1.png",
                },
                {
                    name: "Slim Tea",
                    price: "26.60",
                    quantity: 1,
                    image:
                        "/insta1.png",
                },
            ],
        },
    ];

    const servicsData = [
        {
            id: "#123456",
            date: "01 August, 2025",
            time: "12:00 PM",
            status: "Processing",
            noOfServices: "1",
            servicesDate: "Tuesday, 05 August, 2025",
            time: "1.00 Pm",
            total: "€53.20",
            products: [
                {
                    name: "Massage-Slimming Treatment",
                    price: "28.60",
                    massageType: "Lymphatic Treatment - Upper Body",
                    image:
                        "/insta1.png",
                },
            ],
        },

    ];

    return (
        <div className="min-h-screen bg-white px-4 py-6 mx-auto max-w-7xl">
            {/* Header */}
            <div className="flex items-center gap-2 mb-5">
                <Link href="/my-account">
                    <ArrowLeft className="w-6 h-6 cursor-pointer text-black" />
                </Link>
                <h1 className="text-xl font-semibold text-black">My Orders</h1>
            </div>


            <div className="flex gap-3 mb-6">
                {["Products", "Services"].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-5 py-1.5 rounded-full text-sm font-medium ${activeTab === tab
                            ? "bg-black text-white"
                            : "bg-gray-100 text-gray-600"
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>


            {activeTab == "Products" ? (
                ordersData.map((order, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="border rounded-2xl shadow-sm p-4 md:p-6 mb-6"
                    >
                        <div className="flex flex-col md:flex-row justify-between  pb-4 border-b-1">
                            <div>
                                <p className="font-medium text-black">
                                    Order No: <span className="text-gray-700">{order.id}</span>
                                </p>

                                <div className="flex justify-center items-center gap-8">
                                    <p className="text-gray-500 text-sm">
                                        Ordered on: {order.date}
                                    </p>
                                    <p className="text-gray-500 text-sm">
                                        At: {order.time}
                                    </p>
                                    <p className="text-gray-500 text-sm">
                                        Products:{" "}
                                        {order.products.length}
                                    </p>
                                </div>
                            </div>
                            <button className="text-sm text-black border px-3 py-1.5 rounded-lg hover:bg-gray-100 mt-2 md:mt-0">
                                Download Invoice
                            </button>
                        </div>

                        <div className="text-sm text-gray-700 space-y-1 mb-4 pt-4">
                            <p>
                                <span className="text-gray-500">Status:</span>{" "}
                                <span className="text-blue-600 font-medium">{order.status}</span>
                            </p>
                            <p>
                                <span className="text-gray-500">Date of Delivery:</span>{" "}
                                {order.deliveryDate}
                            </p>
                            <p>
                                <span className="text-gray-500">Deliver to:</span> {order.address}
                            </p>
                            <p>
                                <span className="text-gray-500">Total:</span> {order.total}
                            </p>
                        </div>

                        {/* Products */}
                        <div className="border-t pt-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {order.products.map((product, j) => (
                                <div
                                    key={j}
                                    className="flex items-center justify-between border rounded-xl p-3 hover:shadow-sm"
                                >
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-16 h-16 object-cover rounded-lg"
                                        />
                                        <div>
                                            <h3 className="font-medium text-black">{product.name}</h3>
                                            <p className="text-gray-500 text-sm">
                                                Quantity: {product.quantity}
                                            </p>
                                        </div>
                                    </div>
                                    <p className="font-semibold text-black">{constant.currency}{product.price}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ))
            ) : (
                servicsData.map((order, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="border rounded-2xl shadow-sm p-4 md:p-6 mb-6"
                    >
                        <div className="flex flex-col md:flex-row justify-between pb-4 border-b-1">
                            <div>
                                <p className="font-medium text-black">
                                    Order No: <span className="text-gray-700">{order.id}</span>
                                </p>
                                <div className="flex justify-center items-center gap-8">
                                    <p className="text-gray-500 text-sm">
                                        Ordered on: {order.date}
                                    </p>
                                    <p className="text-gray-500 text-sm">
                                        At: {order.time}
                                    </p>
                                    <p className="text-gray-500 text-sm">
                                        Number of Services availed:{" "}
                                        {order.noOfServices}
                                    </p>
                                </div>
                            </div>
                            <button className="text-sm text-black border px-3 py-1.5 rounded-lg hover:bg-gray-100 mt-2 md:mt-0">
                                Download Invoice
                            </button>
                        </div>

                        <div className="pt-4 text-sm text-gray-700 space-y-1 mb-4">
                            <p>
                                <span className="text-gray-500">Status:</span>{" "}
                                <span className="text-blue-600 font-medium">{order.status}</span>
                            </p>
                            <p>
                                <span className="text-gray-500">Date of Service::</span>{" "}
                                {order.servicesDate}
                            </p>
                            <p>
                                <span className="text-gray-500">Time of Service:</span> {order.time}
                            </p>
                            <p>
                                <span className="text-gray-500">Total:</span> {order.total}
                            </p>
                        </div>

                        {/* Products */}
                        <div className="border-t pt-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {order.products.map((product, j) => (
                                <div
                                    key={j}
                                    className="flex items-center justify-between border rounded-xl p-3 hover:shadow-sm"
                                >
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-16 h-16 object-cover rounded-lg"
                                        />
                                        <div>
                                            <h3 className="font-medium text-black">{product.name}</h3>
                                            <p className="text-gray-500 text-[13px] pt-4">
                                            {product.massageType}
                                            </p>
                                        </div>
                                    </div>
                                    <p className="font-semibold text-black">{constant.currency}{product.price}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ))
            )
            }
        </div>
    );
};

export default MyOrders;
