import React from "react";
import { Star } from "lucide-react";

const ProductReviews = ({ productReviews = [] }) => {
  // Dummy data for display if no reviews exist
  const dummyReviews = [
    {
      name: "Nora Bells",
      review:
        "I loved the product. Gave me amazing results. Looking forward to buy more.",
      rating: 5,
    },
    {
      name: "Issabella",
      review:
        "Gave me amazing results. Looking forward to buy more.",
      rating: 5,
    },
    {
      name: "Anny",
      review: "I loved the product.",
      rating: 5,
    },
    {
      name: "Anny",
      review: "I loved the product.",
      rating: 5,
    },
  ];

  const reviews = productReviews.length > 0 ? productReviews : dummyReviews;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-semibold mb-4 text-black">Ratings & Reviews:</h2>

      <div className="flex flex-col md:flex-row gap-10">
        {/* Left side - Rating summary */}
        <div className="flex flex-col items-center justify-center border-r border-gray-300 pr-10 md:w-[40%]">
          <div className="text-5xl font-bold text-gray-800">4.0</div>
          <Star size={28} className="text-black mt-1" />
          <p className="text-sm text-gray-500 mt-1">15 Ratings</p>
        </div>

        {/* Right side - Review cards */}
        <div className="flex flex-col gap-5 w-full md:w-[60%] h-[370px] overflow-y-scroll   scrollbar-hide overflow-scroll">
          {reviews.map((item, i) => (
            <div
              key={i}
              className="flex flex-col items-start  justify-between border rounded-2xl p-4 shadow-sm hover:shadow-md transition-all"
            >

              <div className="min-w-2xl flex justify-between items-center gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center text-sm font-semibold">
                    <span>  {item.name.charAt(0).toUpperCase()} </span>
                  </div>
                  <h4 className="font-semibold text-gray-800">{item.name}</h4>
                </div>
                <div className="flex items-center gap-1 mt-3 sm:mt-0">
                  {[...Array(item.rating || 5)].map((_, idx) => (
                    <Star key={idx} size={16} className="fill-black text-black" />
                  ))}
                </div>

              </div>


              <p className="text-gray-600 italic text-sm mt-2 mb-2 ">
                {item.review}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductReviews;
