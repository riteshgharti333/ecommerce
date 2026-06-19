import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Package,
  ChevronRight,
  Search,
  Truck,
  Clock,
  CheckCircle2,
  XCircle,
  ShoppingBag,
  Star,
  Sparkles,
  X,
  SlidersHorizontal,
} from "lucide-react";
import ProductCards from "../components/ProductCards";

const Orders = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const orders = [
    {
      id: "ORD-2024-001234",
      date: "March 15, 2024",
      status: "delivered",
      total: 444.37,
      items: 3,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop",
      tracking: "TRK123456789",
      productName: "Premium Wireless Headphones + 2 more",
    },
    {
      id: "ORD-2024-001233",
      date: "March 10, 2024",
      status: "shipped",
      total: 249.99,
      items: 1,
      image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=100&h=100&fit=crop",
      tracking: "TRK123456788",
      productName: "Wireless Earbuds Pro",
    },
    {
      id: "ORD-2024-001232",
      date: "March 5, 2024",
      status: "processing",
      total: 179.98,
      items: 2,
      image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=100&h=100&fit=crop",
      tracking: null,
      productName: "Portable Power Bank + USB-C Hub",
    },
    {
      id: "ORD-2024-001231",
      date: "Feb 28, 2024",
      status: "cancelled",
      total: 89.99,
      items: 1,
      image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=100&h=100&fit=crop",
      tracking: null,
      productName: "Smart Watch Series 5",
    },
  ];

  const statusConfig = {
    processing: { label: "Processing", icon: Clock, textColor: "text-amber-600", bgColor: "bg-amber-50" },
    shipped: { label: "Shipped", icon: Truck, textColor: "text-blue-600", bgColor: "bg-blue-50" },
    delivered: { label: "Delivered", icon: CheckCircle2, textColor: "text-green-600", bgColor: "bg-green-50" },
    cancelled: { label: "Cancelled", icon: XCircle, textColor: "text-red-600", bgColor: "bg-red-50" },
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(price);
  };

  const filteredOrders = orders.filter((order) => {
    const matchesTab = activeTab === "all" || order.status === activeTab;
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const statusFilters = [
    { id: "all", label: "All Orders", count: orders.length },
    { id: "processing", label: "Processing", count: orders.filter((o) => o.status === "processing").length },
    { id: "shipped", label: "Shipped", count: orders.filter((o) => o.status === "shipped").length },
    { id: "delivered", label: "Delivered", count: orders.filter((o) => o.status === "delivered").length },
    { id: "cancelled", label: "Cancelled", count: orders.filter((o) => o.status === "cancelled").length },
  ];

  const FilterContent = () => (
    <div>
      <h3 className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-3">
        Order Status
      </h3>
      <div className="space-y-1">
        {statusFilters.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setActiveTab(item.id);
              setMobileFilterOpen(false);
            }}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-all ${
              activeTab === item.id
                ? "bg-[var(--primary)]/5 text-[var(--primary)] font-medium"
                : "text-[var(--text-secondary)] hover:bg-[var(--background)]"
            }`}
          >
            <span>{item.label}</span>
            <span className={`text-xs px-1.5 py-0.5 rounded-full ${
              activeTab === item.id
                ? "bg-[var(--primary)] text-white"
                : "bg-gray-100 text-[var(--text-muted)]"
            }`}>
              {item.count}
            </span>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[var(--background)] pt-5 sm:pt-10 pb-12 sm:pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] mb-4">
          <Link to="/" className="hover:text-[var(--primary)] transition-colors">Home</Link>
          <span>›</span>
          <span className="text-[var(--text)] font-medium">My Orders</span>
        </nav>

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text)]">My Orders</h1>
          <p className="text-sm text-[var(--text-muted)] mt-1">Track and manage your orders</p>
        </div>

        {/* MAIN LAYOUT */}
        <div className="flex gap-6">
          
          {/* LEFT - FILTER SIDEBAR (Desktop only) */}
          <div className="w-56 flex-shrink-0 hidden lg:block">
            <div className="bg-[var(--surface)] rounded-xl border border-[var(--border)] p-4 sticky top-24">
              <FilterContent />
            </div>
          </div>

          {/* RIGHT - CONTENT */}
          <div className="flex-1 min-w-0">
            
            {/* Search + Filter Row */}
            <div className="flex gap-3 mb-6">
              <div className="relative flex-1">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by order ID..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-sm text-[var(--text)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)]"
                />
              </div>
              {/* Mobile Filter Button */}
              <button
                onClick={() => setMobileFilterOpen(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-2.5 border border-[var(--border)] rounded-lg text-sm font-medium text-[var(--text-secondary)] bg-[var(--surface)] hover:bg-[var(--background)] transition-colors flex-shrink-0"
              >
                <SlidersHorizontal size={16} />
                Filter
              </button>
            </div>

            {/* Active Filter Pill */}
            {activeTab !== "all" && (
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs text-[var(--text-muted)]">Status:</span>
                <button
                  onClick={() => setActiveTab("all")}
                  className="inline-flex items-center gap-1.5 text-xs pl-2.5 pr-1.5 py-1 rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-colors group"
                >
                  {statusFilters.find(f => f.id === activeTab)?.label}
                  <X size={12} className="group-hover:text-red-500" />
                </button>
              </div>
            )}

            {/* ORDERS LIST */}
            <div className="mb-10">
              <h2 className="text-lg font-semibold text-[var(--text)] mb-4">
                Orders ({filteredOrders.length})
              </h2>

              {filteredOrders.length > 0 ? (
                <div className="space-y-3">
                  {filteredOrders.map((order) => {
                    const status = statusConfig[order.status as keyof typeof statusConfig];
                    const StatusIcon = status.icon;

                    return (
                      <Link
                        key={order.id}
                        to={`/order/${order.id}`}
                        className="block bg-[var(--surface)] rounded-xl border border-[var(--border)] overflow-hidden hover:border-[var(--primary)]/30 hover:shadow-sm transition-all group"
                      >
                        <div className="p-4 sm:p-5">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-sm font-semibold text-[var(--text)]">{order.id}</span>
                                <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${status.bgColor} ${status.textColor}`}>
                                  <StatusIcon size={12} />
                                  {status.label}
                                </span>
                              </div>
                              <p className="text-xs text-[var(--text-muted)]">{order.date}</p>
                            </div>
                            <span className="text-lg font-bold text-[var(--text)]">{formatPrice(order.total)}</span>
                          </div>

                          <div className="flex items-center gap-3 pt-3 border-t border-[var(--border)]">
                            <div className="w-12 h-12 rounded-lg bg-[var(--background)] overflow-hidden flex-shrink-0">
                              <img src={order.image} alt={order.productName} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-[var(--text)] truncate">{order.productName}</p>
                              <p className="text-xs text-[var(--text-muted)] mt-0.5">
                                {order.items} {order.items === 1 ? "item" : "items"}
                                {order.tracking && ` • ${order.tracking}`}
                              </p>
                            </div>
                            <ChevronRight size={18} className="text-[var(--text-muted)] group-hover:text-[var(--primary)] group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-16">
                  <Package size={48} className="text-[var(--text-muted)] mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-[var(--text)] mb-2">No orders found</h3>
                  <p className="text-sm text-[var(--text-muted)] mb-6">Try adjusting your filters</p>
                  <button
                    onClick={() => { setActiveTab("all"); setSearchQuery(""); }}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--primary)] text-white rounded-lg font-medium text-sm hover:opacity-90 transition-opacity"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>

            {/* PRODUCTS */}
            <div className="border-t-2 border-[var(--border)] pt-8">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles size={18} className="text-[var(--primary)]" />
                <h2 className="text-lg font-semibold text-[var(--text)]">You Might Also Like</h2>
              </div>
              <ProductCards />
            </div>
          </div>
        </div>
      </div>

      {/* ========== MOBILE FULL-SCREEN FILTER PANEL ========== */}
      {mobileFilterOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-[var(--background)] flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)] bg-[var(--surface)]">
            <button onClick={() => setMobileFilterOpen(false)} className="p-1">
              <X size={20} className="text-[var(--text)]" />
            </button>
            <h2 className="text-base font-semibold text-[var(--text)]">Filter</h2>
            {activeTab !== "all" ? (
              <button 
                onClick={() => { setActiveTab("all"); setMobileFilterOpen(false); }} 
                className="text-sm font-medium text-red-500"
              >
                Clear
              </button>
            ) : (
              <div className="w-10" />
            )}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-4 py-6">
            <FilterContent />
          </div>

          {/* Bottom Buttons */}
          <div className="px-4 py-3 border-t border-[var(--border)] bg-[var(--surface)] flex gap-3">
            <button
              onClick={() => setMobileFilterOpen(false)}
              className="flex-1 py-3 border border-[var(--border)] text-[var(--text)] rounded-lg font-medium text-sm"
            >
              Close
            </button>
            <button
              onClick={() => setMobileFilterOpen(false)}
              className="flex-1 py-3 bg-[var(--primary)] text-white rounded-lg font-medium text-sm"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;