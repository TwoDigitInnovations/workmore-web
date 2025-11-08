import React, { useContext, useState } from 'react';
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { Api } from '@/services/service';
import { useRouter } from 'next/router';
import { userContext } from './_app';

function ModernSignIn(props) {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [user, setUser] = useContext(userContext)
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
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        }

        return newErrors;
    };

    const submit = (e) => {
        e.preventDefault();
        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const data = {
            username: formData.email.toLowerCase(),
            password: formData.password,
        };

        props?.loader?.(true);

        Api("post", "login", data, router).then(
            (res) => {
                props?.loader?.(false);

                if (res?.status) {
                    const userData = res.data;

                    if (userData.status === "Suspended") {
                        props?.toaster?.({
                            type: "error",
                            message:
                                "Your account has been suspended by our team. Please contact support.",
                        });
                        return;
                    }
                    props?.toaster?.({
                        type: "success",
                        message: "You are successfully logged in",
                    });
                    router.push("/");
                    localStorage.setItem("userDetail", JSON.stringify(userData));
                    localStorage.setItem("token", userData.token);
                    setUser(userData);
                    setFormData({ email: "", password: "" });
                } else {
                    props?.toaster?.({
                        type: "error",
                        message: res?.data?.message || "Login failed",
                    });
                }
            },
            (err) => {
                props?.loader?.(false);
                props?.toaster?.({
                    type: "error",
                    message: err?.data?.message || err?.message || "Something went wrong",
                });
            }
        );
    };

    return (
        <div className="md:min-h-[650px] pb-10 md:mt-18 mt-10 bg-gradient-to-t from-[#f5f5dc] via-[#f5f5dc] to-white px-4 flex items-center justify-center min-h-[750px]">
            <div className='max-w-7xl Shodow-lg flex w-full mx-auto border-2 border-blue-50 rounded-4xl'>
                <div className="w-full md:w-1/2 flex items-center justify-center md:p-8 p-3 bg-white rounded-4xl">
                    <div className="w-full max-w-md">
                        <div className="bg-white rounded-2xl md:p-8 p-2">
                            <h1 className="text-3xl font-bold text-gray-800 mb-8">Login</h1>
                            <div className="space-y-6">
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
                                            placeholder="••••••••"
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

                                <div className="text-right">
                                    <button
                                        type="button"
                                        className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                                    >
                                        Forgot Password ?
                                    </button>
                                </div>

                                <button
                                    type="submit"
                                    onClick={submit}
                                    className="w-full bg-black text-white py-3 rounded-full font-semibold hover:bg-gray-800 transition-all duration-300 transform hover:scale-[1.02] shadow-lg cursor-pointer"
                                >
                                    Login
                                </button>

                                <p className="text-black text-center">
                                    Don't have an account?{" "}
                                    <span
                                        className="hover:text-gray-600 cursor-pointer font-semibold"
                                        onClick={() => router.push("Signup")}
                                    >
                                        Register now
                                    </span>
                                </p>
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
                            Welcome
                        </h1>
                        <h2 className="text-6xl font-bold text-white drop-shadow-2xl text-left">
                            Back!
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModernSignIn;
