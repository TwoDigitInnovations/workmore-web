import React from "react";
import { motion } from "motion/react";

export default function HeroSection() {
  const features = [
    "Free Delivery",
    "100% Natural Solution",
    "Fast Shipping France & DOM-TOM",
    "Premium Quality Ingredients",
  ];

  return (
    <div className="relative w-full overflow-hidden">
      {/* Hero Section */}
      <div
        className="relative h-[600px] md:h-[650px] bg-cover md:bg-center bg-right-top "
        style={{
          backgroundImage: "url('/bg-image.png')", // ✅ use your actual image path
        }}
      >
     
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto md:py-24 py-32 flex flex-col justify-center md:justify-start px-4 sm:px-4 md:items-start ">

          <h1 className="max-w-[620px] text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight drop-shadow-lg">
            Ton rituel minceur & bien-être – Livraison rapide DOM-TOM & France
          </h1>

          <div className="flex flex-col justify-start  mt-6 space-x-3 sm:space-x-5">
            <p className="text-white text-base sm:text-lg md:text-xl">
              -10% De Réduction Avec Le Code
            </p>
            <span className="bg-white w-26 text-amber-900 ps-4  py-2 rounded-full font-bold text-sm sm:text-base uppercase tracking-wide shadow-md mt-4">
              SUMMER
            </span>
          </div>
        </div>
      </div>

      {/* Infinite Moving Feature Strip */}
      <div className="bg-custom-gray py-4 overflow-hidden">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: ["0%", "-100%"] }}
          transition={{
            repeat: Infinity,
            duration: 15,
            ease: "linear",
          }}
        >
          {[...features, ...features].map((feature, i) => (
            <div
              key={i}
              className="inline-flex items-center mx-8 md:mx-12 text-white font-semibold text-sm md:text-base"
            >
              {feature}
              {/* <span className="mx-6 md:mx-10 text-white text-xl">•</span> */}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
