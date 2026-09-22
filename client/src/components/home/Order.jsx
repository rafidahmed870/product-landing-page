import React, { useState } from "react";
import {
  ShoppingBag,
  CheckCircle,
  Truck,
  ShieldCheck,
  Plus,
  Minus,
  User,
  Phone,
  MapPin,
  Sparkles,
} from "lucide-react";
import productImg from "../../assets/balaclava-gallery-1.png";
import {
  PRODUCT_PRICE,
  PRODUCT_DISCOUNT_PRICE,
  DC_INSIDE_DHAKA,
  DC_OUTSIDE_DHAKA,
} from "../../lib/constants";

function Order() {
  const [quantity, setQuantity] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    note: "",
    deliveryLocation: "inside",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const unitPrice = PRODUCT_DISCOUNT_PRICE;
  const deliveryCharge =
    formData.deliveryLocation === "inside" ? DC_INSIDE_DHAKA : DC_OUTSIDE_DHAKA;
  const subtotal = unitPrice * quantity;
  const totalPrice = subtotal + deliveryCharge;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address) {
      alert("অনুগ্রহ করে আপনার নাম, মোবাইল নম্বর এবং ঠিকানা পূরণ করুন।");
      return;
    }
    setIsSubmitted(true);
  };

  return (
    <section
      id="order"
      className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-indigo-50/40 via-white to-slate-50  border-t border-gray-200/70"
    >
      {/* Glow effect */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#6C5CE7]/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-200/70 text-xs font-semibold text-[#6C5CE7] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>সহজ ক্যাশ অন ডেলিভারি</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1A1953] tracking-tight">
            অর্ডার করতে নিচের{" "}
            <span className="bg-gradient-to-r from-[#1A1953] via-[#6C5CE7] to-[#7B61FF] bg-clip-text text-transparent">
              ফর্মটি পূরণ করুন
            </span>
          </h2>
          <p className="mt-3 text-base text-slate-600 font-normal">
            পণ্য হাতে পেয়ে দেখে চেক করে সম্পূর্ণ মূল্য পরিশোধ করুন।
          </p>
        </div>

        {isSubmitted ? (
          /* Order Confirmation Card */
          <div className="max-w-xl mx-auto rounded-3xl bg-white border border-indigo-100 p-8 text-center shadow-xl">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-[#1A1953]">
              আপনার অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে!
            </h3>
            <p className="text-sm text-slate-600 mt-2">
              ধন্যবাদ <span className="font-semibold text-[#1A1953]">{formData.name}</span>, আমাদের প্রতিনিধি খুব শীঘ্রই আপনার কল করে অর্ডার কনফার্ম করবেন।
            </p>

            <div className="mt-6 p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 text-left text-xs sm:text-sm space-y-2 text-slate-700">
              <div className="flex justify-between">
                <span className="text-slate-500">ফোন নম্বর:</span>
                <span className="font-semibold">{formData.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">ডেলিভারি ঠিকানা:</span>
                <span className="font-semibold">{formData.address}</span>
              </div>
              <div className="flex justify-between border-t border-indigo-100 pt-2 font-bold text-[#1A1953]">
                <span>সর্বমোট দেয় (ক্যাশ অন ডেলিভারি):</span>
                <span className="text-[#6C5CE7] text-base">৳{totalPrice}</span>
              </div>
            </div>

            <button
              onClick={() => setIsSubmitted(false)}
              className="mt-6 inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#6C5CE7] to-[#7B61FF] text-white font-semibold text-sm cursor-pointer shadow-md hover:opacity-95"
            >
              নতুন অর্ডার করুন
            </button>
          </div>
        ) : (
          /* Order Form & Summary Grid */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Col - Product Summary */}
            <div className="lg:col-span-5 rounded-3xl bg-white border border-indigo-100 p-6 shadow-lg space-y-6">
              <h3 className="text-xl font-bold text-[#1A1953] border-b border-slate-100 pb-3 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#6C5CE7]" />
                <span>অর্ডার সামারি</span>
              </h3>

              {/* Product Info Card */}
              <div className="flex gap-4 items-center p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <img
                  src={productImg}
                  alt="Balaclava Mask"
                  className="w-20 h-20 rounded-xl object-cover border border-slate-200"
                />
                <div>
                  <h4 className="font-bold text-[#1A1953] text-sm sm:text-base">
                    প্রিমিয়াম ট্যাকটিক্যাল বালাক্লাভা মাস্ক
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">কালার: স্টিল্থ ব্ল্যাক | ফ্রি সাইজ</p>
                  <p className="text-sm font-extrabold text-[#6C5CE7] mt-1">
                    ৳{unitPrice} <span className="text-xs text-slate-400 line-through font-normal">৳{PRODUCT_PRICE}</span>
                  </p>
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-indigo-50/50 border border-indigo-100">
                <span className="text-xs sm:text-sm font-semibold text-[#1A1953]">পরিমাণ (Quantity):</span>
                <div className="flex items-center gap-3 bg-white px-3 py-1.5 rounded-xl border border-indigo-200">
                  <button
                    type="button"
                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                    className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-[#1A1953] flex items-center justify-center font-bold transition-colors cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="font-extrabold text-[#1A1953] text-sm w-4 text-center">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity((prev) => prev + 1)}
                    className="w-7 h-7 rounded-lg bg-[#6C5CE7] hover:bg-[#5a4bd4] text-white flex items-center justify-center font-bold transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Price Calculation */}
              <div className="space-y-2 text-xs sm:text-sm text-slate-600 border-t border-slate-100 pt-4">
                <div className="flex justify-between">
                  <span>পণ্যের মোট দাম ({quantity} টি):</span>
                  <span className="font-semibold text-[#1A1953]">৳{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>ডেলিভারি চার্জ:</span>
                  <span className="font-semibold text-[#1A1953]">৳{deliveryCharge}</span>
                </div>
                <div className="flex justify-between border-t border-slate-200 pt-3 text-base font-extrabold text-[#1A1953]">
                  <span>সর্বমোট মূল্য:</span>
                  <span className="text-xl text-[#6C5CE7]">৳{totalPrice}</span>
                </div>
              </div>

              {/* Assurance Badges */}
              <div className="grid grid-cols-2 gap-2 pt-2 text-[11px] text-slate-500 font-medium">
                <div className="flex items-center gap-1.5 p-2 rounded-xl bg-slate-50">
                  <Truck className="w-4 h-4 text-[#6C5CE7]" />
                  <span>দ্রুত হোম ডেলিভারি</span>
                </div>
                <div className="flex items-center gap-1.5 p-2 rounded-xl bg-slate-50">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>ক্যাশ অন ডেলিভারি</span>
                </div>
              </div>
            </div>

            {/* Right Col - Checkout Form */}
            <form
              onSubmit={handleSubmit}
              className="lg:col-span-7 rounded-3xl bg-white border border-indigo-100 p-6 sm:p-8 shadow-lg space-y-5"
            >
              <h3 className="text-xl font-bold text-[#1A1953] border-b border-slate-100 pb-3">
                ডেলিভারি তথ্য প্রদান করুন
              </h3>

              {/* Full Name */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-[#1A1953] mb-1.5">
                  আপনার পূর্ণ নাম <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="আপনার নাম লিখুন"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-[#6C5CE7] focus:ring-2 focus:ring-[#6C5CE7]/20 outline-none transition-all text-sm"
                  />
                </div>
              </div>

              {/* Mobile Phone */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-[#1A1953] mb-1.5">
                  মোবাইল নম্বর <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="১১ ডিজিটের মোবাইল নম্বর"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-[#6C5CE7] focus:ring-2 focus:ring-[#6C5CE7]/20 outline-none transition-all text-sm"
                  />
                </div>
              </div>

              {/* Full Address */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-[#1A1953] mb-1.5">
                  সম্পূর্ণ ঠিকানা <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                  <textarea
                    name="address"
                    rows={2}
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="জেলা, থানা, বাসা নং/রোড নং ও এলাকার নাম"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#6C5CE7] focus:ring-2 focus:ring-[#6C5CE7]/20 outline-none transition-all text-sm resize-none"
                  />
                </div>
              </div>

              {/* Delivery Location Selection */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-[#1A1953] mb-2">
                  ডেলিভারি এরিয়া নির্বাচন করুন <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label
                    className={`flex items-center gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      formData.deliveryLocation === "inside"
                        ? "border-[#6C5CE7] bg-indigo-50/60 font-semibold text-[#1A1953]"
                        : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="deliveryLocation"
                      value="inside"
                      checked={formData.deliveryLocation === "inside"}
                      onChange={handleInputChange}
                      className="accent-[#6C5CE7]"
                    />
                    <div className="text-xs sm:text-sm">
                      <p>ঢাকার ভেতরে</p>
                      <p className="text-slate-500 text-xs font-normal">চার্জ: ৳{DC_INSIDE_DHAKA} (২৪-৪৮ ঘন্টা)</p>
                    </div>
                  </label>

                  <label
                    className={`flex items-center gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      formData.deliveryLocation === "outside"
                        ? "border-[#6C5CE7] bg-indigo-50/60 font-semibold text-[#1A1953]"
                        : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="deliveryLocation"
                      value="outside"
                      checked={formData.deliveryLocation === "outside"}
                      onChange={handleInputChange}
                      className="accent-[#6C5CE7]"
                    />
                    <div className="text-xs sm:text-sm">
                      <p>ঢাকার বাইরে</p>
                      <p className="text-slate-500 text-xs font-normal">চার্জ: ৳{DC_OUTSIDE_DHAKA} (২-৩ দিন)</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Order Submit Button */}
              <button
                type="submit"
                id="submit-order-form-btn"
                className="w-full mt-4 py-4 rounded-2xl bg-gradient-to-r from-[#6C5CE7] to-[#7B61FF] text-white font-bold text-base sm:text-lg shadow-xl hover:brightness-105 active:scale-98 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>অর্ডার নিশ্চিত করুন (৳{totalPrice})</span>
              </button>

              <p className="text-center text-xs text-slate-500 font-medium mt-2">
                🔒 পণ্য ডেলিভারি ম্যানের সামনে চেক করে মূল্য পরিশোধ করবেন।
              </p>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}

export default Order;
