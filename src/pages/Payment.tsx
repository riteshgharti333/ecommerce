import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  CreditCard,
  Smartphone,
  Building2,
  Wallet,
  Banknote,
  Clock,
  ShieldCheck,
  Check,
  X,
  Tag,
  Truck,
  Home,
  Pencil,
  ChevronRight,
  Lock,
  CheckCircle2,
  Package,
  ArrowRight,
} from "lucide-react";

const Payment = () => {
  const navigate = useNavigate();
  
  // Payment method state
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardForm, setCardForm] = useState({
    cardNumber: "",
    cardholderName: "",
    expiryDate: "",
    cvv: "",
    saveCard: false,
  });
  
  // Other states
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState("");
  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [billingAddress, setBillingAddress] = useState({
    fullName: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
  });
  const [showOrderConfirm, setShowOrderConfirm] = useState(false);

  // Mock data
  const orderItems = [
    {
      id: 1,
      title: "Premium Wireless Headphones",
      color: "Black",
      size: "M",
      quantity: 1,
      price: 249.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop",
    },
    {
      id: 2,
      title: "Wireless Earbuds Pro",
      color: "White",
      size: "One Size",
      quantity: 2,
      price: 89.99,
      image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=100&h=100&fit=crop",
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
    type: "home",
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const discount = promoApplied ? 20 : 0;
  const total = subtotal + shipping + tax - discount;

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === "SAVE20") {
      setPromoApplied(true);
      setPromoError("");
    } else {
      setPromoApplied(false);
      setPromoError("Invalid promo code");
    }
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 16) value = value.slice(0, 16);
    value = value.replace(/(\d{4})/g, "$1 ").trim();
    setCardForm({ ...cardForm, cardNumber: value });
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 4) value = value.slice(0, 4);
    if (value.length > 2) value = value.slice(0, 2) + "/" + value.slice(2);
    setCardForm({ ...cardForm, expiryDate: value });
  };

  const handlePlaceOrder = () => {
    setShowOrderConfirm(true);
    setTimeout(() => {
      setShowOrderConfirm(false);
      navigate("/orders");
    }, 3000);
  };

  const paymentMethods = [
    { id: "card", label: "Credit/Debit Card", icon: CreditCard },
    { id: "upi", label: "UPI", icon: Smartphone },
    { id: "netbanking", label: "Net Banking", icon: Building2 },
    { id: "wallet", label: "Wallets", icon: Wallet },
    { id: "cod", label: "Cash on Delivery", icon: Banknote },
    { id: "emi", label: "EMI / Pay Later", icon: Clock },
  ];

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <div className="bg-[var(--surface)] border-b border-[var(--border)] sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <Link
              to="/checkout"
              className="flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text)] transition-colors"
            >
              <ChevronLeft size={18} />
              <span className="hidden sm:inline">Back to Address</span>
            </Link>
            <h1 className="text-base sm:text-lg font-semibold text-[var(--text)]">
              Payment
            </h1>
            <div className="w-16" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-1 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-2 mb-6 sm:mb-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center text-xs">
              <Check size={12} />
            </div>
            <span className="text-xs sm:text-sm text-green-600">Address</span>
          </div>
          <div className="w-8 sm:w-12 h-0.5 bg-green-500" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[var(--primary)] text-white flex items-center justify-center text-sm font-medium">
              2
            </div>
            <span className="text-sm font-medium text-[var(--text)]">Payment</span>
          </div>
          <div className="w-8 sm:w-12 h-0.5 bg-gray-300" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gray-200 text-[var(--text-muted)] flex items-center justify-center text-sm font-medium">
              3
            </div>
            <span className="text-sm text-[var(--text-muted)]">Confirm</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Payment Details */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Payment Methods */}
            <div className="bg-[var(--surface)] rounded-xl sm:rounded-2xl shadow-sm border border-[var(--border)] p-4 sm:p-6">
              <h2 className="text-lg font-semibold text-[var(--text)] mb-4">
                Payment Method
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id)}
                    className={`flex flex-col items-center gap-1.5 p-3 rounded-lg border-2 transition-all ${
                      paymentMethod === method.id
                        ? "border-[var(--primary)] bg-[var(--primary)]/5 text-[var(--primary)]"
                        : "border-[var(--border)] text-[var(--text-secondary)] hover:border-gray-400"
                    }`}
                  >
                    <method.icon size={20} />
                    <span className="text-[10px] sm:text-xs font-medium text-center">
                      {method.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Card Payment Form */}
            {paymentMethod === "card" && (
              <div className="bg-[var(--surface)] rounded-xl sm:rounded-2xl shadow-sm border border-[var(--border)] p-4 sm:p-6">
                <h2 className="text-lg font-semibold text-[var(--text)] mb-4">
                  Card Details
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-[var(--text)] mb-1.5">
                      Card Number
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={cardForm.cardNumber}
                        onChange={handleCardNumberChange}
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--background)] text-sm text-[var(--text)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)]"
                      />
                      <CreditCard size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[var(--text)] mb-1.5">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      value={cardForm.cardholderName}
                      onChange={(e) => setCardForm({ ...cardForm, cardholderName: e.target.value })}
                      placeholder="John Doe"
                      className="w-full px-3 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--background)] text-sm text-[var(--text)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[var(--text)] mb-1.5">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        value={cardForm.expiryDate}
                        onChange={handleExpiryChange}
                        placeholder="MM/YY"
                        maxLength={5}
                        className="w-full px-3 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--background)] text-sm text-[var(--text)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[var(--text)] mb-1.5">
                        CVV
                      </label>
                      <input
                        type="password"
                        value={cardForm.cvv}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, "").slice(0, 3);
                          setCardForm({ ...cardForm, cvv: value });
                        }}
                        placeholder="***"
                        maxLength={3}
                        className="w-full px-3 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--background)] text-sm text-[var(--text)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)]"
                      />
                    </div>
                  </div>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={cardForm.saveCard}
                      onChange={(e) => setCardForm({ ...cardForm, saveCard: e.target.checked })}
                      className="w-4 h-4 rounded border-gray-300 text-[var(--primary)] focus:ring-[var(--primary)]"
                    />
                    <span className="text-xs text-[var(--text-secondary)]">
                      Save card for future payments
                    </span>
                  </label>
                </div>
              </div>
            )}

            {/* Promo Code */}
            <div className="bg-[var(--surface)] rounded-xl sm:rounded-2xl shadow-sm border border-[var(--border)] p-4 sm:p-6">
              <h2 className="text-lg font-semibold text-[var(--text)] mb-4 flex items-center gap-2">
                <Tag size={18} />
                Promo Code
              </h2>
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => {
                      setPromoCode(e.target.value);
                      setPromoError("");
                      if (promoApplied) {
                        setPromoApplied(false);
                      }
                    }}
                    placeholder="Enter promo code"
                    className="w-full px-3 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--background)] text-sm text-[var(--text)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)]"
                  />
                  {promoApplied && (
                    <Check size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500" />
                  )}
                </div>
                <button
                  onClick={handleApplyPromo}
                  disabled={!promoCode || promoApplied}
                  className="px-4 py-2.5 bg-[var(--primary)] text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Apply
                </button>
              </div>
              {promoError && (
                <p className="text-xs text-red-500 mt-1.5">{promoError}</p>
              )}
              {promoApplied && (
                <p className="text-xs text-green-600 mt-1.5">
                  Promo "SAVE20" applied! You saved $20.00
                </p>
              )}
            </div>

            {/* Billing Address */}
            <div className="bg-[var(--surface)] rounded-xl sm:rounded-2xl shadow-sm border border-[var(--border)] p-4 sm:p-6">
              <h2 className="text-lg font-semibold text-[var(--text)] mb-4">
                Billing Address
              </h2>
              
              <label className="flex items-center gap-2 mb-4 cursor-pointer">
                <input
                  type="checkbox"
                  checked={sameAsShipping}
                  onChange={(e) => setSameAsShipping(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-[var(--primary)] focus:ring-[var(--primary)]"
                />
                <span className="text-sm text-[var(--text-secondary)]">
                  Same as shipping address
                </span>
              </label>

              {!sameAsShipping && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[var(--text)] mb-1.5">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={billingAddress.fullName}
                        onChange={(e) => setBillingAddress({ ...billingAddress, fullName: e.target.value })}
                        placeholder="John Doe"
                        className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] text-sm text-[var(--text)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[var(--text)] mb-1.5">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={billingAddress.phone}
                        onChange={(e) => setBillingAddress({ ...billingAddress, phone: e.target.value })}
                        placeholder="+1 (555) 000-0000"
                        className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] text-sm text-[var(--text)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[var(--text)] mb-1.5">
                      Street Address
                    </label>
                    <input
                      type="text"
                      value={billingAddress.street}
                      onChange={(e) => setBillingAddress({ ...billingAddress, street: e.target.value })}
                      placeholder="123 Main Street"
                      className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] text-sm text-[var(--text)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)]"
                    />
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[var(--text)] mb-1.5">
                        City
                      </label>
                      <input
                        type="text"
                        value={billingAddress.city}
                        onChange={(e) => setBillingAddress({ ...billingAddress, city: e.target.value })}
                        placeholder="New York"
                        className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] text-sm text-[var(--text)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[var(--text)] mb-1.5">
                        State
                      </label>
                      <input
                        type="text"
                        value={billingAddress.state}
                        onChange={(e) => setBillingAddress({ ...billingAddress, state: e.target.value })}
                        placeholder="NY"
                        className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] text-sm text-[var(--text)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)]"
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-xs font-medium text-[var(--text)] mb-1.5">
                        ZIP Code
                      </label>
                      <input
                        type="text"
                        value={billingAddress.zipCode}
                        onChange={(e) => setBillingAddress({ ...billingAddress, zipCode: e.target.value })}
                        placeholder="10001"
                        className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] text-sm text-[var(--text)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {sameAsShipping && (
                <div className="p-3 bg-[var(--background)] rounded-lg border border-[var(--border)]">
                  <div className="flex items-start gap-2">
                    <Home size={14} className="text-[var(--text-secondary)] mt-0.5" />
                    <div>
                      <p className="text-xs font-medium text-[var(--text)]">
                        {shippingAddress.fullName}
                      </p>
                      <p className="text-[10px] text-[var(--text-secondary)]">
                        {shippingAddress.street}, {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Security Indicators */}
            <div className="bg-[var(--surface)] rounded-xl sm:rounded-2xl shadow-sm border border-[var(--border)] p-4 sm:p-6">
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck size={18} className="text-green-600" />
                <span className="text-sm font-medium text-[var(--text)]">
                  Secure Payment
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs text-[var(--text-muted)]">
                <div className="flex items-center gap-1">
                  <Lock size={10} />
                  <span>SSL Encrypted</span>
                </div>
                <div className="flex items-center gap-1">
                  <ShieldCheck size={10} />
                  <span>Your payment is encrypted</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-[var(--surface)] rounded-xl sm:rounded-2xl shadow-sm border border-[var(--border)] p-4 sm:p-6 sticky top-20">
              <h2 className="text-lg font-semibold text-[var(--text)] mb-4">
                Order Summary
              </h2>

              {/* Order Items */}
              <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                {orderItems.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="w-14 h-14 rounded-lg bg-[var(--background)] overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-[var(--text)] line-clamp-1">
                        {item.title}
                      </p>
                      <p className="text-[10px] text-[var(--text-muted)]">
                        {item.color} / {item.size}
                      </p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-[10px] text-[var(--text-muted)]">
                          Qty: {item.quantity}
                        </span>
                        <span className="text-xs font-medium text-[var(--text)]">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Shipping Address Summary */}
              <div className="border-t border-[var(--border)] pt-3 mb-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-[var(--text)]">Delivery Address</span>
                  <Link
                    to="/checkout"
                    className="text-[10px] text-[var(--primary)] hover:underline flex items-center gap-0.5"
                  >
                    <Pencil size={10} />
                    Edit
                  </Link>
                </div>
                <div className="p-2 bg-[var(--background)] rounded-lg border border-[var(--border)]">
                  <div className="flex items-start gap-1.5">
                    <Home size={12} className="text-[var(--text-muted)] mt-0.5 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-[10px] font-medium text-[var(--text)]">
                        {shippingAddress.fullName}
                      </p>
                      <p className="text-[10px] text-[var(--text-muted)]">
                        {shippingAddress.street}, {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}
                      </p>
                      <p className="text-[10px] text-[var(--text-muted)]">
                        {shippingAddress.phone}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-[var(--border)] pt-3 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-[var(--text-secondary)]">Subtotal</span>
                  <span className="text-[var(--text)]">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-[var(--text-secondary)]">Shipping</span>
                  <span className={shipping === 0 ? "text-green-600" : "text-[var(--text)]"}>
                    {shipping === 0 ? "Free" : formatPrice(shipping)}
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-[var(--text-secondary)]">Tax (8%)</span>
                  <span className="text-[var(--text)]">{formatPrice(tax)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-xs">
                    <span className="text-green-600">Discount</span>
                    <span className="text-green-600">-{formatPrice(discount)}</span>
                  </div>
                )}
              </div>

              <div className="border-t border-[var(--border)] pt-3 mt-3">
                <div className="flex justify-between items-baseline">
                  <span className="text-sm font-semibold text-[var(--text)]">Total</span>
                  <span className="text-xl font-bold text-[var(--text)]">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>

              {/* Place Order Button */}
              <button
                onClick={handlePlaceOrder}
                className="w-full mt-4 bg-[var(--primary)] text-white py-3 rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-lg shadow-[var(--primary)]/20 text-sm sm:text-base"
              >
                <Lock size={16} />
                Pay {formatPrice(total)}
              </button>

              <p className="text-[10px] text-[var(--text-muted)] text-center mt-2">
                By placing your order, you agree to our Terms & Conditions
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Order Confirmation Modal */}
      {showOrderConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-[var(--surface)] rounded-2xl p-6 sm:p-8 max-w-sm w-full text-center animate-in zoom-in duration-300">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={32} className="text-green-600" />
            </div>
            <h2 className="text-xl font-bold text-[var(--text)] mb-2">
              Order Confirmed!
            </h2>
            <p className="text-sm text-[var(--text-secondary)] mb-1">
              Your order has been placed successfully
            </p>
            <p className="text-xs text-[var(--text-muted)] mb-4">
              Order #ORD-2024-001234
            </p>
            <div className="flex items-center justify-center gap-2 text-xs text-[var(--primary)]">
              <Package size={14} />
              <span>Redirecting to order details...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payment;
