import React from 'react';
import { Check, X } from 'lucide-react';

export default function ProductInfo() {
    return (
        <div className="min-h-screen bg-white">

            <div className='bg-custom-gray'>
                <div className='max-w-7xl mx-auto px-4 py-12'>
                    <h2 className="text-center text-black text-3xl underline font-bold mb-8">How to use this product:</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Step 1 */}
                        <div className="text-center">
                            <div className="rounded-2xl overflow-hidden mb-3">
                                <video
                                    src="https://videos.pexels.com/video-files/856134/856134-hd_1280_720_30fps.mp4"
                                    controls
                                    className="w-full h-[500px] object-cover"
                                    poster="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400&h=400&fit=crop"
                                />
                            </div>

                            <p className="text-md text-black ">Step one Pour in Pour Water</p>
                        </div>

                        {/* Step 2 */}
                        <div className="text-center">
                            <div className="rounded-2xl overflow-hidden mb-3">

                                <video
                                    src="https://videos.pexels.com/video-files/856134/856134-hd_1280_720_30fps.mp4"
                                    controls
                                    className="w-full h-[500px] object-cover"
                                    poster="https://images.unsplash.com/photo-1544717302-de2939b7ef71?w=400&h=400&fit=crop"
                                />
                            </div>
                            <p className="text-md text-black">Step two Stir it Stir it up</p>
                        </div>

                        {/* Step 3 */}
                        <div className="text-center">
                            <div className="rounded-2xl overflow-hidden mb-3">
                                <video
                                    src="https://videos.pexels.com/video-files/856134/856134-hd_1280_720_30fps.mp4"
                                    controls
                                    className="w-full h-[500px] object-cover"
                                    poster="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=400&fit=crop"
                                />
                            </div>
                            <p className="text-md text-black">Step three Sip it Sip it up</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className='max-w-5xl mx-auto px-4 py-12'>
                <div className="rounded-3xl mb-16">
                    <h2 className="text-center text-black text-[42px] font-bold mb-4">Heading place holder</h2>
                    <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ut orci a nulla laoreet placerat. Curabitur nec elit ac nunc vehicula interdum."
                    </p>


                    <div className="grid grid-cols-3 rounded-3xl shadow-lg pb-8">
                        <div className='rounded-t-3xl col-span-3 bg-custom-gray grid grid-cols-3'>
                            <div className="text-[#353535] text-[20px] py-8 font-semibold text-center">Features</div>
                            <div className="text-[#353535] text-[20px] py-8 font-semibold text-center">Our Product</div>
                            <div className="text-[#353535] text-[20px] py-8 font-semibold text-center">Other Company Product</div>
                        </div>
                        {/* Row 1 */}
                        <div className="text-black flex items-center justify-center p-4 text-sm">More Energy</div>
                        <div className="text-black flex flex-col items-center justify-center p-4">
                            <div className="bg-green-100 rounded-full p-2 mb-2">
                                <Check className="w-5 h-5 text-green-600" />
                            </div>
                            <p className="text-xs text-center">
                                <span className="font-semibold">More 50%</span><br />
                                Natural
                            </p>
                        </div>
                        <div className="text-black  flex flex-col items-center justify-center p-4">
                            <div className="bg-red-100 rounded-full p-2 mb-2">
                                <X className="w-5 h-5 text-red-600" />
                            </div>
                            <p className="text-xs text-center">
                                <span className="font-semibold">Don't have this</span><br />
                                feature
                            </p>
                        </div>

                        {/* Row 2 */}
                        <div className="text-black  flex items-center justify-center p-4 text-sm">No artificial Sugar</div>
                        <div className="text-black  flex flex-col items-center justify-center p-4">
                            <div className="bg-green-100 rounded-full p-2 mb-2">
                                <Check className="w-5 h-5 text-green-600" />
                            </div>
                            <p className="text-xs text-center">
                                <span className="font-semibold">More 0%</span><br />
                                Natural
                            </p>
                        </div>
                        <div className="text-black flex flex-col items-center justify-center p-4">
                            <div className="bg-red-100 rounded-full p-2 mb-2">
                                <X className="w-5 h-5 text-red-600" />
                            </div>
                            <p className="text-xs text-center">
                                <span className="font-semibold">Don't have this</span><br />
                                feature
                            </p>
                        </div>

                        {/* Row 3 */}
                        <div className="text-black  flex items-center justify-center p-4 text-sm">Natural Ingredients</div>
                        <div className="text-black flex flex-col items-center justify-center p-4">
                            <div className="bg-green-100 rounded-full p-2 mb-2">
                                <Check className="w-5 h-5 text-green-600" />
                            </div>
                            <p className="text-xs text-center">
                                <span className="font-semibold">More 0%</span><br />
                                Natural
                            </p>
                        </div>
                        <div className="text-black flex flex-col items-center justify-center p-4">
                            <div className="bg-green-100 rounded-full p-2 mb-2">
                                <Check className="w-5 h-5 text-green-600" />
                            </div>
                            <p className="text-xs text-center">
                                <span className="font-semibold">More 0%</span><br />
                                Natural
                            </p>
                        </div>
                    </div>

                    {/* Number badge */}
                    <div className="absolute right-8 bottom-32 bg-gray-700 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold shadow-lg">
                        2
                    </div>
                </div>
            </div>

            <div className='max-w-5xl mx-auto px-4 py-5'>
                <div className="mb-8">
                    <h2 className="text-black text-center text-2xl font-bold mb-12">Pure Power: 100% Natural Composite Ingredients</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                        <div className="bg-[#F1E0D0] rounded-2xl overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=500&h=300&fit=crop"
                                alt="Garcinia Cambogia"
                                className="w-full h-[220px] object-cover"
                            />
                            <div className="p-6 text-center">
                                <h3 className="text-xl font-bold mb-3 text-black">Garcinia Cambogia</h3>
                                <p className="text-sm text-gray-600">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ut orci a nulla laoreet placerat. Curabitur nec elit ac nunc vehicula interdum.
                                </p>
                            </div>
                        </div>

                        {/* Natural Fiber Blend */}
                        <div className="bg-[#F1E0D0] rounded-2xl overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1608667508764-33cf0726b13a?w=500&h=300&fit=crop"
                                alt="Natural Fiber Blend"
                                className="w-full h-[220px] object-cover"
                            />
                            <div className="p-6 text-center">
                                <h3 className="text-xl text-black  font-bold mb-3">Natural Fiber Blend</h3>
                                <p className="text-sm text-gray-600">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ut orci a nulla laoreet placerat. Curabitur nec elit ac nunc vehicula interdum.
                                </p>
                            </div>
                        </div>

                        {/* Vanilla Flavor */}
                        <div className="bg-[#F1E0D0] rounded-2xl overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1481391243133-f96216dcb5d2?w=500&h=300&fit=crop"
                                alt="Vanilla Flavor"
                                className="w-full h-[220px] object-cover"
                            />
                            <div className="p-6 text-center">
                                <h3 className="text-xl text-black font-bold mb-3">Vanilla Flavor</h3>
                                <p className="text-sm text-gray-600">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ut orci a nulla laoreet placerat. Curabitur nec elit ac nunc vehicula interdum.
                                </p>
                            </div>
                        </div>

                        {/* Instant Coffee Powder */}
                        <div className="bg-[#F1E0D0] rounded-2xl overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=500&h=300&fit=crop"
                                alt="Instant Coffee Powder"
                                className="w-full h-[220px] object-cover"
                            />
                            <div className="p-6 text-center">
                                <h3 className="text-xl text-black  font-bold mb-3">Instant Coffee Powder</h3>
                                <p className="text-sm text-gray-600">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ut orci a nulla laoreet placerat. Curabitur nec elit ac nunc vehicula interdum.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}