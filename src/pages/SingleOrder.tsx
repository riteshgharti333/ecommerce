import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ChevronLeft,
  Package,
  Truck,
  MapPin,
  Clock,
  CheckCircle2,
  ShoppingBag,
  Download,
  Share2,
  Copy,
  Check,
  ChevronRight,
  Phone,
  Mail,
  MessageCircle,
  RotateCcw,
  Star,
} from "lucide-react";

const SingleOrder = () => {
  const { id } = useParams();
  const [copied, setCopied] = useState(false);

  // Mock Order Data
  const order = {
    orderId: id || "ORD-2024-001234",
    orderDate: "March 15, 2024",
    estimatedDelivery: "March 18-20, 2024",
    status: "delivered",
    paymentMethod: "Credit Card •••• 3456",
    paymentStatus: "Paid",
    subtotal: 429.97,
    shipping: 0,
    tax: 34.4,
    discount: 20,
    total: 444.37,
    trackingNumber: "TRK123456789",
    carrier: "FedEx Express",
  };

  const orderItems = [
    {
      id: 1,
      title: "Premium Wireless Noise-Canceling Headphones",
      color: "Black",
      size: "M",
      quantity: 1,
      price: 249.99,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop",
      status: "delivered",
    },
    {
      id: 2,
      title: "Wireless Earbuds Pro",
      color: "White",
      size: "One Size",
      quantity: 2,
      price: 89.99,
      image:
        "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=200&h=200&fit=crop",
      status: "delivered",
    },
  ];

  const shippingAddress = {
    fullName: "John Doe",
    phone: "+1 (555) 123-4567",
    street: "123 Main Street, Apt 4B",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    country: "United States",
  };

  const timeline = [
    {
      status: "Order Placed",
      date: "March 15, 2024 - 2:30 PM",
      completed: true,
      icon: ShoppingBag,
    },
    {
      status: "Confirmed",
      date: "March 15, 2024 - 2:35 PM",
      completed: true,
      icon: CheckCircle2,
    },
    {
      status: "Processing",
      date: "March 16, 2024 - 9:00 AM",
      completed: true,
      icon: Package,
    },
    {
      status: "Shipped",
      date: "March 17, 2024 - 3:00 PM",
      completed: true,
      icon: Truck,
    },
    {
      status: "Delivered",
      date: "March 18, 2024 - 11:30 AM",
      completed: true,
      current: true,
      icon: MapPin,
    },
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const copyOrderId = () => {
    navigator.clipboard.writeText(order.orderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[var(--background)] pt-5 sm:pt-10 pb-12 sm:pb-16">
      <div className="max-w-7xl mx-auto px-1 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs sm:text-sm text-[var(--text-muted)] mb-6">
          <Link
            to="/"
            className="hover:text-[var(--primary)] transition-colors"
          >
            Home
          </Link>
          <span>›</span>
          <Link
            to="/orders"
            className="hover:text-[var(--primary)] transition-colors"
          >
            My Orders
          </Link>
          <span>›</span>
          <span className="text-[var(--text)] font-medium">
            {order.orderId}
          </span>
        </nav>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-xl sm:text-2xl font-bold text-[var(--text)]">
                {order.orderId}
              </h1>
              <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full bg-green-100 text-green-700">
                <CheckCircle2 size={12} />
                {order.status === "delivered" ? "Delivered" : order.status}
              </span>
            </div>
            <p className="text-sm text-[var(--text-muted)]">
              Placed on {order.orderDate}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[var(--border)] text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--surface)] transition-colors">
              <Download size={16} />
              Invoice
            </button>
            <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[var(--border)] text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--surface)] transition-colors">
              <Share2 size={16} />
              Share
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Items */}
            <div className="bg-[var(--surface)] rounded-xl border border-[var(--border)] overflow-hidden">
              <div className="p-4 sm:p-5 border-b border-[var(--border)]">
                <h2 className="text-base font-semibold text-[var(--text)]">
                  Items ({orderItems.length})
                </h2>
              </div>
              <div className="divide-y divide-[var(--border)]">
                {orderItems.map((item) => (
                  <div key={item.id} className="p-4 sm:p-5 flex gap-4">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg bg-[var(--background)] overflow-hidden flex-shrink-0 border border-[var(--border)]">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <Link
                        to={`/product/${item.id}`}
                        className="text-sm font-medium text-[var(--text)] hover:text-[var(--primary)] transition-colors line-clamp-1"
                      >
                        {item.title}
                      </Link>
                      <p className="text-xs text-[var(--text-muted)] mt-0.5">
                        {item.color} · {item.size}
                      </p>
                      <p className="text-xs text-[var(--text-muted)] mt-0.5">
                        Qty: {item.quantity}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                          {item.status}
                        </span>
                        <span className="text-sm font-semibold text-[var(--text)]">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Timeline */}
            <div className="bg-[var(--surface)] rounded-xl border border-[var(--border)] p-4 sm:p-5">
              <h2 className="text-base font-semibold text-[var(--text)] mb-6">
                Order Status
              </h2>

              <div className="relative">
                {timeline.map((item, index) => (
                  <div key={index} className="flex gap-3 sm:gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${
                          item.completed
                            ? "bg-[var(--primary)] text-white"
                            : item.current
                              ? "border-2 border-[var(--primary)] bg-[var(--primary)]/5 text-[var(--primary)]"
                              : "bg-gray-100 text-[var(--text-muted)]"
                        }`}
                      >
                        <item.icon size={16} />
                      </div>
                      {index < timeline.length - 1 && (
                        <div
                          className={`w-0.5 flex-1 min-h-[28px] ${
                            item.completed
                              ? "bg-[var(--primary)]"
                              : "bg-gray-200"
                          }`}
                        />
                      )}
                    </div>
                    <div
                      className={`pb-6 ${index === timeline.length - 1 ? "pb-0" : ""}`}
                    >
                      <p
                        className={`text-sm font-semibold ${
                          item.current
                            ? "text-[var(--primary)]"
                            : item.completed
                              ? "text-[var(--text)]"
                              : "text-[var(--text-muted)]"
                        }`}
                      >
                        {item.status}
                      </p>
                      <p className="text-xs text-[var(--text-muted)] mt-0.5">
                        {item.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tracking Info */}
            <div className="bg-[var(--surface)] rounded-xl border border-[var(--border)] p-4 sm:p-5">
              <h2 className="text-base font-semibold text-[var(--text)] mb-4">
                Tracking Information
              </h2>

              <div className="bg-[var(--background)] rounded-lg border border-[var(--border)] p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] sm:text-xs text-[var(--text-muted)] mb-1">
                      Carrier
                    </p>
                    <p className="text-sm font-medium text-[var(--text)]">
                      {order.carrier}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] sm:text-xs text-[var(--text-muted)] mb-1">
                      Tracking Number
                    </p>
                    <p className="text-sm font-mono font-medium text-[var(--primary)]">
                      {order.trackingNumber}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] sm:text-xs text-[var(--text-muted)] mb-1">
                      Estimated Delivery
                    </p>
                    <p className="text-sm font-medium text-[var(--text)]">
                      {order.estimatedDelivery}
                    </p>
                  </div>
                  <div className="flex items-end">
                    <button className="text-sm font-medium text-[var(--primary)] hover:opacity-80 transition-opacity flex items-center gap-1">
                      Track Package <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Sidebar */}
          <div className="space-y-6">
            {/* Price Summary */}
            <div className="bg-[var(--surface)] rounded-xl border border-[var(--border)] p-4 sm:p-5">
              <h2 className="text-base font-semibold text-[var(--text)] mb-4">
                Price Summary
              </h2>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--text-secondary)]">Subtotal</span>
                  <span className="text-[var(--text)] font-medium">
                    {formatPrice(order.subtotal)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--text-secondary)]">Shipping</span>
                  <span className="text-green-600 font-medium">FREE</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--text-secondary)]">Tax</span>
                  <span className="text-[var(--text)] font-medium">
                    {formatPrice(order.tax)}
                  </span>
                </div>
                {order.discount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Discount</span>
                    <span className="font-medium">
                      -{formatPrice(order.discount)}
                    </span>
                  </div>
                )}
              </div>

              <div className="border-t border-[var(--border)] pt-3">
                <div className="flex justify-between items-baseline">
                  <span className="text-sm font-semibold text-[var(--text)]">
                    Total
                  </span>
                  <span className="text-xl font-bold text-[var(--text)]">
                    {formatPrice(order.total)}
                  </span>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-[var(--surface)] rounded-xl border border-[var(--border)] p-4 sm:p-5">
              <h2 className="text-base font-semibold text-[var(--text)] mb-3 flex items-center gap-2">
                <MapPin size={16} className="text-[var(--text-secondary)]" />
                Shipping Address
              </h2>
              <div className="bg-[var(--background)] rounded-lg border border-[var(--border)] p-3">
                <p className="text-sm font-semibold text-[var(--text)]">
                  {shippingAddress.fullName}
                </p>
                <p className="text-xs text-[var(--text-muted)] mt-0.5">
                  {shippingAddress.phone}
                </p>
                <p className="text-xs text-[var(--text-muted)] mt-1">
                  {shippingAddress.street}, {shippingAddress.city}
                </p>
                <p className="text-xs text-[var(--text-muted)]">
                  {shippingAddress.state} {shippingAddress.zipCode},{" "}
                  {shippingAddress.country}
                </p>
              </div>
            </div>

            {/* Payment Info */}
            <div className="bg-[var(--surface)] rounded-xl border border-[var(--border)] p-4 sm:p-5">
              <h2 className="text-base font-semibold text-[var(--text)] mb-3">
                Payment
              </h2>
              <div className="bg-[var(--background)] rounded-lg border border-[var(--border)] p-3">
                <p className="text-sm font-medium text-[var(--text)]">
                  {order.paymentMethod}
                </p>
                <p className="text-xs text-green-600 font-medium mt-0.5">
                  {order.paymentStatus}
                </p>
              </div>
            </div>

            {/* Need Help */}
            <div className="bg-[var(--surface)] rounded-xl border border-[var(--border)] p-4 sm:p-5">
              <h2 className="text-base font-semibold text-[var(--text)] mb-3">
                Need Help?
              </h2>
              <div className="space-y-1">
                <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-[var(--text-secondary)] hover:bg-[var(--background)] transition-colors">
                  <Phone size={14} />
                  Call Support
                </button>
                <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-[var(--text-secondary)] hover:bg-[var(--background)] transition-colors">
                  <Mail size={14} />
                  Email Us
                </button>
                <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-[var(--text-secondary)] hover:bg-[var(--background)] transition-colors">
                  <MessageCircle size={14} />
                  Live Chat
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2">
              <Link
                to="/orders"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg border border-[var(--border)] text-sm font-medium text-[var(--text)] hover:bg-[var(--surface)] transition-colors"
              >
                <ChevronLeft size={16} />
                Back to Orders
              </Link>
              <button className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg border border-[var(--border)] text-sm font-medium text-[var(--text)] hover:bg-[var(--surface)] transition-colors">
                <RotateCcw size={16} />
                Return Items
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleOrder;
