import React, { useState, useEffect, useCallback, useRef } from "react";
import { Helmet } from "react-helmet-async";
import {
  Search, ChevronLeft, ChevronRight, Download, Upload,
  RefreshCw, CheckCircle2, Clock, XCircle, Package,
  X, AlertCircle, FileText, ChevronDown
} from "lucide-react";
import AdminLayout from "../../components/admin/AdminLayout";
import { api } from "../../lib/api";

const STATUS_COLORS = {
  pending:   { bg: "#fffbeb", color: "#b45309", border: "#fde68a" },
  confirmed: { bg: "#ecfdf5", color: "#047857", border: "#a7f3d0" },
  cancelled: { bg: "#fef2f2", color: "#b91c1c", border: "#fecaca" },
};

const STATUS_ICONS = {
  pending:   <Clock size={12} />,
  confirmed: <CheckCircle2 size={12} />,
  cancelled: <XCircle size={12} />,
};

const STATUS_LIST = ["pending", "confirmed", "cancelled"];

function StatusBadge({ status }) {
  const s = STATUS_COLORS[status] || STATUS_COLORS.pending;
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold capitalize shadow-2xs"
      style={{ background: s.bg, color: s.color, border: `1px solid ${s.border}` }}
    >
      {STATUS_ICONS[status]} {status}
    </span>
  );
}

function StatusDropdown({ orderId, currentStatus, onUpdate }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelect = async (status) => {
    if (status === currentStatus) { setOpen(false); return; }
    setLoading(true);
    try {
      const res = await api.patch(
        `/order/admin/${orderId}/status`,
        { status }
      );
      onUpdate(res.data.order);
    } catch (e) {
      alert(e?.response?.data?.message || "Failed to update status");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  const s = STATUS_COLORS[currentStatus] || STATUS_COLORS.pending;

  return (
    <div className="relative inline-block" ref={ref}>
      <button
        onClick={() => setOpen(p => !p)}
        disabled={loading}
        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold capitalize cursor-pointer transition-all disabled:opacity-60 shadow-2xs hover:shadow-xs"
        style={{ background: s.bg, color: s.color, border: `1px solid ${s.border}` }}
      >
        {loading ? <span className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" /> : STATUS_ICONS[currentStatus]}
        {currentStatus}
        <ChevronDown size={11} className="opacity-70" />
      </button>

      {open && (
        <div className="absolute left-0 top-full mt-1.5 z-30 bg-white border border-slate-200 rounded-xl p-1 min-w-[140px] shadow-xl">
          {STATUS_LIST.map(st => (
            <button
              key={st}
              onClick={() => handleSelect(st)}
              className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold capitalize rounded-lg transition-colors text-left cursor-pointer hover:bg-slate-100"
              style={{ color: st === currentStatus ? STATUS_COLORS[st].color : "#475569" }}
            >
              {STATUS_ICONS[st]}
              <span>{st}</span>
              {st === currentStatus && <CheckCircle2 size={12} className="ml-auto" style={{ color: STATUS_COLORS[st].color }} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── CSV Helpers ──────────────────────────────────────────────────────────────
function ordersToCSV(orders) {
  const headers = ["id", "productName", "qty", "fullName", "email", "phone", "address", "status", "createdAt"];
  const rows = orders.map(o =>
    headers.map(h => `"${String(o[h] ?? "").replace(/"/g, '""')}"`).join(",")
  );
  return [headers.join(","), ...rows].join("\n");
}

function parseCSV(text) {
  const lines = text.trim().split("\n");
  if (lines.length < 2) return [];
  const headers = lines[0].split(",").map(h => h.trim().replace(/^"|"$/g, ""));
  return lines.slice(1).map(line => {
    const values = [];
    let current = "";
    let inQuotes = false;
    for (const ch of line) {
      if (ch === '"') { inQuotes = !inQuotes; continue; }
      if (ch === "," && !inQuotes) { values.push(current); current = ""; continue; }
      current += ch;
    }
    values.push(current);
    const obj = {};
    headers.forEach((h, i) => { obj[h] = (values[i] ?? "").trim(); });
    return obj;
  });
}

// ─── Import Modal ─────────────────────────────────────────────────────────────
function ImportModal({ onClose, onSuccess }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const dropRef = useRef(null);

  const handleFile = (f) => {
    setError(""); setPreview([]); setResult(null);
    if (!f) return;
    if (!f.name.endsWith(".csv")) { setError("Please upload a CSV file"); return; }
    setFile(f);
    const reader = new FileReader();
    reader.onload = (e) => {
      const rows = parseCSV(e.target.result);
      setPreview(rows.slice(0, 5));
    };
    reader.readAsText(f);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  };

  const handleImport = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const rows = parseCSV(e.target.result);
          const res = await api.post(`/order/admin/import`, rows);
          setResult(res.data);
          onSuccess();
        } catch (err) {
          setError(err?.response?.data?.message || "Import failed");
        } finally {
          setLoading(false);
        }
      };
      reader.readAsText(file);
    } catch {
      setLoading(false);
      setError("Failed to read file");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="w-full max-w-2xl bg-white rounded-2xl p-6 border border-slate-200 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-5 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center">
              <Upload size={16} className="text-[#6C5CE7]" />
            </div>
            <h2 className="text-slate-900 font-bold text-lg">Import Orders from CSV</h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"><X size={20} /></button>
        </div>

        {!result ? (
          <>
            {/* Drop Zone */}
            <div
              ref={dropRef}
              onDragOver={e => e.preventDefault()}
              onDrop={handleDrop}
              onClick={() => document.getElementById("csv-file-input").click()}
              className="border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all mb-4 bg-slate-50 border-slate-300 hover:bg-slate-100/80 hover:border-[#6C5CE7]"
            >
              <FileText size={34} className="mx-auto mb-3 text-slate-400" />
              {file ? (
                <p className="text-[#1A1953] font-semibold text-sm">{file.name}</p>
              ) : (
                <>
                  <p className="text-slate-700 font-medium text-sm">Drag & drop your CSV file here</p>
                  <p className="text-slate-400 text-xs mt-1">or click to browse from device</p>
                </>
              )}
              <input id="csv-file-input" type="file" accept=".csv" className="hidden" onChange={e => handleFile(e.target.files[0])} />
            </div>

            <p className="text-slate-500 text-xs mb-4">
              Required columns: <span className="font-semibold text-slate-700">productName, qty, fullName, email, phone, address</span> — Optional: <span className="font-semibold text-slate-700">status</span>
            </p>

            {error && (
              <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl mb-4 text-xs bg-red-50 border border-red-200 text-red-600">
                <AlertCircle size={15} />{error}
              </div>
            )}

            {/* Preview */}
            {preview.length > 0 && (
              <div className="mb-5">
                <p className="text-slate-600 text-xs font-semibold mb-2">Data Preview (first {preview.length} rows)</p>
                <div className="overflow-x-auto rounded-xl border border-slate-200">
                  <table className="w-full text-xs bg-white">
                    <thead>
                      <tr className="bg-slate-100 border-b border-slate-200">
                        {Object.keys(preview[0]).slice(0, 6).map(h => (
                          <th key={h} className="px-3 py-2 text-left font-semibold text-slate-700 whitespace-nowrap">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {preview.map((row, i) => (
                        <tr key={i} className="hover:bg-slate-50">
                          {Object.values(row).slice(0, 6).map((v, j) => (
                            <td key={j} className="px-3 py-2 text-slate-600 truncate max-w-[120px]">{String(v)}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            <div className="flex gap-3 justify-end pt-3 border-t border-slate-100">
              <button onClick={onClose} className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 border border-slate-200 hover:bg-slate-100 transition-all cursor-pointer">Cancel</button>
              <button
                onClick={handleImport}
                disabled={!file || loading}
                className="px-5 py-2 rounded-xl text-xs font-semibold text-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
                style={{ background: "linear-gradient(135deg, #1A1953, #6C5CE7)" }}
              >
                {loading ? "Importing..." : "Import Orders"}
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-6">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 size={28} />
            </div>
            <p className="text-slate-900 font-bold text-lg mb-1">Import Successful!</p>
            <p className="text-slate-600 text-sm mb-2">{result.inserted} order(s) imported into database</p>
            {result.skipped > 0 && <p className="text-amber-600 text-xs mb-4 font-medium">{result.skipped} row(s) skipped due to missing required fields</p>}
            <button onClick={onClose} className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white cursor-pointer shadow-sm" style={{ background: "linear-gradient(135deg, #1A1953, #6C5CE7)" }}>Done</button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Dashboard Page ───────────────────────────────────────────────────────────
function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, confirmed: 0, cancelled: 0 });
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [exportLoading, setExportLoading] = useState(false);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page, limit });
      if (statusFilter !== "all") params.set("status", statusFilter);
      if (search) params.set("search", search);

      const res = await api.get(`/order/admin?${params}`);
      const d = res.data;
      setOrders(d.data);
      setTotal(d.total);
      setTotalPages(d.totalPages);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [page, limit, statusFilter, search]);

  const fetchStats = useCallback(async () => {
    try {
      const [all, pending, confirmed, cancelled] = await Promise.all([
        api.get(`/order/admin?page=1&limit=1`),
        api.get(`/order/admin?page=1&limit=1&status=pending`),
        api.get(`/order/admin?page=1&limit=1&status=confirmed`),
        api.get(`/order/admin?page=1&limit=1&status=cancelled`),
      ]);
      setStats({
        total: all.data.total,
        pending: pending.data.total,
        confirmed: confirmed.data.total,
        cancelled: cancelled.data.total,
      });
    } catch { /* ignore */ }
  }, []);

  useEffect(() => { fetchOrders(); }, [fetchOrders]);
  useEffect(() => { fetchStats(); }, [fetchStats]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearch(searchInput);
    setPage(1);
  };

  const handleFilterChange = (f) => {
    setStatusFilter(f);
    setPage(1);
  };

  const handleStatusUpdate = (updated) => {
    setOrders(prev => prev.map(o => o.id === updated.id ? updated : o));
    fetchStats();
  };

  const handleExport = async () => {
    setExportLoading(true);
    try {
      const params = new URLSearchParams();
      if (statusFilter !== "all") params.set("status", statusFilter);
      const res = await api.get(`/order/admin/export?${params}`);
      const csv = ordersToCSV(res.data.data);
      const blob = new Blob([csv], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `orders_${new Date().toISOString().slice(0, 10)}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } catch { alert("Export failed"); }
    finally { setExportLoading(false); }
  };

  const STAT_CARDS = [
    { label: "Total Orders",  value: stats.total,     color: "#1A1953", bg: "#f1f0fb", icon: <Package size={20} className="text-[#1A1953]" /> },
    { label: "Pending",       value: stats.pending,   color: "#d97706", bg: "#fffbeb", icon: <Clock size={20} className="text-amber-600" /> },
    { label: "Confirmed",     value: stats.confirmed, color: "#059669", bg: "#ecfdf5", icon: <CheckCircle2 size={20} className="text-emerald-600" /> },
    { label: "Cancelled",     value: stats.cancelled, color: "#dc2626", bg: "#fef2f2", icon: <XCircle size={20} className="text-rose-600" /> },
  ];

  const FILTER_TABS = [
    { key: "all", label: "All Orders" },
    { key: "pending",   label: "Pending" },
    { key: "confirmed", label: "Confirmed" },
    { key: "cancelled", label: "Cancelled" },
  ];

  return (
    <AdminLayout>
      <Helmet>
        <title>Admin Dashboard — Order Management</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      {/* Stats Section */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {STAT_CARDS.map(c => (
          <div
            key={c.label}
            className="rounded-2xl p-5 bg-white border border-slate-200 shadow-xs flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-slate-500 text-xs font-semibold">{c.label}</p>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: c.bg }}>
                {c.icon}
              </div>
            </div>
            <p className="text-3xl font-extrabold" style={{ color: c.color }}>{c.value}</p>
          </div>
        ))}
      </div>

      {/* Table Card Container */}
      <div className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 sm:p-5 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-slate-200 bg-slate-50/50">
          {/* Filter Tabs */}
          <div className="flex gap-1 p-1 bg-slate-200/60 rounded-xl flex-wrap">
            {FILTER_TABS.map(tab => (
              <button
                key={tab.key}
                onClick={() => handleFilterChange(tab.key)}
                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer"
                style={statusFilter === tab.key
                  ? { background: "linear-gradient(135deg, #1A1953, #6C5CE7)", color: "white", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }
                  : { color: "#475569" }
                }
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search & Actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
            {/* Search Box */}
            <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
              <div className="relative flex-1 sm:w-64">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchInput}
                  onChange={e => setSearchInput(e.target.value)}
                  placeholder="Search customer, phone..."
                  className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 outline-none focus:border-[#6C5CE7] focus:ring-1 focus:ring-[#6C5CE7]"
                />
              </div>
              <button type="submit" className="px-3 py-1.5 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-semibold transition-all cursor-pointer">
                Search
              </button>
              {(search || searchInput) && (
                <button type="button" onClick={() => { setSearch(""); setSearchInput(""); setPage(1); }} className="text-slate-400 hover:text-slate-600 cursor-pointer p-1">
                  <X size={15} />
                </button>
              )}
            </form>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => { fetchOrders(); fetchStats(); }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 cursor-pointer transition-all shadow-2xs"
              >
                <RefreshCw size={13} />
                <span>Refresh</span>
              </button>
              <button
                onClick={handleExport}
                disabled={exportLoading}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 cursor-pointer transition-all disabled:opacity-50 shadow-2xs"
              >
                <Download size={13} />
                <span>{exportLoading ? "Exporting..." : "Export"}</span>
              </button>
              <button
                onClick={() => setShowImport(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100 cursor-pointer transition-all shadow-2xs"
              >
                <Upload size={13} />
                <span>Import</span>
              </button>
            </div>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-200 text-slate-600 text-xs font-bold uppercase tracking-wider">
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">Qty</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Address</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
              {loading ? (
                <tr>
                  <td colSpan={8} className="px-4 py-14 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-7 h-7 border-2 border-[#1A1953] border-t-transparent rounded-full animate-spin" />
                      <span className="text-slate-500 font-medium">Fetching orders...</span>
                    </div>
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-14 text-center">
                    <Package size={36} className="mx-auto mb-2 text-slate-300" />
                    <p className="text-slate-500 font-semibold text-sm">No orders found</p>
                    <p className="text-slate-400 text-xs mt-0.5">Try adjusting your filters or search term</p>
                  </td>
                </tr>
              ) : orders.map((order, idx) => (
                <tr
                  key={order.id}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="px-4 py-3.5 text-slate-400 font-mono">
                    {(page - 1) * limit + idx + 1}
                  </td>
                  <td className="px-4 py-3.5">
                    <p className="font-bold text-slate-900">{order.fullName}</p>
                    <p className="text-slate-400 text-[11px]">{order.email}</p>
                  </td>
                  <td className="px-4 py-3.5 font-medium text-slate-800 whitespace-nowrap">{order.productName}</td>
                  <td className="px-4 py-3.5 font-semibold text-slate-900">{order.qty}</td>
                  <td className="px-4 py-3.5 font-mono text-slate-700 whitespace-nowrap">{order.phone}</td>
                  <td className="px-4 py-3.5 text-slate-600 max-w-[180px] truncate" title={order.address}>{order.address}</td>
                  <td className="px-4 py-3.5">
                    <StatusDropdown orderId={order.id} currentStatus={order.status} onUpdate={handleStatusUpdate} />
                  </td>
                  <td className="px-4 py-3.5 text-slate-400 whitespace-nowrap">
                    {new Date(order.createdAt).toLocaleDateString("en-BD", { day: "2-digit", month: "short", year: "numeric" })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Pagination */}
        <div className="px-5 py-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <p className="text-slate-500">
            Showing <span className="font-semibold text-slate-800">{orders.length > 0 ? (page - 1) * limit + 1 : 0}</span>–<span className="font-semibold text-slate-800">{Math.min(page * limit, total)}</span> of <span className="font-semibold text-slate-800">{total}</span> orders
          </p>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="text-slate-500">Per page:</span>
              <select
                value={limit}
                onChange={e => { setLimit(Number(e.target.value)); setPage(1); }}
                className="bg-white border border-slate-200 text-slate-700 rounded-lg px-2 py-1 outline-none cursor-pointer font-medium"
              >
                {[10, 25, 50].map(n => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 transition-all cursor-pointer shadow-2xs"
              >
                <ChevronLeft size={14} />
              </button>

              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let p;
                if (totalPages <= 5) p = i + 1;
                else if (page <= 3) p = i + 1;
                else if (page >= totalPages - 2) p = totalPages - 4 + i;
                else p = page - 2 + i;
                return (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg font-semibold transition-all cursor-pointer"
                    style={p === page
                      ? { background: "linear-gradient(135deg, #1A1953, #6C5CE7)", color: "white", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }
                      : { background: "white", color: "#475569", border: "1px solid #e2e8f0" }
                    }
                  >
                    {p}
                  </button>
                );
              })}

              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages || totalPages === 0}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 transition-all cursor-pointer shadow-2xs"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Import Modal */}
      {showImport && (
        <ImportModal
          onClose={() => setShowImport(false)}
          onSuccess={() => { fetchOrders(); fetchStats(); setShowImport(false); }}
        />
      )}
    </AdminLayout>
  );
}

export default Dashboard;