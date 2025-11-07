import React from "react";
import { ArrowRight } from "lucide-react";

const services = [
    {
        image: "/insta1.png", // place this in public/images/
    },
    {

      image: "/insta2.png",
    },
    {
        image: "/insta3.png",
    },
    {
        image: "/insta1.png", // place this in public/images/
    },
    {
        image: "/insta2.png",
    },
    {
        image: "/insta3.png",
    },
];

export default function FollowInstagram() {
    return (

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 md:gap-14 gap-8 min-w-[350px] min-h-[400px]">
            {services.map((service, index) => (
                <div
                    key={index}
                    className="relative group overflow-hidden transition-all duration-300"
                >
                    <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-500"
                    />
                </div>
            ))}
        </div>

    );
}
