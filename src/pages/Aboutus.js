import React from "react";
import { motion } from "motion/react";
import { Phone, Mail } from "lucide-react";

const AboutUs = () => {
    return (
        <div className="bg-white min-h-screen text-gray-800 overflow-hidden ">

            <section className="relative md:mt-20 mt-10">
                <div className="max-w-7xl mx-auto px-4">
                    <motion.h2
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-5xl font-bold mb-6"
                    >
                        About Us
                    </motion.h2>
                </div>
                <div className="relative">
                    <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center ">
                        <motion.p
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-lg leading-relaxed z-10"
                        >
                            Rorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum tellus.
                        </motion.p>

                        <motion.img
                            src="/aboutus2.png"
                            alt="Gym Equipment"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className=" w-full object-cover z-10"
                        />
                    </div>
                    <div className="absolute -top-6 z-0 md:flex hidden">
                        <img
                            src="/aboutus3.png"
                        />
                    </div>

                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="mt-28 relative"
                >
                    <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center ">
                        <img
                            src="/aboutus1.png"
                            alt="Fitness Class"
                            className="w-full object-cover z-10"
                        />

                        <div className="ps-20 z-10">
                            <h3 className="text-2xl font-semibold mb-4">Contact Us</h3>
                            <p className="flex items-center gap-3 mb-2">
                                <Phone className="text-black" /> (+33) 555 - 6666
                            </p>
                            <p className="flex items-center gap-3">
                                <Mail className="text-black" /> example@email.com
                            </p>
                        </div>
                    </div>

                    <div className="absolute top-20 z-0 md:flex hidden">
                        <img
                            src="/aboutus4.png"
                        />
                    </div>


                </motion.div>

            </section>



            <section className=" relative py-20 mt-10 md:mb-55">
                <div className="max-w-7xl mx-auto px-4 w-full flex md:flex-row flex-col items-center">
                    <div className="md:w-1/2 w-full z-10 ">
                        <motion.h2
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-4xl md:text-[88px] font-bold mb-12"
                        >
                            Frequently Asked Question
                        </motion.h2>
                    </div>
                    <div className="space-y-4 md:w-1/2 w-full z-10">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
                            <motion.details
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                className="group border-b border-gray-300 pb-4 cursor-pointer"
                            >
                                <summary className="text-xl font-medium flex justify-between items-center">
                                    Question {item}
                                    <span className="text-gray-500 group-open:rotate-180 transition-transform">▾</span>
                                </summary>
                                <p className="text-gray-600 mt-2 pl-2">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim.
                                </p>
                            </motion.details>
                        ))}
                    </div>
                </div>
                <div className="absolute top-0 z-0 md:flex hidden">
                    <img
                        src="/aboutus5.png"
                    />
                </div>

            </section>
        </div>
    );
};

export default AboutUs;
