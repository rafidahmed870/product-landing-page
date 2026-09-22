import React from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { LogOut, LayoutDashboard, User } from "lucide-react";

function AdminLayout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Top Navbar - Clean White Theme */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center shadow-sm"
              style={{ background: "linear-gradient(135deg, #1A1953, #6C5CE7)" }}
            >
              <LayoutDashboard size={18} color="white" />
            </div>
            <div>
              <p className="text-slate-900 font-bold text-base leading-none">Admin Panel</p>
              <p className="text-slate-500 text-xs mt-0.5">Order Management System</p>
            </div>
          </div>

          {/* User Info + Logout */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #1A1953, #6C5CE7)" }}
              >
                <User size={12} color="white" />
              </div>
              <span className="text-slate-700 text-xs font-semibold">{user?.name || user?.email || "Admin"}</span>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer bg-red-50 text-red-600 border border-red-200 hover:bg-red-100"
            >
              <LogOut size={13} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Page Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {children}
      </main>
    </div>
  );
}

export default AdminLayout;
