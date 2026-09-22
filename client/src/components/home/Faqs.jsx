import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { SITE_PHONE } from "../../lib/constants";

export const FAQ_DATA = [
  {
    id: "faq-1",
    question: "এই বালাক্লাভা মাস্কের সাইজ কেমন? আমার মুখে কি ঠিকঠাক ফিট হবে?",
    answer:
      "এটি একটি ইউনিভার্সাল ফ্রি-সাইজ (Free Size) মাস্ক। এটি স্ট্রেচেবল ফেব্রিকে তৈরি হওয়ার কারণে এটি ছোট-বড় যেকোনো মুখের গড়নে স্বাচ্ছন্দ্যে ফিট হয়ে যায়।",
  },
  {
    id: "faq-2",
    question: "ডেলিভারি পেতে কতদিন সময় লাগবে?",
    answer:
      "ঢাকার ভেতরে সাধারণত ২৪ থেকে ৪৮ ঘণ্টার মধ্যে ডেলিভারি সম্পন্ন হয়। ঢাকার বাইরে যে কোনো জেলা বা থানা শহরে ২ থেকে ৩ কার্যদিবসের মধ্যে আপনার দোরগোড়ায় পণ্য পৌঁছে যাবে।",
  },
  {
    id: "faq-3",
    question: "পেমেন্ট কীভাবে করব? আগে টাকা পাঠাতে হবে কি?",
    answer:
      "না, কোনো অগ্রিম পেমেন্ট করার প্রয়োজন নেই। ডেলিভারি ম্যানের কাছ থেকে পণ্যটি স্বচক্ষে দেখে ক্যাশ অন ডেলিভারিতে (Cash on Delivery) টাকা পরিশোধ করতে পারবেন। এছাড়া চাইলে বিকাশ বা নগদেও ডেলিভারিম্যানকে দিতে পারেন।",
  },
  {
    id: "faq-4",
    question: "পণ্য পছন্দ না হলে বা ত্রুটি থাকলে পরিবর্তনের নিয়ম কী?",
    answer:
      "ডেলিভারির সময় প্রোডাক্ট চেক করে নিতে পারবেন। কোনো ত্রুটি থাকলে বা প্রত্যাশা অনুযায়ী না হলে ডেলিভারিম্যান থাকা অবস্থাতেই তাৎক্ষণিক রিটার্ন করতে পারবেন অথবা আমাদের হোয়াটসঅ্যাপে জানালে দ্রুত এক্সচেঞ্জ সমাধান করে দেওয়া হবে।",
  },
  {
    id: "faq-5",
    question: "এটি কীভাবে পরিষ্কার বা ধৌত করব?",
    answer:
      "সাধারণ ঠাণ্ডা পানিতে শ্যাম্পু বা হালকা ডিটারজেন্ট দিয়ে সহজেই হাত দিয়ে ধুয়ে ছায়াযুক্ত স্থানে শুকাতে পারেন। এর কালার বা ইলাস্টিসিটি বহু ওয়াশের পরও নষ্ট হয় না।",
  },
];

function Faqs() {
  const [openId, setOpenId] = useState("faq-1");

  const toggleFaq = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="faq"
      className="relative py-20 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-200/70"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 bg-indigo-100/40 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header matching SS layout */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-200/60 text-xs font-semibold text-[#6C5CE7] mb-3">
            <span>সাধারণ জিজ্ঞাসা</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A1953] tracking-tight leading-tight">
            আপনার প্রশ্ন,{" "}
            <span className="bg-gradient-to-r from-[#1A1953] to-[#6C5CE7] bg-clip-text text-transparent">
              আমাদের উত্তর
            </span>
          </h2>

          <p className="mt-3 text-base text-slate-600 font-normal leading-relaxed">
            অর্ডার করার আগে প্রয়োজনীয় তথ্যগুলো এক নজরে জেনে নিন।
          </p>
        </div>

        {/* FAQ Accordion List (No top border on first question) */}
        <div className="divide-y divide-gray-200/80 border-b border-gray-200/80">
          {FAQ_DATA.map((item) => {
            const isOpen = openId === item.id;

            return (
              <div key={item.id} className="transition-colors duration-200">
                <button
                  type="button"
                  onClick={() => toggleFaq(item.id)}
                  className="w-full py-5 flex items-center justify-between text-left gap-4 cursor-pointer group focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span
                    className={`text-base sm:text-lg font-bold transition-colors duration-200 ${
                      isOpen
                        ? "text-[#6C5CE7]"
                        : "text-[#1A1953] group-hover:text-[#6C5CE7]"
                    }`}
                  >
                    {item.question}
                  </span>

                  {/* Clean Chevron Icon without background circle button */}
                  <ChevronDown
                    className={`w-5 h-5 shrink-0 transition-transform duration-300 ${
                      isOpen
                        ? "text-[#6C5CE7] rotate-180"
                        : "text-slate-400 group-hover:text-[#6C5CE7]"
                    }`}
                  />
                </button>

                {/* Animated Answer Drawer */}
                {isOpen && (
                  <div className="pb-6 pr-6 text-sm sm:text-base text-slate-600 leading-relaxed font-normal animate-in fade-in slide-in-from-top-1 duration-200">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Support Callout */}
        <div className="mt-12 text-center p-6 rounded-2xl bg-indigo-50/50 border border-indigo-100/80">
          <p className="text-sm text-slate-600">
            আপনার কি অন্য কোনো প্রশ্ন আছে? আমাদের হটলাইনে সরাসরি কল করতে পারেন:{" "}
            <a
              href={`tel:${SITE_PHONE}`}
              className="font-bold text-[#6C5CE7] hover:underline"
            >
              {SITE_PHONE}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Faqs;