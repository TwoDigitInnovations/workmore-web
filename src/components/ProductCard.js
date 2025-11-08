import React, { useState, useEffect } from "react";
import { Api } from "@/services/service";
import { useRouter } from "next/router";
import constant from "../../services/constant";

const ProductCard = ({ item }) => {
  const product = item || {};
  const router = useRouter();

  return (
    <div className="bg-white w-full md:w-[280px] rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 max-w-sm mx-auto relative overflow-hidden border border-gray-100">
      <div className="w-full flex flex-col justify-center items-center relative">

        <img
          src={product.image || "/image32.png"}
          alt={product.name}
          className="md:w-[280px] w-fit h-full cursor-pointer object-contain rounded-xl transition-transform duration-300 hover:scale-105"
          onClick={() => router.push(`/product-details/${item.slug}`)}
        />

        <div className="absolute top-3 left-3 bg-black text-white text-xs px-3 py-1 rounded-full">
          {product?.name || "Category"}
        </div>

        <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-white px-3 py-1 rounded-2xl text-lg font-bold text-black flex items-center justify-center gap-2 shadow-sm">

          <span className="text-black md:text-base text-lg font-semibold">
            {constant.currency} {product?.price_slot?.[0]?.our_price?.toFixed(2) || "0.00"}
          </span>


          {product?.price_slot?.[0]?.other_price && (
            <span className="text-gray-500 md:text-base text-lg line-through">
              {constant.currency} {product?.price_slot?.[0]?.other_price?.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>

  );
};

const ProductCardDemo = () => {
  const router = useRouter();
  const [productList, setProductList] = useState([]);
  const [pageNum, setPageNum] = useState(1);

  useEffect(() => {
    getProduct();
  }, [pageNum]);

  const getProduct = async () => {
    try {
      const res = await Api(
        "get",
        `getTopSoldProduct?page=${pageNum}&limit=16`,
        null,
        router
      );
      if (res?.status) {
        setProductList(res.data);
      }
    } catch (error) {
      console.error("Error fetching top sold products:", error);
    }
  };

  return (
    <div className="min-h-screen ">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {productList.map((product, index) => (
          <ProductCard key={index} item={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductCardDemo;
