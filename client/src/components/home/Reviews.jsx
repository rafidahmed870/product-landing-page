import React from 'react';
import { Star, CheckCircle2, Quote } from 'lucide-react';

const REVIEWS_DATA = [
  {
    id: 'rev-1',
    name: 'তানভীর আহমেদ রনি',
    location: 'মিরপুর, ঢাকা',
    rating: 5,
    date: '৩ দিন আগে',
    comment:
      'বাইক চালানোর সময় ধুলাবালি আর বাতাসের ঠান্ডায় চোখ-মুখ অবশ হয়ে যেত। এই বালাক্লাভাটা পরার পর পুরো অভিজ্ঞতা বদলে গেছে। হেলমেটের নিচে একদম পারফেক্ট বসে, কোনো দম আটকে আসে না। দারুন প্রডাক্ট!',
    verified: true,
    avatarText: 'তা',
  },
  {
    id: 'rev-2',
    name: 'মেহেদী হাসান জাহিদ',
    location: 'জিইসি মোড়, চট্টগ্রাম',
    rating: 5,
    date: '৫ দিন আগে',
    comment:
      'ফেব্রিকের মান অত্যন্ত প্রিমিয়াম। অন্যান্য সস্তা মাস্কের মত ঘামে চুলকায় না। মুখ ও গলার সম্পূর্ণ সুরক্ষা দেয়। ডেলিভারিও পেয়েছি ২ দিনের মধ্যে। দাম অনুযায়ী এক কথায় সেরা!',
    verified: true,
    avatarText: 'মে',
  },
  {
    id: 'rev-3',
    name: 'ফারহান চৌধুরী',
    location: 'উপশহর, সিলেট',
    rating: 5,
    date: '২ সপ্তাহ আগে',
    comment:
      'ট্যাকটিক্যাল লুকটা অসাধারণ। যেমন স্টাইলিশ তেমনি কাজের। হাইওয়ে রাইডিং এর জন্য এটা মাস্ট-হ্যাভ গিয়ার। আমি আমার আরো দুই বন্ধুর জন্য অর্ডার করেছি।',
    verified: true,
    avatarText: 'ফা',
  },
];

function Reviews() {
  return (
    <section
      id="reviews"
      className="relative py-20 px-4 sm:px-6 lg:px-8 bg-slate-50/70 border-t border-gray-200/70"
    >
      {/* Background ambient glow */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-indigo-100/40 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-200/60 text-xs font-semibold text-[#6C5CE7] mb-3">
            <span>সন্তুষ্ট গ্রাহকদের মন্তব্য</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1953] tracking-tight">
            গ্রাহকদের{' '}
            <span className="bg-gradient-to-r from-[#1A1953] to-[#6C5CE7] bg-clip-text text-transparent">
              বাস্তব অভিজ্ঞতা ও রিভিউ
            </span>
          </h2>

          <p className="mt-2 text-slate-600 text-sm sm:text-base">
            সারা দেশের শত শত বাইকার এবং ফ্যাশনপ্রেমী তরুণদের পছন্দের ট্যাকটিক্যাল
            মাস্ক।
          </p>
        </div>

        {/* Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS_DATA.map((review) => (
            <div
              key={review.id}
              className="glass-panel glass-panel-hover rounded-3xl p-6 sm:p-7 flex flex-col justify-between border border-indigo-100/80 relative group"
            >
              <div>
                {/* Quote Icon & Rating */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-current"
                      />
                    ))}
                  </div>

                  <Quote className="w-6 h-6 text-[#6C5CE7]/30 group-hover:text-[#6C5CE7]/60 transition-colors" />
                </div>

                {/* Comment */}
                <p className="text-sm text-slate-700 leading-relaxed font-normal mb-6 italic">
                  "{review.comment}"
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1A1953] to-[#6C5CE7] flex items-center justify-center font-bold text-white text-sm border border-[#7B61FF]/30 shadow-sm">
                  {review.avatarText}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-sm font-bold text-[#1A1953] truncate">
                      {review.name}
                    </h4>

                    {review.verified && (
                      <CheckCircle2
                        className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0"
                        title="যাচাইকৃত ক্রেতা"
                      />
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                    <span>{review.location}</span>
                    <span>•</span>
                    <span>{review.date}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Social Proof Stats Banner */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-3xl glass-panel border border-indigo-100/90 text-center shadow-md">
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#1A1953]">
              2500+
            </div>
            <div className="text-xs sm:text-sm text-slate-500 mt-1">
              সন্তুষ্ট গ্রাহক
            </div>
          </div>

          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#6C5CE7]">
              ৪.৯ / ৫
            </div>
            <div className="text-xs sm:text-sm text-slate-500 mt-1">
              গড় রেটিং
            </div>
          </div>

          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#1A1953]">
              ৬৪ জেলা
            </div>
            <div className="text-xs sm:text-sm text-slate-500 mt-1">
              হোম ডেলিভারি
            </div>
          </div>

          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#7B61FF]">
              100%
            </div>
            <div className="text-xs sm:text-sm text-slate-500 mt-1">
              ক্যাশ অন ডেলিভারি
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
