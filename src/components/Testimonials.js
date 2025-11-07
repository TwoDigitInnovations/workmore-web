import { useState } from "react";
import React from 'react';
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { FaStar } from "react-icons/fa6";

const CustomerTestimonials = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const testimonials = [
        {
            name: "James K.",
            role: "Traveler",
            text: `"You won’t regret it—thank you for the amazing product, Absolutely wonderful!"`,
            img: "/image36.png"
        },
        {
            name: "Lena M.",
            role: "Photographer",
            text: `"Amazing experience. The design is sleek, and customer service is unmatched!"`,
            img: "https://storage.googleapis.com/a1aa/image/72bf786b-ed43-4c15-d317-2535e2142852.jpg"
        },
        {
            name: "Chris W.",
            role: "Infulencer",
            text: `"I'm really happy with the results. It fits my needs perfectly."`,
            img: "https://storage.googleapis.com/a1aa/image/a59600cc-5281-4d09-36bd-ca633c5d7d96.jpg"
        }
    ];

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    return (
        <div className="bg-[#c9f7d1] min-h-[500px] flex flex-col items-center justify-center p-4">
            <div className="max-w-4xl w-full text-center mb-10">
                <h2 className="text-[#2f3e2f] text-3xl md:text-[46px] font-normal mb-1 Poppins mt-8">
                    This Is What Our Customers Say
                </h2>
                <p className="text-[#2f3e2f] text-xs md:text-[16px] font-light Poppins">
                    Real feedback from people who love shopping with us.

                </p>
            </div>
            <div className="relative max-w-3xl w-full flex items-center justify-center min-h-[220px] md:min-h-[300px]">
                {/* Left (only image) */}
                <div className="absolute -left-20 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-md p-5 w-56 h-48  items-center justify-start z-10 md:block hidden" >
                    <img src={testimonials[(currentIndex - 1 + testimonials.length) % testimonials.length].img} alt="testimonial" className="rounded-md object-cover w-36 h-36" style={{ boxShadow: '6px 6px 0 #e6e6e6' }} />
                </div>

                {/* Center (full content) */}
                <div className="relative bg-white shadow-lg rounded-md md:p-10 p-5 w-[28rem] md:w-[38rem] flex flex-col md:flex-row items-center md:items-start gap-8 z-20 " >
                    <img src={testimonials[currentIndex].img} alt="testimonial" className="rounded-md object-cover w-40 h-44 flex-shrink-0" style={{ boxShadow: '6px 6px 0 #e6e6e6' }} />
                    <div className="text-left flex flex-col justify-center md:items-start items-center">
                        <p className="text-xs md:text-[16px] text-[#2f3e2f] mb-4 leading-relaxed">{testimonials[currentIndex].text}</p>
                        <div className="flex text-yellow-400 text-[16px] mb-4">{[...Array(5)].map((_, i) => <FaStar key={i} />)}</div>

                        <div className="border-b border-[#2f3e2f] w-44 mb-2"></div>
                        <h3 className="text-[24px] md:text-[32px] font-semibold text-[#2f3e2f] mb-0.5">{testimonials[currentIndex].name}</h3>
                        <p className="text-xs md:text-[16px] text-[#2f3e2f] font-light">{testimonials[currentIndex].role}</p>
                    </div>
                </div>

                {/* Right (cropped) */}
                <div className="absolute -right-32 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-md overflow-hidden p-5 w-56 h-48 z-10 md:block hidden">
                    <div className="flex flex-row">

                        <div className="text-left flex flex-col justify-center">
                            <p className="text-xs md:text-[12px] text-[#2f3e2f] mb-3 leading-relaxed">{testimonials[(currentIndex + 1) % testimonials.length].text}</p>
                             <div className="flex text-yellow-400 text-[16px] mb-2">{[...Array(5)].map((_, i) => <FaStar key={i} />)}</div>
                            <div className="border-b border-[#2f3e2f] w-28 mb-2"></div>
                            <h3 className="text-base md:text-[24px] font-semibold text-[#2f3e2f] mb-0.5">{testimonials[(currentIndex + 1) % testimonials.length].name}</h3>
                            <p className="text-xs md:text-[12px] text-[#2f3e2f] font-light">{testimonials[(currentIndex + 1) % testimonials.length].role}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-center gap-4 mt-8">
                <button onClick={handlePrev} aria-label="Previous testimonial" className="w-12 h-12 rounded-full bg-white text-[#2f3e2f] flex items-center justify-center shadow-md hover:bg-gray-100 transition cursor-pointer">
                    <IoIosArrowBack className='text-2xl' />
                </button>
                <button onClick={handleNext} aria-label="Next testimonial" className="w-12 h-12 rounded-full bg-white text-[#2f3e2f] flex items-center justify-center shadow-md hover:bg-gray-100 transition cursor-pointer">
                    <IoIosArrowForward className='text-2xl' />
                </button>
            </div>

        </div>
    );
};

export default CustomerTestimonials;
