"use client";
import FollowInstagram from "@/components/FollowInstagram";
import GoalPackProduct from "@/components/GoalPackProduct";
import HeroSection from "@/components/HeroSection";
import OurServices from "@/components/Ourservices";
import ProductCardDemo from "@/components/ProductCard";

function Home(props) {

  const Images = ["/review1.png", "review2.png", "review3.png"]

  return (
    <div className="min-h-screen">
      <HeroSection />
      {/* <div className="max-w-7xl mx-auto mt-10 py-8 px-4" >
        <p className="text-black md:text-xl text-lg  text-center font-semibold"> Our Best Sellers </p>
        <section className="md:mt-10 mt-7">

          <ProductCardDemo
            loader={props.loader}
          />
        </section>
      </div> */}
      <div className="max-w-7xl mx-auto mt-10 py-8 px-4" >
        <p className="text-black text-center font-extrabold mb-8 text-2xl"> Our Services</p>
        <OurServices />
      </div>
      <div className="mt-10 py-8" >
        <p className="text-black text-center font-extrabold mb-8 text-2xl">Choose Your Pack according to your goal</p>
        <GoalPackProduct />
      </div>
      <div className="max-w-7xl mx-auto mt-10 py-8 px-4" >
        <p className="text-black text-center font-extrabold mb-8 text-2xl">Our Customers love it, and you ?</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 min-w-[350px] min-h-[400px]">
          {Images.map((service, index) => (
            <div
              key={index}
              className="relative group overflow-hidden transition-all duration-300"
            >
              <img
                src={service}
                alt="image"
                className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-500"
              />

            </div>
          ))}
        </div>
      </div>


      <div className="max-w-7xl mx-auto mt-10 py-8 px-4" >
        <p className="text-black text-center font-extrabold mb-8 text-2xl">Follow us on instagram</p>
        <FollowInstagram />
      </div>
    </div>
  );
}


export default Home;