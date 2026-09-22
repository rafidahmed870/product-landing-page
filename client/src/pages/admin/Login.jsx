import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Eye, EyeOff, Lock, Mail, LayoutDashboard, AlertCircle } from "lucide-react";
import { Helmet } from "react-helmet-async";

function Login() {
  const { login, user, loading } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (!loading && user) {
      navigate("/admin", { replace: true });
    }
  }, [user, loading, navigate]);

  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError("Email and password are required");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      await login(form.email, form.password);
      navigate("/admin", { replace: true });
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Admin Login</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 relative overflow-hidden">
        {/* Subtle decorative background glows */}
        <div
          className="absolute -top-24 -left-24 w-96 h-96 rounded-full pointer-events-none opacity-40"
          style={{
            background: "radial-gradient(circle, rgba(108,92,231,0.2) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <div
          className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full pointer-events-none opacity-40"
          style={{
            background: "radial-gradient(circle, rgba(26,25,83,0.15) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />

        {/* Card - White Theme */}
        <div className="relative w-full max-w-md rounded-2xl p-8 sm:p-10 bg-white border border-slate-200 shadow-xl">
          {/* Header */}
          <div className="flex flex-col items-center gap-4 mb-8">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-md"
              style={{
                background: "linear-gradient(135deg, #1A1953, #6C5CE7)",
              }}
            >
              <LayoutDashboard size={26} color="white" />
            </div>
            <div className="text-center">
              <h1 className="text-2xl font-bold text-slate-900">Admin Portal</h1>
              <p className="text-slate-500 text-sm mt-1">Sign in to access order management</p>
            </div>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl mb-5 text-sm bg-red-50 border border-red-200 text-red-600">
              <AlertCircle size={16} className="flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-slate-700 text-xs font-semibold uppercase tracking-wider" htmlFor="email">
                Email Address
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="admin@gmail.com"
                  autoComplete="email"
                  className="w-full pl-10 pr-4 py-3 rounded-xl text-sm bg-slate-50 text-slate-900 placeholder-slate-400 border border-slate-200 outline-none transition-all focus:border-[#6C5CE7] focus:bg-white focus:ring-2 focus:ring-[#6C5CE7]/10"
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-slate-700 text-xs font-semibold uppercase tracking-wider" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  id="password"
                  type={showPass ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="w-full pl-10 pr-11 py-3 rounded-xl text-sm bg-slate-50 text-slate-900 placeholder-slate-400 border border-slate-200 outline-none transition-all focus:border-[#6C5CE7] focus:bg-white focus:ring-2 focus:ring-[#6C5CE7]/10"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(p => !p)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              id="admin-login-btn"
              type="submit"
              disabled={submitting}
              className="mt-2 w-full py-3.5 rounded-xl font-semibold text-sm text-white transition-all cursor-pointer shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
              style={{
                background: "linear-gradient(135deg, #1A1953, #6C5CE7)",
              }}
            >
              {submitting ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  Signing in...
                </span>
              ) : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
