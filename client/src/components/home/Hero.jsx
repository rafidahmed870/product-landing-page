import { Menu, X, ShoppingBag, Shield, Gem, Star } from 'lucide-react';
import heroImage from "../../assets/balaclava-hero-image.png";
import { PRODUCT_PRICE, PRODUCT_DISCOUNT_PRICE } from "../../lib/constants";

function Hero() {
  const savings = PRODUCT_PRICE - PRODUCT_DISCOUNT_PRICE;

  return (
    <section
      id="home"
      className="relative min-h-[85vh] pt-20 sm:pt-24 md:pt-28 pb-16 flex items-center justify-center overflow-hidden"
    >
  {/* Background ambient lighting effects */}
  <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#6C5CE7]/10 rounded-full blur-[120px] pointer-events-none" />

  <div className="absolute -top-10 -right-20 w-[400px] h-[400px] bg-indigo-100/60 rounded-full blur-[100px] pointer-events-none" />

  <div className="absolute bottom-10 left-0 w-[350px] h-[350px] bg-violet-100/50 rounded-full blur-[90px] pointer-events-none" />

  {/* Grid pattern */}
  <div
    className="absolute inset-0 opacity-[0.04] pointer-events-none"
    style={{
      backgroundImage: "radial-gradient(#1A1953 1px, transparent 1px)",
      backgroundSize: "24px 24px",
    }}
  />

  <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

      {/* LEFT COLUMN */}
      <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">

        {/* Offer Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50/90 border border-indigo-200/70 shadow-sm backdrop-blur-md">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#6C5CE7] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#7B61FF]" />
          </span>

          <span className="text-xs sm:text-sm font-semibold text-[#1A1953]">
            সীমিত সময়ের বিশেষ অফার — মাত্র ৭৫টি অবশিষ্ট!
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1A1953] leading-[1.2]">
          স্টাইলিশ আরবান লুক আর{" "}
          <span className="bg-gradient-to-r from-[#1A1953] via-[#6C5CE7] to-[#7B61FF] bg-clip-text text-transparent">
            ঠান্ডা-ধুলোবালির বিরুদ্ধে
          </span>{" "}
          সম্পূর্ণ সুরক্ষা
        </h1>

        {/* Description */}
        <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed font-normal">
          রাইডার এবং ফ্যাশন-সচেতন তরুণদের জন্য প্রিমিয়াম ট্যাকটিক্যাল
          বালাক্লাভা মাস্ক। নরম, আরামদায়ক ও 100% ব্রেথেবল ফেব্রিক—যা
          আপনাকে রাখবে সুরক্ষিত, আত্মবিশ্বাসী ও সম্পূর্ণ ফ্যাশনেবল।
        </p>

        {/* Price */}
        <div className="flex flex-wrap items-baseline gap-3.5 py-2 px-4 rounded-2xl bg-white border border-indigo-100 shadow-sm backdrop-blur-md">
          <span className="text-xs sm:text-sm text-slate-500 font-medium">
            বিশেষ মূল্য:
          </span>

          <span className="text-2xl sm:text-3xl font-extrabold text-[#1A1953]">
            ৳{PRODUCT_DISCOUNT_PRICE}
          </span>

          <span className="text-sm sm:text-base text-slate-400 line-through">
            ৳{PRODUCT_PRICE}
          </span>

          {savings > 0 && (
            <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-indigo-50 text-[#6C5CE7] border border-indigo-200">
              সাশ্রয় ৳{savings}
            </span>
          )}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto pt-2">

          <button
            id="hero-primary-order-btn"
            onClick={() => {
              document
                .getElementById("order")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#6C5CE7] to-[#7B61FF] text-white font-semibold text-base sm:text-lg shadow-xl hover:brightness-105 active:scale-95 transition-all duration-200 cursor-pointer"
          >
            <ShoppingBag className="w-5 h-5" />
            <span>এখনই অর্ডার করুন</span>
          </button>

          <button
            id="hero-secondary-learn-btn"
            onClick={() => {
              document
                .getElementById("features")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-white hover:bg-indigo-50/70 text-slate-700 hover:text-[#1A1953] font-semibold text-base border border-slate-200 hover:border-indigo-200 shadow-sm backdrop-blur-md transition-all duration-200 cursor-pointer"
          >
            <span>বিস্তারিত জানুন</span>
          </button>

        </div>

        {/* Trust Highlights */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-4 border-t border-slate-200 w-full max-w-lg">

          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#6C5CE7] shrink-0" />
            <span className="text-xs text-slate-600 font-medium">
              ক্যাশ অন ডেলিভারি
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Gem className="w-4 h-4 text-[#6C5CE7] shrink-0" />
            <span className="text-xs text-slate-600 font-medium">
              100% কোয়ালিটি
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400 shrink-0" />
            <span className="text-xs text-slate-600 font-medium">
              ৪.৯/৫ রেটিং
            </span>
          </div>

        </div>
      </div>

      {/* RIGHT COLUMN */}
      <div className="lg:col-span-5 relative flex justify-center items-center">

        {/* Glow */}
        <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-indigo-100 via-violet-200/50 to-indigo-50 blur-2xl -z-0 pointer-events-none" />

        {/* Product Card */}
        <div className="relative z-10 w-full max-w-md rounded-3xl overflow-hidden bg-white/70 border border-indigo-100 p-3 sm:p-4 shadow-2xl">

          <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-slate-900 shadow-inner">

            <img
              src={heroImage}
              alt="প্রিমিয়াম ট্যাকটিক্যাল বালাক্লাভা মাস্ক"
              className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
            />

            {/* Product Badge */}
            <div className="absolute top-3 left-3 bg-[#1A1953]/85 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20 text-xs font-semibold text-white flex items-center gap-1.5 shadow-md">
              <span className="w-2 h-2 rounded-full bg-[#7B61FF]" />
              <span>ট্যাকটিক্যাল স্টিল্থ ব্ল্যাক</span>
            </div>

            {/* Size */}
            <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-xl border border-indigo-100 text-xs font-semibold text-[#1A1953] shadow-sm">
              ইউনিভার্সাল ফ্রি সাইজ
            </div>

          </div>

          {/* Features */}
          <div className="mt-3 px-2 py-2 grid grid-cols-3 gap-2 text-xs text-slate-600 font-medium text-center">
            <span>✓ উইন্ডপ্রুফ</span>
            <span>✓ ব্রেথেবল মেশ</span>
            <span>✓ হেলমেট ফ্রেন্ডলি</span>
          </div>

        </div>
      </div>

    </div>
  </div>
</section>

  )
}

export default Hero