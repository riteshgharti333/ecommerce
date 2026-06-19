import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronLeft,
  Plus,
  MapPin,
  Home,
  Building,
  Check,
  Pencil,
  Trash2,
  CreditCard,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { paymentLists } from "../assets/data/paymentIcon";

const Checkout = () => {
  const [selectedAddress, setSelectedAddress] = useState(0);
  const [showAddAddress, setShowAddAddress] = useState(false);

  // Address form state
  const [addressForm, setAddressForm] = useState({
    fullName: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
    type: "home",
  });

  // Mock saved addresses
  const [savedAddresses, setSavedAddresses] = useState([
    {
      id: 1,
      fullName: "John Doe",
      phone: "+1 (555) 123-4567",
      street: "123 Main Street, Apt 4B",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "United States",
      type: "home",
    },
    {
      id: 2,
      fullName: "John Doe",
      phone: "+1 (555) 987-6543",
      street: "456 Business Ave, Suite 200",
      city: "San Francisco",
      state: "CA",
      zipCode: "94105",
      country: "United States",
      type: "work",
    },
  ]);

  // Mock order items
  const orderItems = [
    {
      id: 1,
      title: "Premium Wireless Headphones",
      color: "Black",
      size: "M",
      quantity: 1,
      price: 249.99,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop",
    },
    {
      id: 2,
      title: "Wireless Earbuds Pro",
      color: "White",
      size: "One Size",
      quantity: 2,
      price: 89.99,
      image:
        "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=100&h=100&fit=crop",
    },
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const subtotal = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    const newAddress = {
      id: savedAddresses.length + 1,
      ...addressForm,
    };
    setSavedAddresses([...savedAddresses, newAddress]);
    setSelectedAddress(savedAddresses.length);
    setShowAddAddress(false);
    setAddressForm({
      fullName: "",
      phone: "",
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "United States",
      type: "home",
    });
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <div className="bg-[var(--surface)] border-b border-[var(--border)] sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <Link
              to="/cart"
              className="flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text)] transition-colors"
            >
              <ChevronLeft size={18} />
              <span className="hidden sm:inline">Back to Cart</span>
            </Link>
            <h1 className="text-base sm:text-lg font-semibold text-[var(--text)]">
              Checkout
            </h1>
            <div className="w-16" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-1 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-2 mb-6 sm:mb-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[var(--primary)] text-white flex items-center justify-center text-sm font-medium">
              1
            </div>
            <span className="text-sm font-medium text-[var(--text)]">
              Address
            </span>
          </div>
          <div className="w-8 sm:w-12 h-0.5 bg-gray-300" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gray-200 text-[var(--text-muted)] flex items-center justify-center text-sm font-medium">
              2
            </div>
            <span className="text-sm text-[var(--text-muted)]">Payment</span>
          </div>
          <div className="w-8 sm:w-12 h-0.5 bg-gray-300" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gray-200 text-[var(--text-muted)] flex items-center justify-center text-sm font-medium">
              3
            </div>
            <span className="text-sm text-[var(--text-muted)]">Confirm</span>
          </div>
        </div>

        {/* Main Content: Address + Order Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Address Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[var(--surface)] rounded-xl sm:rounded-2xl shadow-sm border border-[var(--border)] p-4 sm:p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-semibold text-[var(--text)]">
                  Delivery Address
                </h2>
                <button
                  onClick={() => setShowAddAddress(!showAddAddress)}
                  className="flex items-center gap-1.5 text-sm font-medium text-[var(--primary)] hover:opacity-80 transition-opacity"
                >
                  <Plus size={16} />
                  Add New
                </button>
              </div>

              {/* Saved Addresses */}
              {!showAddAddress && (
                <div className="space-y-3">
                  {savedAddresses.map((address, index) => (
                    <div
                      key={address.id}
                      onClick={() => setSelectedAddress(index)}
                      className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedAddress === index
                          ? "border-[var(--primary)] bg-[var(--primary)]/5"
                          : "border-[var(--border)] hover:border-gray-400"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5">
                          {address.type === "home" ? (
                            <Home
                              size={18}
                              className="text-[var(--text-secondary)]"
                            />
                          ) : (
                            <Building
                              size={18}
                              className="text-[var(--text-secondary)]"
                            />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <p className="text-sm font-medium text-[var(--text)]">
                              {address.fullName}
                            </p>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-[var(--text-secondary)] capitalize">
                              {address.type}
                            </span>
                          </div>
                          <p className="text-xs text-[var(--text-secondary)] mb-0.5">
                            {address.phone}
                          </p>
                          <p className="text-xs text-[var(--text-secondary)]">
                            {address.street}, {address.city}, {address.state}{" "}
                            {address.zipCode}
                          </p>
                        </div>
                        {selectedAddress === index && (
                          <div className="flex-shrink-0">
                            <div className="w-5 h-5 rounded-full bg-[var(--primary)] flex items-center justify-center">
                              <Check size={12} className="text-white" />
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2 mt-3 pt-3 border-t border-[var(--border)]">
                        <button className="flex items-center gap-1 text-xs text-[var(--text-secondary)] hover:text-[var(--text)] transition-colors">
                          <Pencil size={12} />
                          Edit
                        </button>
                        <button className="flex items-center gap-1 text-xs text-red-500 hover:text-red-600 transition-colors">
                          <Trash2 size={12} />
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Add New Address Form */}
              {showAddAddress && (
                <form onSubmit={handleAddAddress} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[var(--text)] mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={addressForm.fullName}
                        onChange={(e) =>
                          setAddressForm({
                            ...addressForm,
                            fullName: e.target.value,
                          })
                        }
                        placeholder="John Doe"
                        className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] text-sm text-[var(--text)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[var(--text)] mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={addressForm.phone}
                        onChange={(e) =>
                          setAddressForm({
                            ...addressForm,
                            phone: e.target.value,
                          })
                        }
                        placeholder="+1 (555) 000-0000"
                        className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] text-sm text-[var(--text)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[var(--text)] mb-1.5">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      required
                      value={addressForm.street}
                      onChange={(e) =>
                        setAddressForm({
                          ...addressForm,
                          street: e.target.value,
                        })
                      }
                      placeholder="123 Main Street, Apt 4B"
                      className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] text-sm text-[var(--text)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)]"
                    />
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[var(--text)] mb-1.5">
                        City *
                      </label>
                      <input
                        type="text"
                        required
                        value={addressForm.city}
                        onChange={(e) =>
                          setAddressForm({
                            ...addressForm,
                            city: e.target.value,
                          })
                        }
                        placeholder="New York"
                        className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] text-sm text-[var(--text)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[var(--text)] mb-1.5">
                        State *
                      </label>
                      <input
                        type="text"
                        required
                        value={addressForm.state}
                        onChange={(e) =>
                          setAddressForm({
                            ...addressForm,
                            state: e.target.value,
                          })
                        }
                        placeholder="NY"
                        className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] text-sm text-[var(--text)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)]"
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-xs font-medium text-[var(--text)] mb-1.5">
                        ZIP Code *
                      </label>
                      <input
                        type="text"
                        required
                        value={addressForm.zipCode}
                        onChange={(e) =>
                          setAddressForm({
                            ...addressForm,
                            zipCode: e.target.value,
                          })
                        }
                        placeholder="10001"
                        className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] text-sm text-[var(--text)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[var(--text)] mb-1.5">
                      Country
                    </label>
                    <select
                      value={addressForm.country}
                      onChange={(e) =>
                        setAddressForm({
                          ...addressForm,
                          country: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] text-sm text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)]"
                    >
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="United Kingdom">United Kingdom</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[var(--text)] mb-2">
                      Address Type
                    </label>
                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          setAddressForm({ ...addressForm, type: "home" })
                        }
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm transition-all ${
                          addressForm.type === "home"
                            ? "border-[var(--primary)] bg-[var(--primary)]/5 text-[var(--primary)]"
                            : "border-[var(--border)] text-[var(--text-secondary)]"
                        }`}
                      >
                        <Home size={14} />
                        Home
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setAddressForm({ ...addressForm, type: "work" })
                        }
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm transition-all ${
                          addressForm.type === "work"
                            ? "border-[var(--primary)] bg-[var(--primary)]/5 text-[var(--primary)]"
                            : "border-[var(--border)] text-[var(--text-secondary)]"
                        }`}
                      >
                        <Building size={14} />
                        Work
                      </button>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="submit"
                      className="flex-1 bg-[var(--primary)] text-white py-2.5 rounded-lg font-medium text-sm hover:opacity-90 transition-opacity"
                    >
                      Save Address
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowAddAddress(false)}
                      className="px-6 py-2.5 border border-[var(--border)] rounded-lg font-medium text-sm text-[var(--text)] hover:bg-[var(--background)] transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-[var(--surface)] rounded-xl sm:rounded-2xl shadow-sm border border-[var(--border)] p-4 sm:p-6 sticky top-20">
              <h2 className="text-lg font-semibold text-[var(--text)] mb-4">
                Order Summary
              </h2>

              {/* Order Items */}
              <div className="space-y-3 mb-4">
                {orderItems.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg bg-[var(--background)] overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm font-medium text-[var(--text)] line-clamp-1">
                        {item.title}
                      </p>
                      <p className="text-[10px] sm:text-xs text-[var(--text-muted)]">
                        {item.color} / {item.size}
                      </p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-[10px] sm:text-xs text-[var(--text-muted)]">
                          Qty: {item.quantity}
                        </span>
                        <span className="text-xs sm:text-sm font-medium text-[var(--text)]">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-[var(--border)] pt-4 space-y-2">
                {/* Subtotal */}
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--text-secondary)]">Subtotal</span>
                  <span className="text-[var(--text)]">
                    {formatPrice(subtotal)}
                  </span>
                </div>

                {/* Shipping */}
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--text-secondary)]">Shipping</span>
                  <span
                    className={
                      shipping === 0 ? "text-green-600" : "text-[var(--text)]"
                    }
                  >
                    {shipping === 0 ? "Free" : formatPrice(shipping)}
                  </span>
                </div>

                {/* Tax */}
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--text-secondary)]">Tax (8%)</span>
                  <span className="text-[var(--text)]">{formatPrice(tax)}</span>
                </div>

                {/* Promo Code */}
                <div className="pt-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo code"
                      className="flex-1 px-3 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--background)] text-xs text-[var(--text)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)]"
                    />
                    <button className="px-3 py-1.5 border border-[var(--primary)] text-[var(--primary)] rounded-lg text-xs font-medium hover:bg-[var(--primary)] hover:text-white transition-colors">
                      Apply
                    </button>
                  </div>
                </div>
              </div>

              {/* Total */}
              <div className="border-t border-[var(--border)] pt-3 mt-3">
                <div className="flex justify-between items-baseline">
                  <span className="text-base font-semibold text-[var(--text)]">
                    Total
                  </span>
                  <span className="text-xl font-bold text-[var(--text)]">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>

              {/* Delivery Info */}
              <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-100">
                <div className="flex items-start gap-2">
                  <Truck
                    size={14}
                    className="text-green-600 mt-0.5 flex-shrink-0"
                  />
                  <div>
                    <p className="text-xs font-medium text-green-700">
                      Free Delivery
                    </p>
                    <p className="text-[10px] text-green-600">
                      on orders over $100
                    </p>
                  </div>
                </div>
              </div>

              {/* Continue Button */}

              <Link to="/payment" className="w-full mt-4 bg-[var(--primary)] text-white py-3 rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-lg shadow-[var(--primary)]/20">
                <CreditCard size={18} />
                Continue to Payment
              </Link>

              <div className="flex items-center justify-center gap-3 my-4">
                {paymentLists.map((icon, index) => (
                  <div
                    key={index}
                    className="w-10 h-6 rounded flex items-center justify-center"
                  >
                    {icon}
                  </div>
                ))}
              </div>

              {/* Trust Badges */}
              <div className="mt-4 flex items-center justify-center gap-4 text-[var(--text-muted)]">
                <div className="flex items-center gap-1">
                  <ShieldCheck size={12} />
                  <span className="text-[10px]">Secure</span>
                </div>
                <div className="flex items-center gap-1">
                  <Truck size={12} />
                  <span className="text-[10px]">Fast Delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
