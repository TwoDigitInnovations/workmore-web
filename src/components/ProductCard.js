import React, { useState } from "react";
import { Heart, ShoppingCart } from "lucide-react";

const ProductCard = ({ item }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const sampleProduct = {
    name: "Slim Cafe",
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=300&h=200&fit=crop",
    price: 19.90,
    rating: 4.0,

  };

  const product = item || sampleProduct;

  return (
    <div
      className="bg-white w-full md:w-[250px] md:h-[300px] h-[300px] rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 max-w-sm mx-auto relative overflow-hidden border border-gray-100"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >

      <button
        onClick={toggleFavorite}
        className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-200"
      >
        <Heart
          className={`w-5 h-5 transition-colors ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400 hover:text-red-500'
            }`}
        />
      </button>


      <div className="relative  pb-0">
        <div className="relative  rounded-xl mb-4">
          <img
            src={product.image}
            alt={product.name}
            className={`w-full h-44 object-contain mx-auto transition-all duration-300 ${isHovered ? 'scale-90' : 'scale-100'
              }`}
          />


          <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'
            }`}>
            <button className="bg-orange-500 text-white px-6 py-2 rounded-full font-medium hover:bg-orange-600 transition-colors flex items-center gap-2 shadow-lg">
              <ShoppingCart className="w-4 h-4" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>


      <div className="px-4 pb-4">

        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm text-gray-600">Ratings</span>
          <span className="font-semibold text-gray-800">{product.rating}</span>
          <div className="flex items-center">
            <span className="text-yellow-400 text-lg">★</span>
          </div>

        </div>
        <div className="flex items-center justify-between">
          <h3 className="font-bold md:text-lg  text-gray-800 mb-3">
            {product.name}
          </h3>
          <p className="md:text-lg font-bold text-gray-800">
            €{product.price}
          </p>
        </div>
      </div>
    </div>
  );
};


const ProductCardDemo = () => {
  const products = [
    {
      name: "Slim Cafe",
      image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=300&h=200&fit=crop",
      price: 19.90,
      rating: 4.0,

    },
    {
      name: "Green Tea Detox",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=200&fit=crop",
      price: 24.90,
      rating: 4.2,

    },
    {
      name: "Protein Power",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop",
      price: 32.50,
      rating: 4.5,

    },
    {
      name: "Protein Power",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop",
      price: 32.50,
      rating: 4.5,

    },
    {
      name: "Protein Power",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop",
      price: 32.50,
      rating: 4.5,

    },
    {
      name: "Protein Power",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop",
      price: 32.50,
      rating: 4.5,

    },
    {
      name: "Protein Power",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop",
      price: 32.50,
      rating: 4.5,

    }, {
      name: "Protein Power",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop",
      price: 32.50,
      rating: 4.5,

    }, 
  ];

  return (
    <div className="min-h-screen p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {products.map((product, index) => (
          <ProductCard key={index} item={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductCardDemo;