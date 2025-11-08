import React, { useState } from 'react';
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { Api } from '@/services/service';
import { useRouter } from 'next/router';

function Signup(props) {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: ''
    });
    const router = useRouter()
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        // Name validation
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        } else if (formData.name.length < 3) {
            newErrors.name = 'Name must be at least 3 characters';
        }

        // Email validation
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }

        // Password validation
        if (!formData.password.trim()) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        setErrors(newErrors);
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = validateForm();

        // stop submit if errors exist
        if (Object.keys(newErrors).length > 0) {
            return;
        }

        props?.loader?.(true);
        const data = {
            email: formData.email.toLowerCase(),
            username: formData.name,
            password: formData.password,
            type: "USER",
        };

        Api("post", "signUp", data, router).then(
            (res) => {
                props?.loader?.(false);
                if (res?.success) {
                    router.push("/Signin");
                    props?.toaster?.({
                        type: "success",
                        message: "Registered successfully",
                    });
                } else {
                    props?.toaster?.({
                        type: "error",
                        message: res?.data?.message || "Registration failed",
                    });
                }
            },
            (err) => {
                props?.loader?.(false);
                props?.toaster?.({
                    type: "error",
                    message: err?.message || "Something went wrong",
                });
            }
        );
    };

    return (
        <div className="md:min-h-[650px] md:mt-18 mt-20   bg-gradient-to-t from-[#f5f5dc] via-[#f5f5dc] to-white md:mb-0 pb-20 flex items-center justify-center min-h-[750px]">
            <div className='max-w-7xl Shodow-lg flex w-full md:mx-auto border-2 border-gray-300 rounded-4xl mx-4'>
                <div className="w-full md:w-1/2 flex items-center justify-center bg-white rounded-4xl md:p-8 p-4 ">
                    <div className="w-full md:max-w-md">
                        <div className="bg-white rounded-2xl  md:p-8 p-2 ">
                            <h1 className="text-3xl font-bold text-gray-800 mb-8">Sign Up</h1>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="john"
                                        className={`w-full px-4 text-black py-3 border rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 ${errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'
                                            }`}
                                    />
                                    {errors.email && (
                                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="joe@example.com"
                                        className={`w-full px-4 text-black py-3 border rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 ${errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'
                                            }`}
                                    />
                                    {errors.email && (
                                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            placeholder="**********"
                                            className={`w-full px-4 py-3 text-black pr-12 border rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 ${errors.password ? 'border-red-500 bg-red-50' : 'border-gray-300'
                                                }`}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                                        >
                                            {showPassword ? (
                                                <IoEyeOutline className="w-5 h-5" />
                                            ) : (
                                                <IoEyeOffOutline className="w-5 h-5" />
                                            )}
                                        </button>
                                    </div>
                                    {errors.password && (
                                        <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    onClick={handleSubmit}
                                    className="w-full bg-black text-white py-3 rounded-full font-semibold hover:bg-gray-800 transition-all duration-300 transform hover:scale-[1.02] shadow-lg cursor-pointer"
                                >
                                    Sign up
                                </button>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="w-1/2 relative md:flex hidden">
                    <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat rounded-4xl"
                        style={{
                            backgroundImage: `linear-gradient(to bottom right, rgba(75, 85, 99, 0.6), rgba(55, 65, 81, 0.8)), url('/signin.png')`,
                        }}
                    ></div>


                    <div className="absolute top-16 right-10 flex flex-col items-end justify-center z-10 text-center px-4">
                        <h1 className="text-6xl font-bold text-black mb-4 drop-shadow-2xl">
                            Welcome!
                        </h1>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;