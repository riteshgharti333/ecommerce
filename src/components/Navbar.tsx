import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  ShoppingBag,
  User,
  Heart,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  Gift,
  Truck,
  ShieldCheck,
  Banknote,
  RefreshCcw,
  Leaf,
  Star,
} from "lucide-react";

const Navbar = ({ onLoginClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [offerBar, setOfferBar] = useState(true);

  const shopCategories = {
    Skincare: ["Moisturizers", "Serums", "Cleansers", "Toners", "Face Oils"],
    Body: ["Body Lotion", "Body Wash", "Scrubs", "Hand Cream"],
    Sets: ["Starter Kit", "Glow Set", "Anti-Aging Set", "Travel Set"],
  };

  return (
    <nav className="sticky top-0 z-50">
      {/* Announcement Bar - Sliding Offers */}
      {offerBar && (
        <div className="bg-[var(--primary)] text-white text-[10px] relative overflow-hidden">
          <div className="flex items-center py-2.5">
            <div className="flex items-center gap-5 animate-scroll whitespace-nowrap">
              <span className="flex items-center gap-1.5">
                <Truck size={14} />
                Free Shipping $50+
              </span>
              <span className="text-white/40">•</span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={14} />
                Money-Back Guarantee
              </span>
              <span className="text-white/40">•</span>
              <span className="flex items-center gap-1.5">
                <Gift size={14} />
                Free Samples with Every Order
              </span>
              <span className="text-white/40">•</span>
              <span className="flex items-center gap-1.5">
                <Banknote size={14} />
                Cash on Delivery Available
              </span>
              <span className="text-white/40">•</span>
              <span className="flex items-center gap-1.5">
                <RefreshCcw size={14} />
                Easy 30-Day Returns
              </span>
              <span className="text-white/40">•</span>
              <span className="flex items-center gap-1.5">
                <Leaf size={14} />
                100% Natural Ingredients
              </span>
              <span className="text-white/40">•</span>
              <span className="flex items-center gap-1.5">
                <Star size={14} />
                Rated 4.8/5 by 10,000+ Customers
              </span>
              {/* Duplicate for loop */}
              <span className="flex items-center gap-1.5">
                <Truck size={14} />
                Free Shipping $50+
              </span>
              <span className="text-white/40">•</span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={14} />
                Money-Back Guarantee
              </span>
              <span className="text-white/40">•</span>
              <span className="flex items-center gap-1.5">
                <Gift size={14} />
                Free Samples with Every Order
              </span>
              <span className="text-white/40">•</span>
              <span className="flex items-center gap-1.5">
                <Banknote size={14} />
                Cash on Delivery Available
              </span>
              <span className="text-white/40">•</span>
              <span className="flex items-center gap-1.5">
                <RefreshCcw size={14} />
                Easy 30-Day Returns
              </span>
              <span className="text-white/40">•</span>
              <span className="flex items-center gap-1.5">
                <Leaf size={14} />
                100% Natural Ingredients
              </span>
              <span className="text-white/40">•</span>
              <span className="flex items-center gap-1.5">
                <Star size={14} />
                Rated 4.8/5 by 10,000+ Customers
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Main Navbar */}
      <div className="bg-white shadow-sm">
        <div className="mx-auto px-1 sm:px-4">
          <div className="flex items-center justify-between h-14">
            {/* Left: Burger Menu + Logo */}
            <div className="flex items-center gap-3">
              {/* Burger Menu - Mobile */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden  text-[var(--text)] hover:bg-[var(--background)] rounded-lg transition-colors"
              >
                {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>

              {/* Logo */}
              <Link to="/" className="flex items-center gap-2 group">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                  <Sparkles size={16} className="text-white" />
                </div>
                <div className="sm:block">
                  <h1 className="text-lg font-semibold tracking-wide text-[var(--text)] group-hover:text-[var(--primary)] transition-colors">
                    NURA
                  </h1>
                  <p className="text-[8px] tracking-[0.2em] text-[var(--accent)] uppercase hidden sm:block">
                    Skin Care
                  </p>
                </div>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center gap-1 ml-6">
                {["Home", "Shop", "Collections", "About", "Journal"].map(
                  (item) => (
                    <div
                      key={item}
                      className="relative"
                      onMouseEnter={() =>
                        item === "Shop" && setActiveDropdown("shop")
                      }
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <Link
                        to={`/${item.toLowerCase()}`}
                        className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors rounded-lg hover:bg-[var(--background)] group"
                      >
                        {item}
                        {item === "Shop" && (
                          <ChevronDown
                            size={14}
                            className={`transition-transform duration-200 ${
                              activeDropdown === "shop" ? "rotate-180" : ""
                            }`}
                          />
                        )}
                        <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[var(--accent)] scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full" />
                      </Link>

                      {/* Mega Dropdown */}
                      {item === "Shop" && activeDropdown === "shop" && (
                        <div className="absolute top-full left-0 mt-2 w-[640px] bg-[var(--surface)] border border-[var(--border)] rounded-2xl shadow-2xl p-8 grid grid-cols-3 gap-8">
                          {Object.entries(shopCategories).map(
                            ([category, items]) => (
                              <div key={category}>
                                <h3 className="text-xs font-semibold text-[var(--accent)] uppercase tracking-wider mb-4">
                                  {category}
                                </h3>
                                <div className="space-y-2.5">
                                  {items.map((subItem) => (
                                    <Link
                                      key={subItem}
                                      to={`/shop/${subItem.toLowerCase().replace(" ", "-")}`}
                                      className="block text-sm text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors hover:translate-x-1 transform duration-200"
                                    >
                                      {subItem}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            ),
                          )}
                        </div>
                      )}
                    </div>
                  ),
                )}
              </div>
            </div>

            {/* Right: Search + Cart + Profile (Mobile) */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Search */}
              <button className="p-2 text-[var(--text-secondary)] hover:text-[var(--primary)] hover:bg-[var(--background)] rounded-lg transition-all">
                <Search size={20} />
              </button>

              {/* Cart */}
              <Link
                to="/cart"
                className="p-2 text-[var(--text-secondary)] hover:text-[var(--primary)] hover:bg-[var(--background)] rounded-lg transition-all relative"
              >
                <ShoppingBag size={20} />
                <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-[var(--primary)] text-white text-[10px] rounded-full flex items-center justify-center">
                  2
                </span>
              </Link>

              {/* Profile/Account - Mobile */}
              <Link
                to="/account"
                className="p-2 text-[var(--text-secondary)] hover:text-[var(--primary)] hover:bg-[var(--background)] rounded-lg transition-all lg:hidden"
              >
                <User size={20} />
              </Link>

              {/* Wishlist - Desktop */}
              <Link
                to="/wishlist"
                className="hidden lg:block p-2 text-[var(--text-secondary)] hover:text-[var(--primary)] hover:bg-[var(--background)] rounded-lg transition-all relative"
              >
                <Heart size={20} />
                <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-[var(--accent)] text-white text-[10px] rounded-full flex items-center justify-center">
                  3
                </span>
              </Link>

              {/* Account - Desktop */}
              <Link
                to="/account"
                className="hidden lg:block p-2 text-[var(--text-secondary)] hover:text-[var(--primary)] hover:bg-[var(--background)] rounded-lg transition-all"
              >
                <User size={20} />
              </Link>

              {/* Login CTA - Desktop */}
              <button
                onClick={onLoginClick}
                className="hidden lg:flex items-center gap-2 px-5 py-2.5 bg-[var(--primary)] border border-transparent rounded-[var(--radius-sm)] text-white text-sm font-medium transition-all shadow-md hover:shadow-lg hover:bg-white hover:text-[var(--primary)] hover:border-[var(--primary)] ml-2"
              >
                LOGIN
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-[var(--border)] bg-white">
            <div className="px-4 py-3 space-y-1">
              {["Home", "Shop", "Collections", "About", "Journal"].map(
                (item) => (
                  <Link
                    key={item}
                    to={`/${item.toLowerCase()}`}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-between px-4 py-3 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--primary)] hover:bg-[var(--background)] rounded-lg transition-all"
                  >
                    {item}
                    {item === "Shop" && <ChevronDown size={14} />}
                  </Link>
                ),
              )}
              <div className="border-t border-[var(--border)] mt-2 pt-2">
                <Link
                  to="/wishlist"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-sm text-[var(--text-secondary)] hover:text-[var(--primary)] hover:bg-[var(--background)] rounded-lg transition-all"
                >
                  <Heart size={16} />
                  Wishlist
                </Link>
              </div>
              <div className="px-4 pt-2">
                <button
                  onClick={() => {
                    onLoginClick();
                    setIsMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-[var(--primary)] text-white text-md font-medium rounded-[var(--radius-sm)] hover:bg-[var(--primary-hover)] transition-all"
                >
                  LOGIN
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
