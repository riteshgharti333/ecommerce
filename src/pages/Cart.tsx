import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Minus,
  Plus,
  X,
  Heart,
  Truck,
  Shield,
  ArrowLeft,
  Tag,
  Gift,
  ChevronRight,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import ProductCards from "../components/ProductCards";
import { paymentLists } from "../assets/data/paymentIcon";

interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
  color?: string;
  size?: string;
}

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      title: "Vitamin C Brightening Serum",
      price: 29.99,
      image:
        "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=200&h=200&fit=crop",
      quantity: 2,
      color: "Natural",
      size: "30ml",
    },
    {
      id: 1,
      title: "Vitamin C Brightening Serum",
      price: 29.99,
      image:
        "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=200&h=200&fit=crop",
      quantity: 2,
      color: "Natural",
      size: "30ml",
    },
    {
      id: 1,
      title: "Vitamin C Brightening Serum",
      price: 29.99,
      image:
        "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=200&h=200&fit=crop",
      quantity: 2,
      color: "Natural",
      size: "30ml",
    },
    {
      id: 2,
      title: "Hydrating Face Moisturizer",
      price: 34.99,
      image:
        "https://images.unsplash.com/photo-1570194065650-d99fb4b38c42?w=200&h=200&fit=crop",
      quantity: 1,
      color: "White",
      size: "50ml",
    },
    {
      id: 3,
      title: "Gentle Cleansing Foam",
      price: 24.99,
      image:
        "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=200&h=200&fit=crop",
      quantity: 1,
      color: "Green",
      size: "100ml",
    },
  ]);

  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoDiscount, setPromoDiscount] = useState(0);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  const removeItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const applyPromoCode = () => {
    if (promoCode.toUpperCase() === "GLOW20") {
      setPromoApplied(true);
      setPromoDiscount(subtotal * 0.2);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping = subtotal > 50 ? 0 : 5.99;
  const tax = subtotal * 0.08;
  const total = subtotal - promoDiscount + shipping + tax;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-24 h-24 bg-[var(--surface)] border border-[var(--border)] rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag size={40} className="text-[var(--border)]" />
          </div>
          <h2 className="text-2xl font-semibold text-[var(--text)] mb-2">
            Your cart is empty
          </h2>
          <p className="text-[var(--text-secondary)] mb-8">
            Looks like you haven't added anything to your cart yet. Start
            shopping and find your perfect skincare routine!
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-8 py-3 bg-[var(--primary)] text-white font-medium rounded-full hover:bg-[var(--primary-hover)] transition-all shadow-lg"
          >
            <Sparkles size={18} />
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="max-w-7xl mx-auto px-1 sm:px-6 lg:px-8 py-6 sm:py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-[var(--text)] mb-1">
              Shopping Cart
            </h1>
            <p className="text-sm text-[var(--text-secondary)]">
              {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in
              your cart
            </p>
          </div>
          <Link
            to="/shop"
            className="hidden sm:flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors"
          >
            <ArrowLeft size={16} />
            Continue Shopping
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {/* Free Shipping Banner */}
            {subtotal < 50 && (
              <div className="bg-[var(--primary-light)] text-[var(--primary)] p-4 rounded-[var(--radius-xl)] flex items-center gap-3 text-sm">
                <Truck size={18} />
                <span>
                  Add {formatPrice(50 - subtotal)} more for{" "}
                  <strong>Free Shipping</strong>!
                </span>
              </div>
            )}

            {subtotal >= 50 && (
              <div className="bg-green-50 text-green-700 p-4 rounded-[var(--radius-xl)] flex items-center gap-3 text-sm">
                <Truck size={18} />
                <span>
                  You've got <strong>Free Shipping</strong>!
                </span>
              </div>
            )}

            {/* Cart Items List */}
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-xl)] p-4 sm:p-5 hover:border-[var(--primary)]/20 transition-all"
              >
                <div className="flex gap-4">
                  {/* Product Image */}
                  <Link
                    to={`/product/${item.id}`}
                    className="w-20 h-20 sm:w-24 sm:h-24 bg-[var(--background)] rounded-[var(--radius-lg)] overflow-hidden flex-shrink-0"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-contain p-2"
                    />
                  </Link>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between">
                      <div>
                        <Link to={`/product/${item.id}`}>
                          <h3 className="text-sm sm:text-base font-medium text-[var(--text)] hover:text-[var(--primary)] transition-colors line-clamp-1">
                            {item.title}
                          </h3>
                        </Link>
                        {item.color && (
                          <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                            Color: {item.color} | Size: {item.size}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-1.5 text-[var(--text-muted)] hover:text-red-500 hover:bg-red-50 rounded-lg transition-all flex-shrink-0"
                      >
                        <X size={16} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Selector */}
                      <div className="flex items-center border border-[var(--border)] rounded-full">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="p-1.5 sm:p-2 hover:text-[var(--primary)] transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-8 sm:w-10 text-center text-sm font-medium text-[var(--text)]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="p-1.5 sm:p-2 hover:text-[var(--primary)] transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <span className="text-sm sm:text-base font-bold text-[var(--text)]">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                        {item.quantity > 1 && (
                          <p className="text-[10px] text-[var(--text-muted)]">
                            {formatPrice(item.price)} each
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Save for Later */}
                    <button className="mt-2 flex items-center gap-1 text-xs text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors">
                      <Heart size={12} />
                      Save for later
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Continue Shopping Link - Mobile */}
            <Link
              to="/shop"
              className="flex sm:hidden items-center justify-center gap-2 py-3 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors"
            >
              <ArrowLeft size={16} />
              Continue Shopping
            </Link>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-2xl)] p-6 sticky top-28">
              <h2 className="text-lg font-semibold text-[var(--text)] mb-6">
                Order Summary
              </h2>

              {/* Promo Code */}
              <div className="mb-6">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag
                      size={14}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]"
                    />
                    <input
                      type="text"
                      placeholder="Promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 bg-[var(--background)] border border-[var(--border)] rounded-full text-sm focus:outline-none focus:border-[var(--primary)] transition-all"
                    />
                  </div>
                  <button
                    onClick={applyPromoCode}
                    className="px-4 py-2.5 bg-[var(--text)] text-white text-sm font-medium rounded-full hover:bg-[var(--text-secondary)] transition-all"
                  >
                    Apply
                  </button>
                </div>
                {promoApplied && (
                  <p className="mt-2 text-xs text-green-600 flex items-center gap-1">
                    <Sparkles size={12} />
                    Promo GLOW20 applied! 20% off
                  </p>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 pb-4 border-b border-[var(--border)]">
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--text-secondary)]">Subtotal</span>
                  <span className="text-[var(--text)] font-medium">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                {promoDiscount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-green-600">Discount (20%)</span>
                    <span className="text-green-600 font-medium">
                      -{formatPrice(promoDiscount)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--text-secondary)]">Shipping</span>
                  <span className="text-[var(--text)] font-medium">
                    {shipping === 0 ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      formatPrice(shipping)
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--text-secondary)]">Tax (8%)</span>
                  <span className="text-[var(--text)] font-medium">
                    {formatPrice(tax)}
                  </span>
                </div>
              </div>

              {/* Total */}
              <div className="flex justify-between py-4 mb-6">
                <span className="text-lg font-semibold text-[var(--text)]">
                  Total
                </span>
                <span className="text-lg font-bold text-[var(--text)]">
                  {formatPrice(total)}
                </span>
              </div>

              {/* Checkout Button */}
              <Link
                to="/checkout"
                className="w-full py-3.5 bg-[var(--primary)] text-white font-semibold rounded-full hover:bg-[var(--primary-hover)] transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl mb-4"
              >
                <ShoppingBag size={18} />
                Proceed to Checkout
              </Link>

              {/* Payment Methods */}
              <div className="flex items-center justify-center gap-3 mb-4">
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
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                  <Shield size={14} className="text-[var(--primary)]" />
                  Secure checkout with SSL encryption
                </div>
                <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                  <Truck size={14} className="text-[var(--primary)]" />
                  Free shipping on orders over $50
                </div>
                <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                  <Gift size={14} className="text-[var(--primary)]" />
                  Free samples with every order
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Products */}
        <div className="mt-16">
          <h2 className="text-xl sm:text-2xl font-semibold text-[var(--text)] mb-6">
            You May Also Like
          </h2>
          <ProductCards />
        </div>
      </div>
    </div>
  );
};

export default Cart;
