import React, { useState } from "react";
import headerLogo from "../../assets/logo-header.png";
import { Link } from "react-router-dom";
import { ShoppingBag, Menu, X } from "lucide-react";

const NAVIGATION_LINKS = [
  { id: "home", label: "হোম", href: "#home" },
  { id: "features", label: "বৈশিষ্ট্য", href: "#features" },
  { id: "products", label: "প্রোডাক্ট গ্যালারি", href: "#products" },
  { id: "why-us", label: "কেন আমরা", href: "#why-us" },
  { id: "reviews", label: "রিভিউ", href: "#reviews" },
  { id: "faq", label: "প্রশ্নোত্তর", href: "#faq" },
  { id: "contact", label: "যোগাযোগ", href: "#contact" },
];

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleScroll = (href) => {
    setMobileMenuOpen(false);
    const targetId = href.replace("#", "");
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      id="main-navbar"
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-indigo-100 h-16 sm:h-20 flex items-center shadow-xs"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* MOBILE VIEW (Left 3-line menu, Center Logo, Right Order Button) */}
        <div className="flex md:hidden items-center justify-between h-full">
          {/* Left: 3-Line Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Center: Logo */}
          <Link to="/" className="flex items-center justify-center py-1">
            <img src={headerLogo} alt="Balaclava Mask" className="h-11 sm:h-11 w-auto max-h-12" />
          </Link>

          {/* Right: Order Button */}
          <button
            onClick={() => handleScroll("#order")}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#6C5CE7] text-white text-xs font-semibold shadow-xs hover:bg-[#5a4bd4] active:scale-95 transition-all cursor-pointer whitespace-nowrap"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>অর্ডার</span>
          </button>
        </div>

        {/* DESKTOP VIEW */}
        <div className="hidden md:flex items-center justify-between h-full">
          {/* Left Side - Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <img src={headerLogo} alt="Balaclava Mask" className="h-12 lg:h-12 w-auto" />
          </Link>

          {/* Center - Desktop Navigation Links */}
          <nav className="flex items-center gap-1 lg:gap-2 overflow-hidden" id="desktop-nav">
            {NAVIGATION_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => handleScroll(link.href)}
                className="px-3 lg:px-4 py-2 text-xs lg:text-sm font-semibold text-slate-700 hover:text-[#6C5CE7] rounded-xl hover:bg-indigo-50/70 transition-colors duration-150 cursor-pointer whitespace-nowrap"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right Side - Desktop Order Button */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              id="nav-order-button"
              onClick={() => handleScroll("#order")}
              className="inline-flex items-center gap-2 px-5 lg:px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#6C5CE7] to-[#7B61FF] text-white font-semibold text-xs lg:text-sm shadow-md hover:brightness-105 active:scale-95 transition-all duration-200 cursor-pointer whitespace-nowrap"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>অর্ডার করুন</span>
            </button>
          </div>
        </div>

      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 md:hidden bg-white border-b border-indigo-100 px-4 pt-2 pb-4 space-y-1.5 animate-in slide-in-from-top-2 duration-200 shadow-xl">
          {NAVIGATION_LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => handleScroll(link.href)}
              className="block w-full text-left px-4 py-2.5 text-sm font-semibold text-slate-700 hover:text-[#6C5CE7] hover:bg-indigo-50 rounded-xl transition-colors cursor-pointer"
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}

export default Header;
