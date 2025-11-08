import React, { useState, useEffect } from 'react';
import { CountryDropdown } from 'react-country-region-selector';
import { Api } from '@/services/service';
import { FaUserAlt } from "react-icons/fa";
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const EditProfile = (props) => {

    const [profileData, setProfileData] = useState({
        username: '',
        email: '',
        number: '',

    });

    const [profilePassword, setProfilePassword] = useState({
        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState({
        username: '',
        email: '',
        number: '',
        password: '',
        confirmPassword: ''
    });

    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const userDetails = localStorage.getItem('userDetail');
        const token = localStorage.getItem('token');

        if (userDetails && token) {
            setUser(JSON.parse(userDetails));
            getProfileData();
        }

    }, []);

    const validateField = (name, value) => {
        switch (name) {
            case 'username':
                if (!value.trim()) return ('First name is required');
                if (!/^[A-Za-z\s]+$/.test(value)) return t('Only letters allowed');
                if (value.length < 2) return ('Minimum 2 characters required');
                return '';
            case 'email':
                if (!value.trim()) return ('Email is required');
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return ('Invalid email format');
                return '';
            case 'number':
                if (!value) return ('Phone number is required');
                if (!/^\d{10}$/.test(value)) return ('Must be 10 digits');
                return '';
            case 'password':
                if (!value && isEditing) return '';
                if (!value) return t('Password is required');
                if (value.length < 8) return ('Minimum 8 characters');
                if (!/[A-Z]/.test(value)) return ('At least one uppercase letter');
                if (!/[a-z]/.test(value)) return ('At least one lowercase letter');
                if (!/[0-9]/.test(value)) return ('At least one number');
                if (!/[^A-Za-z0-9]/.test(value)) return ('At least one special character');
                return '';
            case 'confirmPassword':
                if (profilePassword.password !== value) return ('Passwords do not match');
                return '';
            default:
                return '';
        }
    };

    const handleInputChange = (name, value) => {
        if ((name === 'username') && /[0-9]/.test(value)) {
            return;
        }
        if (name === 'number' && value && !/^\d*$/.test(value)) {
            return;
        }

        setProfileData(prev => ({
            ...prev,
            [name]: value
        }));

        setErrors(prev => ({
            ...prev,
            [name]: ''
        }));
    };

    const handlePasswordChange = (name, value) => {
        setProfilePassword(prev => ({
            ...prev,
            [name]: value
        }));

        setErrors(prev => ({
            ...prev,
            [name]: ''
        }));
    };

    const handleBlur = (name, value) => {
        const error = validateField(name, value);
        setErrors(prev => ({
            ...prev,
            [name]: error
        }));
    };

    const getProfileData = () => {
        props.loader(true);
        Api("get", "getProfile", null)
            .then(res => {
                props.loader(false);
                if (res?.status) {
                    setProfileData(prev => ({
                        ...prev,
                        username: res.data.username || '',
                        email: res.data.email || '',
                        number: res.data.number || '',
                    }));
                } else {
                    props.toaster({ type: "error", message: res?.data?.message });
                }
            })
            .catch(err => {
                props.loader(false);
                props.toaster({ type: "error", message: err?.data?.message });
            });
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = {};

        Object.keys(profileData).forEach(key => {
            const error = validateField(key, profileData[key]);
            if (error) {
                isValid = false;
                newErrors[key] = error;
            }
        });

        if (profilePassword.password || profilePassword.confirmPassword) {
            const passwordError = validateField('password', profilePassword.password);
            if (passwordError) {
                isValid = false;
                newErrors.password = passwordError;
            }

            const confirmError = validateField('confirmPassword', profilePassword.confirmPassword);
            if (confirmError) {
                isValid = false;
                newErrors.confirmPassword = confirmError;
            }
        }
        setErrors(newErrors);
        return isValid;
    };

    const toggleEditMode = () => {
        if (isEditing) {
            if (!validateForm()) {
                props.toaster({ type: "error", message: t("Please fix the errors in the form") });
                return;
            }
            updateProfile();
        } else {
            setIsEditing(true);
        }
    };

    const updateProfile = () => {
        props.loader(true);
        const payload = {
            ...profileData,
        };

        Api("post", "updateProfile", payload)
            .then(res => {
                props.loader(false);
                if (res?.status) {
                    props.toaster({ type: "success", message: ("Profile updated successfully") });
                    if (res.data) {
                        const userDetail = JSON.parse(localStorage.getItem('userDetail') || '{}');
                        const updatedUser = { ...userDetail, ...res.data };
                        localStorage.setItem('userDetail', JSON.stringify(updatedUser));
                        setUser(updatedUser);
                    }
                    setIsEditing(false);
                } else {
                    props.toaster({ type: "error", message: res?.data?.message || ("Failed to update profile") });
                }
            })
            .catch(err => {
                props.loader(false);
                props.toaster({ type: "error", message: err?.data?.message || ("Failed to update profile") });
            });
    };

    const changePassword = () => {
        if (!profilePassword.password) {
            props.toaster({ type: "error", message: ("Password cannot be empty") });
            return;
        }

        if (profilePassword.password !== profilePassword.confirmPassword) {
            props.toaster({ type: "error", message: ("Passwords don't match") });
            return;
        }

        const passwordError = validateField('password', profilePassword.password);
        if (passwordError) {
            setErrors(prev => ({
                ...prev,
                password: passwordError,
                confirmPassword: ''
            }));
            return;
        }

        props.loader(true);
        const passwordData = {
            password: profilePassword.password,
            confirmPassword: profilePassword.confirmPassword
        };

        Api("post", "profile/changePassword", passwordData)
            .then(res => {
                props.loader(false);
                if (res?.status) {
                    props.toaster({ type: "success", message: ("Password changed successfully") });
                    setProfilePassword({
                        password: '',
                        confirmPassword: '',
                    });
                    setErrors(prev => ({
                        ...prev,
                        password: '',
                        confirmPassword: ''
                    }));
                } else {
                    vtoaster({ type: "error", message: res?.data?.message || ("Failed to change password") });
                }
            })
            .catch(err => {
                props.loader(false);
                props.toaster({ type: "error", message: err?.data?.message || ("Failed to change password") });
            });
    };

    return (
        <div className="min-h-[700px] mx-auto max-w-7xl px-4 py-6 md:py-8">
            <div className="flex justify-between items-center gap-2 mb-5 border-b-[2px] pb-4 border-gray-300">
                <div className='flex items-center gap-4'>
                    <Link href="/MyAccount">
                        <ArrowLeft className="w-6 h-6 cursor-pointer text-black" />
                    </Link>
                    <h1 className="text-xl font-semibold text-black">My Profile</h1>
                </div>
                <div className='flex items-center gap-4'>
                    <button className="bg-custom-gray text-sm rounded-lg text-white px-4 py-2.5 hover:bg-gray-800 transition mt-4">Customer Support</button>
                    <button className="bg-red-500 text-sm rounded-lg text-white px-4 py-2.5 hover:bg-gray-800 transition mt-4">Delete My Account</button>
                </div>
            </div>

            <div className="bg-white rounded-lg border-2 border-gray-200 shadow-lg overflow-hidden max-w-lg mx-auto">
                <div className="p-4 md:p-6 flex flex-col items-center">
                    <div className="md:mr-8 md:mx-2 mx-auto mb-3 md:mb-4 sm:mr-4">
                        <FaUserAlt className='text-black' size={55} />
                    </div>
                    <div className="text-center sm:text-left">
                        <h2 className="text-xl font-semibold text-black">{user?.fullName || profileData.username || "User Name"}</h2>
                        <p className="text-gray-600">{user?.email || profileData.email || "user@example.com"}</p>
                    </div>

                </div>


                <div className="px-4 md:px-6 pb-6">
                    <div className="max-w-lg mx-auto grid grid-cols-1 gap-4 md:gap-6">
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-1">{("First Name")}</label>
                            {isEditing ? (
                                <>
                                    <input
                                        className={`w-full p-2 border rounded text-black focus:outline-none focus:ring-1 ${errors.username ? 'border-red-500 focus:ring-red-500' : 'focus:ring-black'}`}
                                        value={profileData.username}
                                        type='text'
                                        name="username"
                                        placeholder={("Your Name")}
                                        onChange={(e) => handleInputChange("username", e.target.value)}
                                        onBlur={(e) => handleBlur("username", e.target.value)}
                                    />
                                    {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
                                </>
                            ) : (
                                <div className="text-black w-full p-2 border rounded bg-gray-50">
                                    {profileData.username || ('Not provided')}
                                </div>
                            )}
                        </div>


                        <div className="mb-4">
                            <label className="block text-gray-700 mb-1">{("Email")}</label>
                            {isEditing ? (
                                <>
                                    <input
                                        className={`w-full p-2 border rounded text-black focus:outline-none focus:ring-1 ${errors.email ? 'border-red-500 focus:ring-red-500' : 'focus:ring-black'}`}
                                        value={profileData.email}
                                        type='email'
                                        name="email"
                                        placeholder={("Your Email")}
                                        onChange={(e) => handleInputChange("email", e.target.value)}
                                        onBlur={(e) => handleBlur("email", e.target.value)}
                                    />
                                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                                </>
                            ) : (
                                <div className="text-black w-full p-2 border rounded bg-gray-50">
                                    {profileData.email || ('Not provided')}
                                </div>
                            )}
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 mb-1">{("Mobile")}</label>
                            {isEditing ? (
                                <>
                                    <input
                                        className={`w-full p-2 border rounded text-black focus:outline-none focus:ring-1 ${errors.number ? 'border-red-500 focus:ring-red-500' : 'focus:ring-black'}`}
                                        value={profileData.number}
                                        type='tel'
                                        name="number"
                                        placeholder={("Your Mobile Number")}
                                        onChange={(e) => handleInputChange("number", e.target.value)}
                                        onBlur={(e) => handleBlur("number", e.target.value)}
                                        maxLength={10}
                                    />
                                    {errors.number && <p className="text-red-500 text-sm mt-1">{errors.number}</p>}
                                </>
                            ) : (
                                <div className="text-black w-full p-2 border rounded bg-gray-50">
                                    {profileData.number || ('Not provided')}
                                </div>
                            )}
                        </div>

                        <button
                            className="mt-3 sm:mt-0  px-4 py-2 rounded-lg bg-custom-gray text-white hover:bg-gray-800 cursor-pointer transition"
                            onClick={toggleEditMode}
                        >
                            {isEditing ? ('Save') : ('Edit')}
                        </button>
                    </div>

                 
                </div>
            </div>
        </div>
    );
};

export default EditProfile;