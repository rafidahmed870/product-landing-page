import React from "react";
import { Link } from "react-router-dom";
import headerLogo from "../../assets/logo-header.png";
import { Phone, Mail, MapPin, ShieldCheck, Truck, RefreshCw, MessageSquare } from "lucide-react";
import { SITE_PHONE, SITE_WHATSAPP, SITE_FACEBOOK, SITE_INSTAGRAM } from "../../lib/constants";

function Footer() {
  return (
    <footer id="contact" className="bg-[#1A1953] text-white pt-16 pb-8 border-t border-indigo-900/50 relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#6C5CE7]/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-80 h-80 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Value Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-12 mb-12 border-b border-indigo-900/60">
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-indigo-950/40 border border-indigo-800/40">
            <div className="w-12 h-12 rounded-xl bg-[#6C5CE7]/20 flex items-center justify-center text-[#7B61FF]">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm">সারা বাংলাদেশে ক্যাশ অন ডেলিভারি</h4>
              <p className="text-xs text-slate-300">পণ্য হাতে পেয়ে দেখে মূল্য পরিশোধের সুবিধা</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-indigo-950/40 border border-indigo-800/40">
            <div className="w-12 h-12 rounded-xl bg-[#6C5CE7]/20 flex items-center justify-center text-[#7B61FF]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm">100% প্রিমিয়াম কোয়ালিটি</h4>
              <p className="text-xs text-slate-300">উচ্চমানের ব্রেথেবল ও উইন্ডপ্রুফ ফেব্রিকে তৈরি</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-indigo-950/40 border border-indigo-800/40">
            <div className="w-12 h-12 rounded-xl bg-[#6C5CE7]/20 flex items-center justify-center text-[#7B61FF]">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm">সহজ রিটার্ন পলিসি</h4>
              <p className="text-xs text-slate-300">যেকোনো ডিফেক্ট বা সমস্যায় দ্রুত এক্সচেঞ্জ সাপোর্ট</p>
            </div>
          </div>
        </div>

        {/* Footer Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <Link to="/" className="inline-block">
              <img src={headerLogo} alt="Balaclava Logo" className="h-12 w-auto bg-white/90 p-1.5 rounded-xl shadow-md" />
            </Link>
            <p className="text-sm text-slate-300 max-w-md leading-relaxed">
              বাইকার, রাইডার এবং ফ্যাশন-সচেতন তরুণদের জন্য প্রিমিয়াম কোয়ালিটির ট্যাকটিক্যাল বালাক্লাভা মাস্ক। স্টাইল ও সুরক্ষার সেরা সমন্বয়।
            </p>
            <div className="flex items-center gap-3 pt-2">
              {SITE_FACEBOOK && (
                <a
                  href={SITE_FACEBOOK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-indigo-900/60 border border-indigo-700/50 flex items-center justify-center text-slate-300 hover:text-white hover:bg-[#6C5CE7] transition-all"
                  aria-label="Facebook Page"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              )}
              {SITE_INSTAGRAM && (
                <a
                  href={SITE_INSTAGRAM}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-indigo-900/60 border border-indigo-700/50 flex items-center justify-center text-slate-300 hover:text-white hover:bg-[#6C5CE7] transition-all"
                  aria-label="Instagram Page"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-base font-bold text-white tracking-wide">দ্রুত লিঙ্ক</h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <a href="#home" className="hover:text-[#7B61FF] transition-colors">হোম</a>
              </li>
              <li>
                <a href="#features" className="hover:text-[#7B61FF] transition-colors">বৈশিষ্ট্যসমূহ</a>
              </li>
              <li>
                <a href="#products" className="hover:text-[#7B61FF] transition-colors">প্রোডাক্ট গ্যালারি</a>
              </li>
              <li>
                <a href="#order" className="hover:text-[#7B61FF] transition-colors">অর্ডার করুন</a>
              </li>
            </ul>
          </div>

          {/* Contact Col */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-base font-bold text-white tracking-wide">যোগাযোগ ও হেল্পলাইন</h4>
            <div className="space-y-2.5 text-sm text-slate-300">
              {SITE_PHONE && (
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#7B61FF] shrink-0" />
                  <a href={`tel:${SITE_PHONE}`} className="hover:text-[#7B61FF] transition-colors">
                    {SITE_PHONE}
                  </a>
                </div>
              )}
              {SITE_WHATSAPP && (
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                  <a
                    href={`https://wa.me/${SITE_WHATSAPP}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#7B61FF] transition-colors"
                  >
                    হোয়াটসঅ্যাপ: {SITE_WHATSAPP}
                  </a>
                </div>
              )}
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-[#7B61FF] shrink-0" />
                <span>ঢাকা, বাংলাদেশ</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-indigo-900/60 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} Balaclava Mask. সর্বস্বত্ব সংরক্ষিত।</p>
          <p className="flex items-center gap-1">
            ডিজাইন ও ডেভেলপমেন্ট — <span className="text-white font-medium">Balaclava Store</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;