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
  XCircle,
  Banknote,
  RefreshCcw,
  Leaf,
  Star,
} from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
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
            {/* Scrolling Content */}
            <div className="flex items-center gap-5 animate-scroll whitespace-nowrap">
              {/* First Set */}
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

              {/* Duplicate Set for Seamless Loop */}
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

      {/* Main Navbar - Floating Style */}
      <div className="relative p-2 mx-auto bg-white ">
        <div className=" m-auto shadow-black/5 ">
          <div className="flex items-center justify-between">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden pb-2.5 pt-2.5 pr-2.5 text-[var(--text)] hover:bg-[var(--background)] rounded-[var(--radius-md)] transition-colors"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Left Section - Logo & Desktop Nav */}
            <div className="flex items-center gap-8 lg:gap-12">
              {/* Logo */}
              <Link to="/" className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                  <Sparkles size={18} className="text-white" />
                </div>
                <div className=" sm:block">
                  <h1 className="text-xl font-semibold tracking-wide text-[var(--text)] group-hover:text-[var(--primary)] transition-colors">
                    NURA
                  </h1>
                  <p className="text-[9px] tracking-[0.2em] text-[var(--accent)] uppercase">
                    Skin Care
                  </p>
                </div>
              </Link>

              {/* Desktop Navigation with Dropdown */}
              <div className="hidden lg:flex items-center gap-1">
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
                        className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors rounded-[var(--radius-md)] hover:bg-[var(--background)] group"
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
                        {/* Hover underline */}
                        <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[var(--accent)] scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full" />
                      </Link>

                      {/* Mega Dropdown */}
                      {item === "Shop" && activeDropdown === "shop" && (
                        <div className="absolute top-full left-0 mt-2 w-[640px] bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-xl)] shadow-2xl p-8 grid grid-cols-3 gap-8">
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
                          {/* Featured Card */}
                          <div className="col-span-3 mt-4 p-4 bg-gradient-to-r from-[var(--primary-light)] to-[var(--accent-light)] rounded-[var(--radius-lg)]">
                            <p className="text-xs font-semibold text-[var(--primary)] mb-1">
                              ✨ New Arrival
                            </p>
                            <p className="text-sm text-[var(--text-secondary)]">
                              Discover our new Vitamin C Serum - 20% off launch
                              week!
                            </p>
                            <Link
                              to="/shop/vitamin-c-serum"
                              className="inline-block mt-2 text-xs font-medium text-[var(--primary)] hover:underline"
                            >
                              Login →
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                  ),
                )}
              </div>
            </div>

            {/* Right Section - Icons & CTA */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Search */}
              <button className="p-2.5 text-[var(--text-secondary)] hover:text-[var(--primary)] hover:bg-[var(--background)] rounded-[var(--radius-md)] transition-all">
                <Search size={20} />
              </button>

              {/* Wishlist */}
              <Link
                to="/wishlist"
                className="hidden sm:block p-2.5 text-[var(--text-secondary)] hover:text-[var(--primary)] hover:bg-[var(--background)] rounded-[var(--radius-md)] transition-all relative"
              >
                <Heart size={20} />
                <span className="absolute top-1 right-1 w-4 h-4 bg-[var(--accent)] text-white text-[10px] rounded-full flex items-center justify-center">
                  3
                </span>
              </Link>

              {/* Account */}
              <Link
                to="/account"
                className="hidden sm:block p-2.5 text-[var(--text-secondary)] hover:text-[var(--primary)] hover:bg-[var(--background)] rounded-[var(--radius-md)] transition-all"
              >
                <User size={20} />
              </Link>

              {/* Cart */}
              <Link
                to="/cart"
                className="p-2.5 text-[var(--text-secondary)] hover:text-[var(--primary)] hover:bg-[var(--background)] rounded-[var(--radius-md)] transition-all relative"
              >
                <ShoppingBag size={20} />
                <span className="absolute top-1 right-1 w-4 h-4 bg-[var(--primary)] text-white text-[10px] rounded-full flex items-center justify-center">
                  2
                </span>
              </Link>

              {/* CTA Button */}
              <Link
                to="/shop"
                className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-[var(--primary)] text-white text-sm font-medium rounded-full hover:bg-[var(--primary-hover)] transition-all shadow-md hover:shadow-lg"
              >
                <Sparkles size={14} />
                Login
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="mt-2 bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-xl)] shadow-xl p-2 lg:hidden">
            <div className="space-y-1">
              {["Home", "Shop", "Collections", "About", "Journal"].map(
                (item) => (
                  <Link
                    key={item}
                    to={`/${item.toLowerCase()}`}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-between px-4 py-3 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--primary)] hover:bg-[var(--background)] rounded-[var(--radius-md)] transition-all"
                  >
                    {item}
                    {item === "Shop" && <ChevronDown size={14} />}
                  </Link>
                ),
              )}
              <div className="border-t border-[var(--border)] mt-2 pt-2 px-4 pb-2">
                <Link
                  to="/account"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 py-2.5 text-sm text-[var(--text-secondary)]"
                >
                  <User size={16} />
                  My Account
                </Link>
                <Link
                  to="/wishlist"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 py-2.5 text-sm text-[var(--text-secondary)]"
                >
                  <Heart size={16} />
                  Wishlist
                </Link>
              </div>
              <Link
                to="/shop"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-center gap-2 mx-4 mt-2 px-5 py-3 bg-[var(--primary)] text-white text-sm font-medium rounded-full hover:bg-[var(--primary-hover)] transition-all"
              >
                <Sparkles size={14} />
                Login
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
