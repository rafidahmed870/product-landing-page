import React from 'react';
import { Banknote, Truck, ShieldCheck, RefreshCw } from 'lucide-react';

const TRUST_FACTORS = [
  {
    id: 'cod',
    iconName: 'Banknote',
    title: 'ক্যাশ অন ডেলিভারি',
    description:
      'আগে কোনো টাকা দিতে হবে না, পণ্য হাতে পেয়ে দেখে তারপর সম্পূর্ণ মূল্য পরিশোধ করুন।',
  },
  {
    id: 'fast-shipping',
    iconName: 'Truck',
    title: 'সারা দেশে দ্রুত ডেলিভারি',
    description:
      'ঢাকার ভিতরে ২৪ থেকে ৪৮ ঘণ্টার মধ্যে এবং ঢাকার বাইরে ২ থেকে ৩ দিনের মধ্যে হোম ডেলিভারি।',
  },
  {
    id: 'guarantee',
    iconName: 'ShieldCheck',
    title: '১০০% অরিজিনাল কোয়ালিটি',
    description:
      'প্রিমিয়াম টেক্সটাইল ফিনিশিং ও দীর্ঘস্থায়ী স্থায়িত্বের নিশ্চয়তা পাচ্ছেন সরাসরি প্রস্তুতকারক সূত্রে।',
  },
  {
    id: 'return',
    iconName: 'RefreshCw',
    title: 'সহজ রিটার্ন সুবিধা',
    description:
      'পণ্য পছন্দ না হলে বা কোনো ত্রুটি থাকলে ডেলিভারিম্যানের সামনেই তাৎক্ষণিক রিটার্ন করার সুবিধা।',
  },
];

function WhyChooseUs() {

    const handleScroll = (href) => {
    const targetId = href.replace("#", "");
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  const getIcon = (name) => {
    switch (name) {
      case 'Banknote':
        return <Banknote className="w-7 h-7 text-[#0984E3]" />;

      case 'Truck':
        return <Truck className="w-7 h-7 text-[#7B61FF]" />;

      case 'ShieldCheck':
        return <ShieldCheck className="w-7 h-7 text-[#6C5CE7]" />;

      case 'RefreshCw':
      default:
        return <RefreshCw className="w-7 h-7 text-[#6C5CE7]" />;
    }
  };

  return (
    <section
      id="why-us"
      className="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-gray-200/70"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-violet-100/40 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-200/60 text-xs font-semibold text-[#6C5CE7] mb-3">
            <span>বিশ্বাস ও নির্ভরতা</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1953] tracking-tight">
            কেন আমাদের কাছ থেকেই{' '}
            <span className="bg-gradient-to-r from-[#1A1953] to-[#6C5CE7] bg-clip-text text-transparent">
              অর্ডার করবেন?
            </span>
          </h2>

          <p className="mt-2 text-slate-600 text-sm sm:text-base">
            আমরা নিশ্চিত করি সেরা কোয়ালিটি এবং গ্রাহক সন্তুষ্টির সর্বোত্তম
            অভিজ্ঞতা।
          </p>
        </div>

        {/* 4 Trust Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TRUST_FACTORS.map((factor) => (
            <div
              key={factor.id}
              className="glass-panel glass-panel-hover rounded-3xl p-6 flex flex-col items-center text-center border border-indigo-100/80 relative group"
            >
              <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-200/60 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-indigo-100/80 group-hover:border-indigo-300 transition-all duration-300 shadow-sm">
                {getIcon(factor.iconName)}
              </div>

              <h3 className="text-lg font-bold text-[#1A1953] mb-2 group-hover:text-[#6C5CE7] transition-colors">
                {factor.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                {factor.description}
              </p>
            </div>
          ))}
        </div>

        {/* Trust Highlight Banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl glass-panel border border-indigo-100/90 bg-gradient-to-r from-indigo-50/80 to-white flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left shadow-md">
          <div>
            <h4 className="text-xl font-bold text-[#1A1953]">
              নিশ্চিন্তে অর্ডার করুন — কোনো ঝুঁকি নেই!
            </h4>

            <p className="text-sm text-slate-600 mt-1">
              ডেলিভারি ম্যানের সামনে প্যাকেট খুলে চেক করে মূল্য পরিশোধ করার
              ১০০% নিশ্চয়তা।
            </p>
          </div>

          <div className="flex-shrink-0">
            <button id="order-button" onClick={() => handleScroll("#order")} 
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#6C5CE7] to-[#7B61FF] text-white font-semibold text-sm shadow-md glow-button hover:opacity-95 transition-all cursor-pointer"
            >
              <span>অর্ডার সেকশনে যান</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;
