// import GroceryCategories from "@/components/GroceryCatories";
import React, { useContext, useEffect, useState } from "react";
import { IoRemoveSharp } from "react-icons/io5";
import { IoAddSharp } from "react-icons/io5";
import { useRouter } from "next/router";
import {
  cartContext,
  userContext,
  favoriteProductContext,
  languageContext
} from "../_app";
import { Api } from "@/services/service";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { produce } from "immer";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { SlArrowRight } from "react-icons/sl";
// import { useTranslation } from "react-i18next";
import constant from "@/services/constant";
// import "react-medium-image-zoom/dist/styles.css";
// import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
// import ProductReviews from "@/components/reviews";
import Head from "next/head";
import Image from "next/image";
import { toast } from "react-toastify";
import ProductInfo from "@/components/ProductInfo";
import ProductReviews from "@/components/reviews";


function ProductDetails(props) {
  // const { t } = useTranslation();
  const router = useRouter();
  // const { lang } = useContext(languageContext)
  const [user, setUser] = useContext(userContext);
  const [productsId, setProductsId] = useState({});
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedImageList, setSelectedImageList] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");
  const [productReviews, setProductReviews] = useState([]);
  const [productList, SetProductList] = useState([]);
  const [cartData, setCartData] = useContext(cartContext);
  const [priceSlot, setPriceSlote] = useState([]);
  const [priceIndex, setPriceIndex] = useState(0);
  const [selectedPrice, setSelectedPrice] = useState({});
  const [Favorite, setFavorite] = useContext(favoriteProductContext);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isInCart, setIsInCart] = React.useState(false);
  const [availableQty, setAvailableQty] = React.useState(0);

  useEffect(() => {
    if (router?.query?.id) {
      getProductById();
    }
  }, [router?.query?.id]);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  useEffect(() => {
    if (cartData.length > 0) {
      const cartItem = cartData.find(
        (f) =>
          f._id === productsId?._id &&
          f.price_slot?.our_price === selectedPrice?.our_price
      );

      if (cartItem) {
        setIsInCart(true);
        setAvailableQty(cartItem.qty);
      } else {
        setIsInCart(false);
        setAvailableQty(0);
      }
    } else {
      setIsInCart(false);
      setAvailableQty(0);
    }
  }, [cartData, productsId, selectedPrice]);

  const handleAddToCart = () => {
    if (!productsId || !productsId._id || !selectedPrice?.our_price) {
      console.error(
        "Invalid product data or price selection:",
        productsId,
        selectedPrice
      );
      return;
    }

    if (productsId.Quantity <= 0) {
      toast.error("This item is currently out of stock. Please choose a different item.");
      return;
    }

    const existingItem = cartData.find(
      (f) =>
        f._id === productsId._id && f.price_slot?.our_price === selectedPrice.our_price
    );

    const price = parseFloat(selectedPrice?.our_price);

    const ourPrice = parseFloat(selectedPrice?.our_price);
    const percentageDifference =
      price && ourPrice ? ((price - ourPrice) / price) * 100 : 0;

    if (!existingItem) {
      const newProduct = {
        ...productsId,
        selectedImage: productsId.selectedImage || productsId.varients?.[0]?.image?.[0] || "",
        qty: 1,
        id: productsId._id,
        total: Number(ourPrice || 0).toFixed(2),
        our_price: Number(ourPrice || 0),
        price: selectedPrice?.our_price || 0,
        price_slot: selectedPrice || {},
        percentageDifference: Number(percentageDifference || 0).toFixed(2),
      };


      const updatedCart = [...cartData, newProduct];
      setCartData(updatedCart);
      localStorage.setItem("addCartDetail", JSON.stringify(updatedCart));
    }
    toast.success("Item added to cart");
  };

  const handleIncreaseQty = () => {
    const nextState = produce(cartData, (draft) => {
      const existingItem = draft.find(
        (item) =>
          item._id === productsId._id &&
          item.price_slot.value === selectedPrice.value
      );

      if (!existingItem) {
        console.error("Item not found in cart for increasing quantity.");
        return;
      }

      if (existingItem.qty + 1 > productsId.Quantity) {
        toast.error("Item is not available in this quantity in stock. Please choose a different item.");
        return;
      }

      existingItem.qty += 1;
      existingItem.total = (
        parseFloat(existingItem.price_slot?.our_price || 0) * existingItem.qty
      ).toFixed(2);
    });

    setCartData(nextState);
    localStorage.setItem("addCartDetail", JSON.stringify(nextState));
  };

  const handleDecreaseQty = () => {
    const nextState = produce(cartData, (draft) => {
      const existingItem = draft.find(
        (item) =>
          item._id === productsId._id &&
          item.price_slot.value === selectedPrice.value
      );

      if (existingItem) {
        if (existingItem.qty > 1) {
          existingItem.qty -= 1;
          existingItem.total =
            parseFloat(existingItem.price_slot?.our_price) * existingItem.qty;
        } else {
          const index = draft.indexOf(existingItem);
          if (index > -1) {
            draft.splice(index, 1);
          }
        }
      } else {
        console.error("Item not found in cart for decreasing quantity.");
      }
    });

    setCartData(nextState);
    localStorage.setItem("addCartDetail", JSON.stringify(nextState));
  };

  const getProductById = async () => {
    let url = `getProductByslug/${router?.query?.id}`;
    if (user?.token) {
      url = `getProductByslug/${router?.query?.id}?user=${user?._id}`;
    }
    props.loader(true);
    Api("get", url, "", router).then(
      (res) => {
        props.loader(false);
        res.data.qty = 1;
        res.data.total = (res.data?.our_price * res.data.qty).toFixed(2);
        setProductsId(res.data);
        setSelectedColor(res.data?.varients[0]);
        setSelectedImageList(res.data?.image || []);
        setSelectedImage(res.data?.varients[0].image[0]);
        getproductByCategory(res.data.category?.slug, res.data._id);
        setProductReviews(res.data?.reviews);
        if (router.query.clientSecret) {
          setShowPayment(false);
          createProductRquest();
        }

        setPriceSlote(res?.data?.price_slot);
        setSelectedPrice(res?.data?.price_slot[0]);
      },
      (err) => {
        props.loader(false);
        toast.error(err?.message)
      }
    );
  };

  const getproductByCategory = async (category_id, product_id) => {
    props.loader(true);
    Api(
      "get",
      `getProductBycategoryId?category=${category_id}&product_id=${product_id}`,
      "",
      router
    ).then(
      (res) => {
        props.loader(false);

        const sameItem = res?.data?.filter((f) => f._id !== router?.query?.id);
        SetProductList(sameItem);
      },
      (err) => {
        props.loader(false);
        toast.error(err.message)
      }
    );
  };

  const addremovefavourite = () => {
    if (!user?.token) {
      toast.success("Login required");
      return;
    }

    let data = {
      product: productsId?._id,
    };

    props.loader(true);
    Api("post", "addremovefavourite", data, router).then(
      (res) => {
        props.loader(false);
        if (res.status) {
          if (isFavorite) {
            toast.success(res.data?.message)
            setFavorite((prevFavorites) => {
              const updatedFavorites = prevFavorites.filter(
                (fav) => fav._id !== productsId._id
              );
              localStorage.setItem(
                "favorites",
                JSON.stringify(updatedFavorites)
              );
              return updatedFavorites;
            });
          } else {
            setFavorite((prevFavorites) => {
              const updatedFavorites = [...prevFavorites, productsId];
              localStorage.setItem(
                "favorites",
                JSON.stringify(updatedFavorites)
              ); // Save to local storage
              return updatedFavorites;
            });
          }
          getProductById();
        } else {
          toast.error(res?.data?.message)
        }
      },
      (err) => {
        props.loader(false);
        toast.error(res?.message)
      }
    );
  };


  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorite(JSON.parse(storedFavorites));
    }
  }, []);

  const cartItem = productsId._id;
  const itemQuantity = cartItem ? cartItem.qty : 0;

  return (
    <>
      <Head>
        <title>{productsId?.metatitle}</title>
        <meta name="description" content={productsId?.metadescription} />
        <link
          rel="canonical"
          href={`https://www.bachhoahouston.com/product-details/${productsId?.slug}`}
        />
      </Head>
      <div className="bg-white w-full max-w-7xl mx-auto md:pt-10 pt-14 md:pb-10 pb-5 md:px-0 px-3">
        <section className="bg-white w-full ">
          <div className="flex flex-wrap items-center text-gray-500 text-xs md:text-sm mt-2 mb-2 gap-1 md:ps-4">
            <p className="font-medium">{("Home")}</p>
            <SlArrowRight className="text-gray-400 w-3 h-3 md:w-4 md:h-4" />

            <p className="font-medium">{productsId?.categoryName}</p>
            <SlArrowRight className="text-gray-400 w-3 h-3 md:w-4 md:h-4" />

            <p className="font-semibold truncate max-w-xs md:max-w-sm">
              {productsId?.name}
            </p>
          </div>

          <div className="w-full ">
            <div className="grid md:grid-cols-2 grid-cols-1 w-full gap-5">
              <div className="p-[10px] rounded-[15px]">
                <Carousel
                  className="h-full w-full"
                  responsive={responsive}
                  autoPlay={false}
                  infinite={true}
                  arrows={true}
                >
                  {selectedImageList?.map((item, i) => (
                    <div
                      key={i}
                      className="bg-white w-full md:h-full relative flex justify-center items-center"
                    >
                      <Image
                        width={500}
                        height={300}
                        className="md:h-[500px] w-full object-contain rounded-[10px]"
                        src={item || "/image32.png"}
                        alt={productsId?.imageAltName || "Product image"}
                      />
                    </div>
                  ))}
                </Carousel>
              </div>

              <div className="flex justify-start items-start w-full">
                <div className="flex flex-col justify-start items-start w-full">
                  <div className="flex justify-between items-center w-full">
                    <h1 className="text-black md:text-[32px] text-2xl font-medium">
                      {productsId?.name}
                    </h1>

                    <div
                      className="p-2 border-[3px] border-black rounded-full flex justify-center items-center cursor-pointer"
                      onClick={addremovefavourite}
                    >
                      {!productsId?.favourite && (
                        <FaRegHeart className="text-black w-[23px] h-[23px]" />
                      )}
                      {productsId?.favourite && (
                        <FaHeart className="text-red-700 w-[23px] h-[23px]" />
                      )}
                    </div>
                  </div>


                  <div className="pt-7 md:pt-20 w-full md:w-[400px] grid md:grid-cols-3 grid-cols-2 gap-5">
                    {priceSlot &&
                      priceSlot.map((data, i) => {
                        const otherprice = parseFloat(data?.other_price);
                        const ourPrice = parseFloat(data?.our_price);
                        const percentageDifference =
                          otherprice && ourPrice
                            ? ((otherprice - ourPrice) / otherprice) * 100
                            : 0;
                        return (
                          <div key={i}>
                            <div
                              onClick={() => {
                                setSelectedPrice(data);
                                setPriceIndex(i);
                              }}
                              className={`cursor-pointer w-full rounded-[8px] border border-custom-darkPurple p-[10px] relative
                                        ${priceIndex == i
                                  ? "bg-[#2E7D321A]"
                                  : "bg-white"
                                }
                            `}
                            >
                              {data?.other_price && (
                                <>
                                  <Image
                                    width={60}
                                    height={60}
                                    className="w-[70px] h-[60px] object-contain absolute -top-[20px] -right-[18px] "
                                    src="/star.png"
                                  />
                                  <p className="text-white text-center text-[9px] font-medium absolute -top-[2px] right-[2px]">
                                    {percentageDifference?.toFixed(2)}%<br />
                                    {("off")}
                                  </p>
                                </>
                              )}
                              <p className="text-black font-normal text-base pt-1">
                                {data.value} {data.unit}
                              </p>
                              <p className="text-black font-normal text-base pt-1">
                                {constant.currency}
                                {data?.our_price}
                              </p>
                              <p className="text-custom-black font-semibold text-sm pt-2">
                                {data?.other_price && (
                                  <span className="text-black font-normal line-through">
                                    {constant.currency}
                                    {data?.other_price}
                                  </span>
                                )}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                  </div>


                  {isInCart ? (
                    <>
                      <div className="p-1 flex justify-between mt-7 md:mt-20 w-[250px] bg-gray-100 rounded-2xl">
                        <div
                          className="px-2.5 py-2 bg-custom-green cursor-pointer  rounded-full flex justify-center items-center"
                          onClick={handleDecreaseQty}
                        >
                          <IoRemoveSharp className="text-white text-lg" />
                        </div>
                        <p className="text-black md:text-xl text-lg font-medium text-center px-3  py-1">
                          {availableQty}
                        </p>
                        <div
                          className="rounded-full bg-custom-green cursor-pointer px-2.5 py-2 flex justify-center items-center"
                          onClick={handleIncreaseQty}
                        >
                          <IoAddSharp className=" text-white text-lg" />
                        </div>
                      </div>
                    </>
                  ) : (
                    productsId.Quantity <= 0 ? (
                      <button
                        className="bg-custom-gray px-4 py-2 rounded-[8px] text-gray-200 font-semibold text-md md:mt-5 mt-4 cursor-not-allowed "
                      >
                        {("Out of Stock")}
                      </button>
                    ) : (
                      <button
                        className="bg-custom-gray md:mt-20 px-4 py-2 w-[250px] rounded-[8px] text-white font-medium text-md  mt-4 cursor-pointer"
                        onClick={handleAddToCart}
                      >
                        {("Add to Cart")}
                      </button>
                    )

                  )}

                </div>
              </div>
            </div>
          </div>
          <div className="md:my-6 my-3 py-4 ">
            <p className="text-black text-xl md:text-2xl font-bold mb-3">
              {("About Product")}
            </p>

            <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
              <div className="md:col-span-2">
                <p className="text-black text-base md:text-[18px] font-semibold mb-1">
                  {("Description")}:{" "}
                  <span className="text-black text-base md:text-[18px] font-normal leading-relaxed">
                    {productsId?.description}
                  </span>
                </p>
              </div>


            </div>
          </div>


        </section>
      </div>
      <div>
        <ProductInfo />
        <ProductReviews productReviews={productReviews} slug={productsId.slug} />

      </div>
    </>

  );
}

export default ProductDetails;
