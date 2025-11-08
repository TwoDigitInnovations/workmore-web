import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { userContext } from "./_app";
import { Api } from "@/services/service";
import { ChevronLeft, MapPin, Edit, Trash2, Plus } from "lucide-react";
import { toast } from "react-toastify";

const SavedAddress = (props) => {
    const router = useRouter();
    const [user] = useContext(userContext);
    const [addresses, setAddresses] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingAddress, setEditingAddress] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        label: "",
        phone: "",
        address: "",
        pincode: "",
    });

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) getAddress();
    }, []);

    const getAddress = async () => {
        props.loader(true);
        try {
            const res = await Api("get", "getAllAddress", null, router);
            setAddresses(res.data.addresses || []);
            props.loader(false);
        } catch (err) {
            props.loader(false);
            toast.error(err?.message)
        }
    };

    const handleInput = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        props.loader(true);
        try {
            if (editingAddress) {
                await Api("post", `updateAddress/${editingAddress._id}`, null, router);
            }
            await Api("post", "addAddress", formData, router);
            setShowForm(false);
            setEditingAddress(null);
            setFormData({ name: "", label: "", phone: "", address: "", pincode: "" });
            getAddress();
            toast.success("Address saved successfully!")
        } catch (err) {
            toast.error(err?.message)
            props.loader(false);
        }
    };

    const handleDelete = async (id) => {
        props.loader(true);
        try {
            await Api("delete", `deleteAddress/${id}`, null, router);
            getAddress();
            toast.success("Address deleted!")
        } catch (err) {
            toast.error(err?.message)
            props.loader(false);
        }
    };

    const handleSetDefault = async (id) => {
        props.loader(true);
        try {
            await Api("post", `setDefaultAddress/${id}`, null, router);
            getAddress();
            toast.success("Default address updated!")
        } catch (err) {
            toast.error(err?.message)
            props.loader(false);
        }
    };

    const defaultAddress = addresses.find((a) => a.isDefault);
    const otherAddresses = addresses.filter((a) => !a.isDefault);


    console.log(defaultAddress);
    console.log(otherAddresses);
    
    
    return (
        <div className="mx-auto max-w-7xl md:py-6 py-8 px-4 min-h-screen">
           
            <div className="flex items-center gap-2 mb-6">
                <ChevronLeft
                    className="cursor-pointer hover:text-[#D9AB83] text-black transition-colors"
                    onClick={() => router.back()}
                />
                <h2 className="text-xl font-semibold text-gray-800">Saved Addresses</h2>
            </div>

     
            <div className="flex justify-end mb-4">
                <button
                    onClick={() => {
                        setShowForm(true);
                        setEditingAddress(null);
                    }}
                    className="cursor-pointer flex items-center gap-2 bg-custom-gray text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all hover:scale-105"
                >
                    <Plus size={18} /> Add Address
                </button>
            </div>

          
            <div className="grid md:grid-cols-2 gap-8 md:px-4">
                {/* Default Address */}
                <div>
                    <h3 className="font-semibold mb-3 text-gray-700">Default Address</h3>
                    {defaultAddress ? (
                        <div className="border rounded-xl p-4 shadow-sm hover:shadow-md transition-all">
                            <div className="flex justify-between">
                                <p className="font-medium text-gray-800">{defaultAddress.name}</p>
                                <span className="text-xs bg-[#D9AB83]/20 text-[#D9AB83] px-2 py-1 rounded-full">
                                    {defaultAddress.label}
                                </span>
                            </div>
                            <p className="text-gray-700 text-sm mt-1">
                                {defaultAddress.address}, Pincode - {defaultAddress.pincode}
                            </p>
                            <p className="text-gray-600 text-sm">
                                Phone: {defaultAddress.phone}
                            </p>
                            <div className="flex gap-4 mt-3">
                                <Edit
                                    className="cursor-pointer text-gray-700 hover:text-[#D9AB83] transition-colors"
                                    size={18}
                                    onClick={() => {
                                        setEditingAddress(defaultAddress);
                                        setFormData(defaultAddress);
                                        setShowForm(true);
                                    }}
                                />
                                <Trash2
                                    className="cursor-pointer text-red-500 hover:text-red-600 transition-colors"
                                    size={18}
                                    onClick={() => handleDelete(defaultAddress._id)}
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center border rounded-xl p-6 text-gray-500 bg-gray-50 shadow-sm">
                            <MapPin size={40} className="text-[#D9AB83] mb-3" />
                            <p>No default address set yet.</p>
                        </div>
                    )}
                </div>

                {/* Other Addresses */}
                <div>
                    <h3 className="font-semibold mb-3 text-gray-700">Other Addresses</h3>
                    {otherAddresses.length > 0 ? (
                        <div className="space-y-4">
                            {otherAddresses.map((addr) => (
                                <div
                                    key={addr._id}
                                    className="border rounded-xl p-4 shadow-sm hover:shadow-md transition-all relative"
                                >
                                    <div className="flex justify-between">
                                        <p className="font-medium text-gray-800">{addr.name}</p>
                                        <span className="text-xs bg-[#D9AB83]/20 text-[#D9AB83] px-2 py-1 rounded-full">
                                            {addr.label}
                                        </span>
                                    </div>
                                    <p className="text-gray-700 text-sm mt-1">
                                        {addr.address}, Pincode - {addr.pincode}
                                    </p>
                                    <p className="text-gray-600 text-sm">Phone: {addr.phone}</p>

                                    <div className="flex gap-4 mt-3">
                                        <Edit
                                            className="cursor-pointer text-gray-700 hover:text-[#D9AB83] transition-colors"
                                            size={18}
                                            onClick={() => {
                                                setEditingAddress(addr);
                                                setFormData(addr);
                                                setShowForm(true);
                                            }}
                                        />
                                        <Trash2
                                            className="cursor-pointer text-red-500 hover:text-red-600 transition-colors"
                                            size={18}
                                            onClick={() => handleDelete(addr._id)}
                                        />
                                        <button
                                            onClick={() => handleSetDefault(addr._id)}
                                            className="text-xs text-[#D9AB83] font-medium underline hover:text-[#b98c66] transition-colors"
                                        >
                                            Set as Default
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center border rounded-xl p-6 text-gray-500 bg-gray-50 shadow-sm">
                            <MapPin size={40} className="text-[#D9AB83] mb-3" />
                            <p>No other addresses found.</p>
                        </div>
                    )}
                </div>
            </div>

        
            {showForm && (
                <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 backdrop-blur-sm">
                    <div className="bg-white p-6 rounded-xl shadow-xl w-96">
                        <h3 className="text-lg font-semibold mb-4 text-gray-800">
                            {editingAddress ? "Edit Address" : "Add New Address"}
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-3">
                            {["name", "label", "phone", "address", "pincode"].map((key) => (
                                <input
                                    key={key}
                                    type="text"
                                    name={key}
                                    placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                                    value={formData[key]}
                                    onChange={handleInput}
                                    required
                                    className="w-full text-black border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D9AB83]/60"
                                />
                            ))}
                            <div className="flex justify-end gap-3 mt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowForm(false)}
                                    className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100 transition-all cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-custom-gray text-white rounded-lg hover:bg-[#c99c73] transition-all cursor-pointer"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SavedAddress;
