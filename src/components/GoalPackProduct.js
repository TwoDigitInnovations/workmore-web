import React, { useState } from "react";

export default function GoalPackProduct() {
    const categories = [
        { id: 1, name: "Challenge 21D" },
        { id: 2, name: "Flat Stomach" },
        { id: 3, name: "Fat Burner" },
        { id: 4, name: "Beauty Glow" },
        { id: 5, name: "Perfect Sleep" },
        { id: 6, name: "Flat Stomach 2" },
    ];

    const products = [
        {
            id: 1,
            title: "Flat Stomach Pack",
            description:
                "A natural blend to help you achieve a flat stomach in 21 days.",
            image:
                "/image-2.png",
            category: "Flat Stomach",
        },
        {
            id: 2,
            title: "Beauty Glow Pack",
            description:
                "Enhance your skin glow and rejuvenate naturally.",
            image:
                "/image-2.png",
            category: "Beauty Glow",
        },
    ];

    const [selectedCategory, setSelectedCategory] = useState("Challenge 21D");

    const filteredProducts =
        selectedCategory === "Chalenge 21D"
            ? products
            : products.filter((p) => p.category === selectedCategory);

    return (
        <div className="min-h-[400px] bg-gradient-to-b from-[rgba(181,144,115,0.65)] to-[#FFFFFF] py-6">
            
            <div className="flex flex-wrap justify-center gap-3 px-4 bg-custom-gray p-2 max-w-7xl mx-auto rounded-[96px]">
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.name)}
                        className={`px-5 py-2 rounded-full md:text-[24px] text-xl font-medium transition-all ${selectedCategory === cat.name
                                ? "bg-white text-black shadow-md"
                                : "text-white hover:bg-[#b88a6a]"
                            }`}
                    >
                        {cat.name}
                    </button>
                ))}
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-10 mt-8 px-4">
                {filteredProducts.map((item) => (
                    <div
                        key={item.id}
                        className="flex flex-col md:flex-row w-full md:w-3/4 max-w-4xl"
                    >
                        <img
                            src={item.image}
                            alt={item.title}
                            className="w-full md:w-1/2 rounded-xl object-cover"
                        />
                        <div className="flex flex-col justify-center md:ml-14 mt-4 md:mt-0 text-center md:text-left">
                            <h2 className="text-xl font-bold text-black">{item.title}</h2>
                            <p className="text-gray-600 mt-2">{item.description}</p>
                            <button className="bg-[#C9A07E] text-white rounded-full px-5 py-2 mt-4 hover:bg-[#b88a6a] w-fit mx-auto md:mx-0">
                                Call-To-Action
                            </button>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}
