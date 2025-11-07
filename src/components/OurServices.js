import React from "react";
import { ArrowRight } from "lucide-react";

const services = [
  {
    title: "Massages",
    image: "/image2.png", // place this in public/images/
  },
  {
    title: "Coaching",
    image: "/image3.png",
  },
  {
    title: "Events",
    image: "/image1.png",
  },
];

export default function OurServices() {
  return (
   
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 md:gap-20 gap-8 min-w-[350px] min-h-[400px]">
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

              <div className="absolute bottom-5 left-1/2 -translate-x-1/2">
                <button className="bg-white/90 hover:bg-white text-gray-900 px-5 py-2 rounded-full font-semibold flex items-center gap-2 shadow-lg">
                  {service.title} <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      
  );
}
