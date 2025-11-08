import { Api } from "@/services/service";
import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import ProductCardDemo from "@/components/ProductCard";
// import { useTranslation } from "react-i18next";
import { userContext } from "./_app";
import Head from "next/head";
import {ChevronLeft, ShoppingCart } from "lucide-react";

function Wishlist(props) {
  const router = useRouter();
//   const { t } = useTranslation();
  const [favouriteList, setFavouriteList] = useState([]);
  const [user, setUser] = useContext(userContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getFavourite();
    }
  }, []);

  const getFavourite = async () => {
    props.loader(true);
    Api("get", "getFavourite", null, router, { id: user._id }).then(
      (res) => {
        props.loader(false);

        setFavouriteList(res.data);
      },
      (err) => {
        props.loader(false);
        props.toaster({ type: "error", message: err?.message });
      }
    );
  };

  return (
    <>
      <Head>
        <title>Your Personalized Shopping List – Bachhoahouston</title>
        <meta name="description" content="Easily access your personalized shopping list of favorite groceries, beauty, and more at Bachhoahouston. Shop faster and smarter today!" />
        <link
          rel="canonical"
          href="https://www.bachhoahouston.com/Favourite"
        />
      </Head>
      <div className="mx-auto max-w-7xl md:py-6 py-4 px-3 min-h-screen md:mt-0 mt-4">

        <div className="flex items-center gap-1 text-sm text-gray-500 md:mb-6 mb-4">
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-custom-green transition"
          >
            <span className="text-xs ">Home</span>
          </button>
          <span className="text-gray-800"><ChevronLeft size={14}/> </span>
          <span className="font-semibold text-black text-xs">Wishlist</span>
        </div>

        <div className="flex justify-start items-center">
          <button
            onClick={() => router.back()}
            className="-mt-10 flex items-center gap-1 text-gray-600 hover:text-custom-green transition"
          >
            <ChevronLeft size={32}/>
          </button>
          <h1 className="text-lg md:text-2xl font-bold text-gray-800 mb-10">
            {("Your Wishlist")}
          </h1>
        </div>

        <div className="grid xl:grid-cols-4 lg:grid-cols-4 grid-cols-2 md:gap-4 gap-2">
          {favouriteList.length > 0 ? (
            favouriteList.map((item, i) => (
              <div key={i} className="w-full">
                <ProductCardDemo
                  item={item?.product}
                  loader={props.loader}
                  toaster={props.toaster}
                  i={i}
                  url={`/product-details/${item?.product?.slug}`}
                />
              </div>
            ))
          ) : (
            <div className="flex flex-col justify-center items-center col-span-full h-[450px]">
              <div className="bg-gray-100 p-6 rounded-full mb-10"> 
              <ShoppingCart size={45} className="text-black"/> 
              </div>
              <p className="text-gray-700 text-lg md:text-2xl font-semibold mb-2">
                {("Your wishlist is empty")}
              </p>
              <p className="text-gray-500 text-sm md:text-base text-center max-w-md">
                {("Start adding your favorite items and they’ll appear here!")}
              </p>
            </div>
          )}
        </div>
        
      </div>


    </>
  );
}
export default Wishlist;
