import React, { useState } from 'react';
import { Mail, CreditCard, Github } from 'lucide-react';

const Footer = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Email submitted:', email);

        setEmail('');
    };

    return (
        <footer className="bg-custom-gray text-white py-16 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">

                    <div className="lg:col-span-1">
                        <div className="flex items-center space-x-2 mb-4">
                            <img src='/Logo.png' className='h-16' alt='Logo'/>
                        </div>
                    </div>

                    {/* Community Section */}
                    <div className="lg:col-span-1 text-center">
                        <h3 className="text-xl font-semibold mb-2">Join the community</h3>
                        <p className="text-sm opacity-90 mb-6">Promos, exclusive, advice, tutorials, no spam!</p>

                        <div className="mb-8">
                            <div className="relative max-w-sm mx-auto">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="E-mail"
                                    className="w-full px-4 py-3 rounded-full bg-transparent border border-white/30 placeholder-white/70 text-white focus:outline-none focus:border-white/60 transition-colors"
                                />
                                <button
                                    onClick={handleSubmit}
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full hover:bg-white/10 transition-colors"
                                >
                                    <Mail className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Legal Links Section */}
                    <div className="lg:col-span-1">
                        <div className="space-y-3 text-sm">
                            <a href="#" className="block hover:text-white/80 transition-colors">Legal Notice</a>
                            <a href="#" className="block hover:text-white/80 transition-colors">General Conditions of Sale</a>
                            <a href="#" className="block hover:text-white/80 transition-colors">Privacy Policy</a>
                            <a href="#" className="block hover:text-white/80 transition-colors">Contact Us</a>
                            <a href="#" className="block hover:text-white/80 transition-colors">Our Point of Sale</a>
                            <a href="#" className="block hover:text-white/80 transition-colors">Become an ambassador</a>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="mt-16 pt-8 border-t border-white/20">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        {/* Copyright */}
                        <div className="text-sm opacity-80 mb-4 md:mb-0">
                            © 2025, Workmore
                        </div>

                        {/* Payment Icons */}
                        <div className="flex space-x-3">
                            {/* Visa */}
                            <div className="w-12 h-8 bg-white rounded flex items-center justify-center">
                                <div className="text-blue-600 font-bold text-xs">VISA</div>
                            </div>

                            {/* American Express */}
                            <div className="w-12 h-8 bg-blue-500 rounded flex items-center justify-center">
                                <div className="text-white font-bold text-xs">AMEX</div>
                            </div>

                            {/* Discover */}
                            <div className="w-12 h-8 bg-orange-500 rounded flex items-center justify-center">
                                <CreditCard className="w-4 h-4 text-white" />
                            </div>

                            {/* Mastercard */}
                            <div className="w-12 h-8 bg-red-500 rounded flex items-center justify-center">
                                <div className="flex space-x-1">
                                    <div className="w-2 h-2 bg-white rounded-full"></div>
                                    <div className="w-2 h-2 bg-yellow-300 rounded-full"></div>
                                </div>
                            </div>

                            {/* PayPal/GitHub */}
                            <div className="w-12 h-8 bg-gray-800 rounded flex items-center justify-center">
                                <Github className="w-4 h-4 text-white" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;