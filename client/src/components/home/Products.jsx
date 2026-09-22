import React, { useState } from "react";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import img1 from "../../assets/balaclava-gallery-1.png";
import img2 from "../../assets/balaclava-gallery-2.png";
import img3 from "../../assets/balaclava-gallery-3.png";
import img4 from "../../assets/balaclava-gallery-4.png";
import img5 from "../../assets/balaclava-gallery-5.png";

const GALLERY_IMAGES = [img1, img2, img3, img4, img5];

function Products() {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <section
      id="products"
      className="relative py-16 px-4 sm:px-6 lg:px-8 bg-white  border-t border-gray-200/70"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-200/60 text-xs font-semibold text-[#6C5CE7] mb-4">
            <span>প্রোডাক্ট গ্যালারি</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A1953] tracking-tight">
            বালাক্লাভা মাস্কের বাস্তব লুক ও ডিটেইলস
          </h2>
          <p className="mt-3 text-base text-slate-600 font-normal leading-relaxed">প্রতিটি অ্যাঙ্গেল এবং সূক্ষ্ম ফিনিশিং একনজরে দেখে নিন।</p>
          <div className="w-16 h-1 bg-[#1A1953] mx-auto mt-2" />
        </div>

        {/* Swiper Slider Window */}
        <div className="relative group px-2 sm:px-6">
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            spaceBetween={24}
            slidesPerView={3}
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{
              clickable: true,
              el: ".custom-swiper-pagination",
            }}
            navigation={{
              prevEl: ".custom-swiper-prev",
              nextEl: ".custom-swiper-next",
            }}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 16,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
            }}
            className="w-full"
          >
            {GALLERY_IMAGES.map((imgSrc, idx) => (
              <SwiperSlide key={idx}>
                {/* Non-rounded Stroke (Primary Color #1A1953) + gap/padding + 1:1 Non-rounded image */}
                <div
                  onClick={() => setSelectedImage(imgSrc)}
                  className="group/img relative border-2 border-[#1A1953] p-1.5 bg-white rounded-none cursor-pointer transition-transform duration-300 hover:scale-[1.01]"
                >
                  <div className="relative aspect-square w-full rounded-none overflow-hidden bg-slate-100">
                    <img
                      src={imgSrc}
                      alt={`Balaclava Gallery ${idx + 1}`}
                      className="w-full h-full object-cover rounded-none block"
                      loading="lazy"
                    />

                    {/* Hover / Tap Zoom Icon overlay */}
                    <div className="absolute inset-0 bg-[#1A1953]/30 opacity-0 group-hover/img:opacity-100 transition-opacity duration-200 flex items-center justify-center text-white">
                      <div className="bg-[#1A1953] px-3 py-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider">
                        <ZoomIn className="w-4 h-4" />
                        <span>বড় করে দেখুন</span>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Prev Custom Navigation Button */}
          <button
            className="custom-swiper-prev absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-4 z-20 w-10 h-10 sm:w-11 sm:h-11 bg-[#1A1953] text-white hover:bg-[#6C5CE7] transition-colors flex items-center justify-center cursor-pointer shadow-md rounded-none disabled:opacity-50"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Custom Navigation Button */}
          <button
            className="custom-swiper-next absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-4 z-20 w-10 h-10 sm:w-11 sm:h-11 bg-[#1A1953] text-white hover:bg-[#6C5CE7] transition-colors flex items-center justify-center cursor-pointer shadow-md rounded-none disabled:opacity-50"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Custom Pagination Dots Container */}
        <div className="custom-swiper-pagination flex items-center justify-center gap-2 mt-8" />
      </div>

      {/* Lightbox Modal (Click to zoom image) */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-2xl w-full bg-white p-2 border-2 border-[#1A1953] rounded-none shadow-2xl animate-in zoom-in-95 duration-200"
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-10 right-0 text-white hover:text-slate-300 flex items-center gap-1 text-sm font-semibold cursor-pointer"
            >
              <span>বন্ধ করুন</span>
              <X className="w-6 h-6" />
            </button>

            <div className="aspect-square w-full overflow-hidden bg-slate-900">
              <img
                src={selectedImage}
                alt="Enlarged Balaclava View"
                className="w-full h-full object-cover rounded-none"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Products;