import React from "react";
import {
  Wind,
  Sun,
  Feather,
  Activity,
  Smile,
  Shield,
} from "lucide-react";

export const Features = () => {
  const features = [
    {
      id: "wind-cold",
      icon: Wind,
      iconColor: "text-[#6C5CE7]",
      iconBg: "bg-violet-50",
      title: "ঠান্ডা ও বাতাস থেকে সুরক্ষা",
      description:
        "উচ্চমানের উইন্ডপ্রুফ ফেব্রিকে তৈরি, যা তীব্র বাতাস ও শীতের কনকনে ঠান্ডা থেকে সুরক্ষা দিতে সহায়তা করে।",
      highlight: "উন্নত সুরক্ষা",
    },
    {
      id: "uv-sun",
      icon: Sun,
      iconColor: "text-[#F39C12]",
      iconBg: "bg-amber-50",
      title: "UV ও কড়া রোদ থেকে সুরক্ষা",
      description:
        "ত্বককে সরাসরি রোদ ও বাইরের পরিবেশের প্রভাব থেকে আংশিকভাবে সুরক্ষিত রাখতে সহায়তা করে।",
      highlight: "UV Protection",
    },
    {
      id: "soft-fabric",
      icon: Feather,
      iconColor: "text-[#6C5CE7]",
      iconBg: "bg-violet-50",
      title: "নরম ও আরামদায়ক ফেব্রিক",
      description:
        "ত্বকের সাথে মসৃণ ও আরামদায়ক অনুভূতি দেয়, ফলে দীর্ঘ সময় ব্যবহার করলেও স্বাচ্ছন্দ্য বজায় থাকে।",
      highlight: "সফট টাচ",
    },
    {
      id: "breathable",
      icon: Activity,
      iconColor: "text-[#00AFA9]",
      iconBg: "bg-teal-50",
      title: "ব্রেথেবল ও আরামদায়ক ম্যাটেরিয়াল",
      description:
        "বাতাস চলাচলে সহায়ক ডিজাইনের কারণে রাইডিং ও আউটডোর অ্যাক্টিভিটিতে আরামদায়ক অনুভূতি দেয়।",
      highlight: "Breathable",
    },
    {
      id: "universal-fit",
      icon: Smile,
      iconColor: "text-[#FD79A8]",
      iconBg: "bg-pink-50",
      title: "বিভিন্ন মুখের সাইজে ফিট",
      description:
        "স্ট্রেচেবল ফেব্রিকের কারণে বিভিন্ন মুখের আকারের সাথে সহজে মানিয়ে যায় এবং আরামদায়কভাবে বসে।",
      highlight: "ফ্রি সাইজ",
    },
    {
      id: "biking-sports",
      icon: Shield,
      iconColor: "text-[#7B61FF]",
      iconBg: "bg-indigo-50",
      title: "বাইক রাইডিং ও স্পোর্টসের উপযোগী",
      description:
        "হেলমেটের নিচে সহজে ব্যবহার করা যায় এবং বাইকিং, হাইকিং ও অন্যান্য আউটডোর অ্যাক্টিভিটির জন্য উপযোগী।",
      highlight: "রাইডার ফ্রেন্ডলি",
    },
  ];

  return (
    <section
      id="features"
      className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden border-t border-gray-200/70"
    >
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-96 h-96 bg-indigo-100/50 rounded-full blur-[110px] pointer-events-none" />

      <div className="absolute -top-20 right-0 w-72 h-72 bg-violet-100/40 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">

          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-200/60 text-xs font-semibold text-[#6C5CE7] mb-4">
            <span>উন্নত কার্যকারিতা ও স্বাচ্ছন্দ্য</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1953] tracking-tight leading-tight">
            কেন আমাদের এই{" "}
            <span className="bg-gradient-to-r from-[#1A1953] to-[#6C5CE7] bg-clip-text text-transparent">
              বালাক্লাভা মাস্কটি
            </span>{" "}
            আপনার জন্য উপযোগী?
          </h2>

          <p className="mt-3 text-base text-slate-600 font-normal leading-relaxed">
            প্রতিদিনের রাইডিং, আউটডোর স্পোর্টস ও স্ট্রিট ফ্যাশনের বিভিন্ন
            প্রয়োজন বিবেচনায় রেখে এটি তৈরি করা হয়েছে।
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.id}
                className="
                  group
                  rounded-3xl
                  p-6
                  sm:p-7
                  relative
                  flex
                  flex-col
                  justify-between
                  bg-white/70
                  backdrop-blur-md
                  border
                  border-indigo-100/80
                  shadow-sm
                  hover:shadow-xl
                  hover:shadow-indigo-100/40
                  hover:-translate-y-1
                  transition-all
                  duration-300
                "
              >
                <div>

                  {/* Icon Header */}
                  <div className="flex items-center justify-between mb-5">

                    {/* Icon */}
                    <div
                      className={`
                        w-12
                        h-12
                        rounded-2xl
                        ${feature.iconBg}
                        border
                        border-indigo-100
                        flex
                        items-center
                        justify-center
                        shadow-sm
                        transition-all
                        duration-300
                        group-hover:scale-110
                        group-hover:shadow-md
                        group-hover:border-indigo-200
                      `}
                    >
                      <Icon
                        className={`
                          w-6
                          h-6
                          ${feature.iconColor}
                          transition-transform
                          duration-300
                          group-hover:rotate-6
                        `}
                      />
                    </div>

                    {/* Highlight */}
                    <span className="text-[11px] font-semibold text-[#6C5CE7] bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-200/60">
                      {feature.highlight}
                    </span>

                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-[#1A1953] mb-2 group-hover:text-[#6C5CE7] transition-colors duration-300">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    {feature.description}
                  </p>
                </div>

                {/* Bottom Indicator */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">

                  <span>প্রিমিয়াম কোয়ালিটি</span>

                  <span className="text-[#6C5CE7] font-bold text-base group-hover:translate-x-1 transition-transform duration-300">
                    →
                  </span>

                </div>
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
};

export default Features;
