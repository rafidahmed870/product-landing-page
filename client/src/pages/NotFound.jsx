import React from 'react';
import { Link } from 'react-router-dom';
import { Home as HomeIcon, AlertTriangle } from 'lucide-react';
import notFoundImg from '../assets/not-found.png';

function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl border border-indigo-100 p-8 text-center shadow-xl">
        <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-[#6C5CE7] flex items-center justify-center mx-auto mb-4 border border-indigo-100">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-extrabold text-[#1A1953]">404</h1>
        <h2 className="text-xl font-bold text-slate-800 mt-2">পেজটি পাওয়া যায়নি!</h2>
        <p className="text-sm text-slate-500 mt-2">
          আপনি যে পেজটি খুঁজছেন তা হয়তো সরানো হয়েছে অথবা লিংকটি সঠিক নয়।
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#6C5CE7] to-[#7B61FF] text-white font-semibold text-sm shadow-md hover:brightness-105 transition-all"
        >
          <HomeIcon className="w-4 h-4" />
          <span>হোম পেজে ফিরে যান</span>
        </Link>
      </div>
    </div>
  );
}

export default NotFound;