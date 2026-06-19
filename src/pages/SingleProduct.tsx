import React, { useState } from "react";
import {
  Star,
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  Truck,
  RotateCcw,
  ShieldCheck,
  Box,
  Package,
  FlaskConical,
  X,
  ChevronRightIcon,
  ChevronLeftIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import ProductCards from "../components/ProductCards";

const SingleProduct = () => {
  // --- State ---
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState("Black");
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);
  const [isWishlist, setIsWishlist] = useState(false);
  const [activeTab, setActiveTab] = useState("description"); // 'description' | 'manufacturing' | 'ingredients'

  // --- Mock Product Data ---
  const product = {
    id: 1,
    title: "Premium Wireless Noise-Canceling Headphones",
    price: 249.99,
    originalPrice: 349.99,
    description:
      "Experience studio-quality sound with our advanced noise-canceling technology. Features 40-hour battery life, comfortable over-ear design, and seamless Bluetooth 5.0 connectivity. Perfect for travel, work, and everyday use.",
    longDescription: `Our Premium Wireless Headphones are engineered for audiophiles who demand the best. The proprietary 40mm dynamic drivers deliver crystal-clear highs, rich mids, and deep, punchy bass. With advanced active noise cancellation (ANC), you can block out up to 95% of ambient noise, making them ideal for busy offices, airplanes, or noisy cafes.

The ergonomic over-ear design features plush memory foam ear cups that adapt to your head shape, ensuring all-day comfort. The lightweight construction (only 250g) means you can wear them for hours without fatigue.

Connect effortlessly to any device via Bluetooth 5.0 with a range of up to 30 meters. The built-in microphone ensures crystal-clear hands-free calls. With a massive 40-hour battery life, you can travel across the continent without needing to recharge. And if you run out of juice, a quick 10-minute charge gives you 4 hours of playback.`,
    rating: 4.8,
    reviews: 1247,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1485217988980-11786ced9454?w=600&h=600&fit=crop",
    ],
    colors: ["Black", "Silver", "Navy Blue", "Burgundy"],
    sizes: ["S", "M", "L", "XL"],
    specs: {
      battery: "40 hours",
      bluetooth: "5.0",
      weight: "250g",
      warranty: "1 Year",
    },
    inStock: true,

    // --- NEW DATA FIELDS ---
    manufacturing: {
      country: "South Korea",
      factory: "Seoul Precision Audio Co.",
      certification: "ISO 9001:2015, FCC, CE, RoHS",
      assembly: "Hand-assembled in our state-of-the-art facility",
      qualityCheck: "Each unit undergoes 15-point quality inspection",
      warrantyInfo: "1-year limited manufacturer warranty",
    },
    ingredients: [
      {
        name: "40mm Dynamic Drivers",
        description: "High-grade neodymium magnets for superior sound clarity",
      },
      {
        name: "Memory Foam Ear Cushions",
        description: "Premium PU leather wrapped, hypoallergenic foam",
      },
      {
        name: "Aluminum Headband",
        description: "Lightweight anodized aluminum, adjustable and durable",
      },
      {
        name: "Lithium-Polymer Battery",
        description: "High-capacity 800mAh, certified safe for travel",
      },
      {
        name: "Bluetooth 5.0 Chipset",
        description: "Qualcomm QCC3040 chip for low-latency audio",
      },
      {
        name: "Micro-USB Charging Port",
        description: "Reinforced metal connector for long-term durability",
      },
      {
        name: "Noise-Canceling Microphones",
        description: "Dual MEMS microphones for active noise cancellation",
      },
    ],
  };

  // --- Mock Recommended Products ---
  const recommended = [
    {
      id: 2,
      title: "Wireless Earbuds Pro",
      price: 89.99,
      image:
        "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=300&h=300&fit=crop",
    },
    {
      id: 3,
      title: "Smart Watch Series 5",
      price: 199.99,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
    },
    {
      id: 4,
      title: "Portable Power Bank",
      price: 49.99,
      image:
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=300&h=300&fit=crop",
    },
    {
      id: 5,
      title: "USB-C Hub Adapter",
      price: 39.99,
      image:
        "https://images.unsplash.com/photo-1498049794561-0200d6360094?w=300&h=300&fit=crop",
    },
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          size={16}
          className={
            i < Math.floor(rating)
              ? "fill-yellow-400 text-yellow-400"
              : "text-gray-300"
          }
        />
      ));
  };

  const [isFullScreen, setIsFullScreen] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // --- Touch/Swipe Handlers ---
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      // Swipe left - next image
      setSelectedImage((prev) =>
        prev === product.images.length - 1 ? 0 : prev + 1,
      );
    }

    if (isRightSwipe) {
      // Swipe right - previous image
      setSelectedImage((prev) =>
        prev === 0 ? product.images.length - 1 : prev - 1,
      );
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  const nextImage = () => {
    setSelectedImage((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1,
    );
  };

  const prevImage = () => {
    setSelectedImage((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1,
    );
  };

  // Keyboard navigation for fullscreen
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isFullScreen) return;

      if (e.key === "ArrowLeft") {
        prevImage();
      } else if (e.key === "ArrowRight") {
        nextImage();
      } else if (e.key === "Escape") {
        setIsFullScreen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFullScreen]);

  // Prevent body scroll when fullscreen is open
  React.useEffect(() => {
    if (isFullScreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isFullScreen]);

  return (
    <div className="min-h-screen bg-[var(--background)] pt-10 pb-16 px-1 sm:px-6 lg:px-8">
      {/* --- Breadcrumb --- */}
      <div className="max-w-7xl mx-auto mb-6">
        <nav className="flex flex-wrap items-center gap-2 text-[11px] text-[var(--text-muted)]">
          <Link
            to="/"
            className="hover:text-[var(--primary)] transition-colors"
          >
            Home
          </Link>
          <span>›</span>
          <Link
            to="/products"
            className="hover:text-[var(--primary)] transition-colors"
          >
            Electronics
          </Link>
          <span>›</span>
          <span className="text-[var(--text)] font-medium">
            {product.title}
          </span>
        </nav>
      </div>

      {/* --- Main Product Section --- */}
      <div className="max-w-7xl mx-auto bg-[var(--surface)] rounded-[var(--radius-lg)] shadow-lg border border-[var(--border)] overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-3 lg:p-10">
          {/* === Left Column: Images === */}
          <div className="flex flex-col gap-4">
            {/* Main Image - Now clickable with swipe support */}
            <div
              className="relative bg-[var(--background)] rounded-xl overflow-hidden aspect-square group cursor-pointer"
              onClick={() => setIsFullScreen(true)}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <img
                src={product.images[selectedImage]}
                alt={product.title}
                className="w-full h-full object-contain p-8 transition-transform duration-500 group-hover:scale-105"
              />

              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 text-white text-xs px-2 py-1 rounded">
                Click to expand
              </div>
            </div>

            {/* Thumbnails - No more scroll-x hidden, always visible */}
            <div className="flex gap-3 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:none]">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index
                      ? "border-[var(--primary)] ring-2 ring-[var(--primary)]/20"
                      : "border-transparent hover:border-gray-300"
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* === Right Column: Details === */}
          <div className="flex flex-col gap-6">
            {/* Title & Rating */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text)] mb-2">
                {product.title}
              </h1>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-0.5">
                  {renderStars(product.rating)}
                </div>
                <span className="text-sm font-medium text-[var(--text-secondary)]">
                  {product.rating}
                </span>
                <span className="text-sm text-[var(--text-muted)]">
                  ({product.reviews} reviews)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-[var(--text)]">
                {formatPrice(product.price)}
              </span>
              <span className="text-lg text-[var(--text-muted)] line-through">
                {formatPrice(product.originalPrice)}
              </span>
              <span className="text-sm font-bold text-green-600 bg-green-50 px-2 py-1 rounded">
                Save{" "}
                {Math.round((1 - product.price / product.originalPrice) * 100)}%
              </span>
            </div>

            {/* Short Description */}
            <p className="text-[var(--text-secondary)] leading-relaxed text-sm sm:text-base">
              {product.description}
            </p>

            {/* Colors */}
            <div>
              <h4 className="text-sm font-medium text-[var(--text)] mb-2">
                Color:{" "}
                <span className="font-normal text-[var(--text-secondary)]">
                  {selectedColor}
                </span>
              </h4>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-10 h-10 rounded-full border-2 transition-all ${
                      selectedColor === color
                        ? "border-[var(--primary)] ring-2 ring-[var(--primary)]/20"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                    style={{
                      backgroundColor:
                        color === "Black"
                          ? "#1a1a1a"
                          : color === "Silver"
                            ? "#e5e7eb"
                            : color === "Navy Blue"
                              ? "#1e3a8a"
                              : color === "Burgundy"
                                ? "#800020"
                                : "#ffffff",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div>
              <h4 className="text-sm font-medium text-[var(--text)] mb-2">
                Size:{" "}
                <span className="font-normal text-[var(--text-secondary)]">
                  {selectedSize}
                </span>
              </h4>
              <div className="flex gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 rounded-md border text-sm font-medium transition-all ${
                      selectedSize === size
                        ? "border-[var(--primary)] bg-[var(--primary)]/5 text-[var(--primary)]"
                        : "border-gray-200 text-[var(--text-secondary)] hover:border-gray-400"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="flex gap-2 sm:gap-3 pt-4 border-t border-[var(--border)]">
              <button className="flex-[3] sm:flex-[4] bg-[var(--primary)] text-white py-3 sm:py-2.5 rounded-lg font-medium text-sm sm:text-base hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-lg shadow-[var(--primary)]/20 min-w-0 hover:shadow-xl hover:shadow-[var(--primary)]/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200">
                <ShoppingBag
                  size={16}
                  className="sm:w-[18px] sm:h-[18px] flex-shrink-0"
                />
                <span className="hidden sm:inline">Add to Cart</span>
                <span className="sm:hidden">Add</span>
              </button>

              <button className="flex-[2] sm:flex-[2] py-3 sm:py-2.5 border border-[var(--border)] rounded-lg font-medium text-sm sm:text-base text-[var(--text)] hover:bg-[var(--primary)] hover:text-white hover:border-[var(--primary)] transition-all duration-200 min-w-0 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0">
                Buy
              </button>

              <button
                onClick={() => setIsWishlist(!isWishlist)}
                className="flex-shrink-0 w-11 sm:w-auto sm:px-4 py-3 sm:py-2.5 rounded-lg border border-[var(--border)] transition-all duration-200 flex items-center justify-center hover:bg-pink-50 hover:border-pink-200 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
                aria-label={
                  isWishlist ? "Remove from wishlist" : "Add to wishlist"
                }
              >
                <Heart
                  size={16}
                  className={`sm:w-[18px] sm:h-[18px] flex-shrink-0 transition-colors ${
                    isWishlist
                      ? "fill-pink-500 text-pink-500"
                      : "text-[var(--text-secondary)] group-hover:text-pink-400"
                  }`}
                />
                <span
                  className={`hidden sm:inline ml-2 text-sm font-medium transition-colors ${
                    isWishlist
                      ? "text-pink-500"
                      : "text-[var(--text-secondary)]"
                  }`}
                >
                  {isWishlist ? "Saved" : "Wishlist"}
                </span>
              </button>
            </div>

            {/* Delivery & Warranty Info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[var(--border)]">
              <div className="flex items-center gap-3">
                <Truck size={20} className="text-[var(--text-secondary)]" />
                <div>
                  <p className="text-xs font-medium text-[var(--text)]">
                    Free Delivery
                  </p>
                  <p className="text-[10px] text-[var(--text-muted)]">
                    1-3 Business Days
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <RotateCcw size={20} className="text-[var(--text-secondary)]" />
                <div>
                  <p className="text-xs font-medium text-[var(--text)]">
                    30-Day Returns
                  </p>
                  <p className="text-[10px] text-[var(--text-muted)]">
                    Easy refund policy
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck
                  size={20}
                  className="text-[var(--text-secondary)]"
                />
                <div>
                  <p className="text-xs font-medium text-[var(--text)]">
                    1 Year Warranty
                  </p>
                  <p className="text-[10px] text-[var(--text-muted)]">
                    Official guarantee
                  </p>
                </div>
              </div>
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full ${product.inStock ? "bg-green-500" : "bg-red-500"}`}
              />
              <span className="text-xs font-medium text-[var(--text-secondary)]">
                {product.inStock ? "In Stock" : "Out of Stock"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* === Full Screen Image Modal === */}
      {isFullScreen && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          {/* Close button */}
          <button
            onClick={() => setIsFullScreen(false)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-50 bg-black/50 p-2 rounded-full"
            aria-label="Close full screen"
          >
            <X size={24} />
          </button>

          {/* Image counter */}
          <div className="absolute top-4 left-4 text-white bg-black/50 px-3 py-1 rounded-full text-sm z-50">
            {selectedImage + 1} / {product.images.length}
          </div>

          {/* Previous button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-4 text-white hover:text-gray-300 transition-colors z-50 bg-black/50 p-3 rounded-full hover:bg-black/70"
            aria-label="Previous image"
          >
            <ChevronLeftIcon size={24} />
          </button>

          {/* Main full screen image with swipe */}
          <div
            className="w-full h-full flex items-center justify-center p-4 sm:p-8 lg:p-16"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <img
              src={product.images[selectedImage]}
              alt={product.title}
              className="max-w-full max-h-full object-contain select-none"
              draggable={false}
            />
          </div>

          {/* Next button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-4 text-white hover:text-gray-300 transition-colors z-50 bg-black/50 p-3 rounded-full hover:bg-black/70"
            aria-label="Next image"
          >
            <ChevronRightIcon size={24} />
          </button>

          {/* Bottom thumbnails in fullscreen */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-black/50 p-2 rounded-lg">
            {product.images.map((img, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(index);
                }}
                className={`w-12 h-12 sm:w-16 sm:h-16 rounded-md overflow-hidden border-2 transition-all ${
                  selectedImage === index
                    ? "border-white ring-2 ring-white/50"
                    : "border-transparent hover:border-gray-400 opacity-70 hover:opacity-100"
                }`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* === Tabs: Description, Manufacturing, Ingredients === */}
      <div className="max-w-7xl mx-auto mt-12 bg-[var(--surface)]  rounded-[var(--radius-lg)] shadow-lg border border-[var(--border)] p-6 lg:p-10 ">
        {/* Tab Headers */}
        <div className="flex border-b border-[var(--border)] mb-6 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:none]">
          <button
            onClick={() => setActiveTab("description")}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-all whitespace-nowrap ${
              activeTab === "description"
                ? "border-[var(--primary)] text-[var(--primary)]"
                : "border-transparent text-[var(--text-muted)] hover:text-[var(--text)]"
            }`}
          >
            <Box size={16} className="inline-block mr-2 mb-0.5" />
            Description
          </button>
          <button
            onClick={() => setActiveTab("manufacturing")}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-all whitespace-nowrap ${
              activeTab === "manufacturing"
                ? "border-[var(--primary)] text-[var(--primary)]"
                : "border-transparent text-[var(--text-muted)] hover:text-[var(--text)]"
            }`}
          >
            <Package size={16} className="inline-block mr-2 mb-0.5" />
            Manufacturing
          </button>
          <button
            onClick={() => setActiveTab("ingredients")}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-all whitespace-nowrap ${
              activeTab === "ingredients"
                ? "border-[var(--primary)] text-[var(--primary)]"
                : "border-transparent text-[var(--text-muted)] hover:text-[var(--text)]"
            }`}
          >
            <FlaskConical size={16} className="inline-block mr-2 mb-0.5" />
            Components
          </button>
        </div>

        {/* Tab Content */}
        <div className="min-h-[200px]">
          {/* 1. Description Tab */}
          {activeTab === "description" && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <h3 className="text-lg font-semibold text-[var(--text)]">
                Product Details
              </h3>
              <div className="text-[var(--text-secondary)] leading-relaxed whitespace-pre-line text-sm sm:text-base">
                {product.longDescription}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                <div className="bg-[var(--background)] p-3 rounded-lg border border-[var(--border)]">
                  <p className="text-xs text-[var(--text-muted)]">
                    Battery Life
                  </p>
                  <p className="text-sm font-semibold text-[var(--text)]">
                    {product.specs.battery}
                  </p>
                </div>
                <div className="bg-[var(--background)] p-3 rounded-lg border border-[var(--border)]">
                  <p className="text-xs text-[var(--text-muted)]">Bluetooth</p>
                  <p className="text-sm font-semibold text-[var(--text)]">
                    {product.specs.bluetooth}
                  </p>
                </div>
                <div className="bg-[var(--background)] p-3 rounded-lg border border-[var(--border)]">
                  <p className="text-xs text-[var(--text-muted)]">Weight</p>
                  <p className="text-sm font-semibold text-[var(--text)]">
                    {product.specs.weight}
                  </p>
                </div>
                <div className="bg-[var(--background)] p-3 rounded-lg border border-[var(--border)]">
                  <p className="text-xs text-[var(--text-muted)]">Warranty</p>
                  <p className="text-sm font-semibold text-[var(--text)]">
                    {product.specs.warranty}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 2. Manufacturing Tab */}
          {activeTab === "manufacturing" && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <h3 className="text-lg font-semibold text-[var(--text)]">
                Manufacturing & Quality
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-[var(--background)] p-4 rounded-lg border border-[var(--border)]">
                  <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-semibold">
                    Country of Origin
                  </p>
                  <p className="text-base font-medium text-[var(--text)] mt-1">
                    {product.manufacturing.country}
                  </p>
                </div>
                <div className="bg-[var(--background)] p-4 rounded-lg border border-[var(--border)]">
                  <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-semibold">
                    Manufacturing Facility
                  </p>
                  <p className="text-base font-medium text-[var(--text)] mt-1">
                    {product.manufacturing.factory}
                  </p>
                </div>
                <div className="bg-[var(--background)] p-4 rounded-lg border border-[var(--border)]">
                  <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-semibold">
                    Certifications
                  </p>
                  <p className="text-base font-medium text-[var(--text)] mt-1">
                    {product.manufacturing.certification}
                  </p>
                </div>
                <div className="bg-[var(--background)] p-4 rounded-lg border border-[var(--border)]">
                  <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-semibold">
                    Assembly
                  </p>
                  <p className="text-base font-medium text-[var(--text)] mt-1">
                    {product.manufacturing.assembly}
                  </p>
                </div>
                <div className="bg-[var(--background)] p-4 rounded-lg border border-[var(--border)] sm:col-span-2">
                  <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-semibold">
                    Quality Assurance
                  </p>
                  <p className="text-base font-medium text-[var(--text)] mt-1">
                    {product.manufacturing.qualityCheck}
                  </p>
                </div>
                <div className="bg-[var(--background)] p-4 rounded-lg border border-[var(--border)] sm:col-span-2">
                  <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-semibold">
                    Warranty
                  </p>
                  <p className="text-base font-medium text-[var(--text)] mt-1">
                    {product.manufacturing.warrantyInfo}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 3. Ingredients/Components Tab */}
          {activeTab === "ingredients" && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <h3 className="text-lg font-semibold text-[var(--text)]">
                Materials & Components
              </h3>
              <p className="text-sm text-[var(--text-secondary)] mb-4">
                Built with premium quality materials for durability, comfort,
                and superior performance.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.ingredients.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 bg-[var(--background)] p-3 rounded-lg border border-[var(--border)]"
                  >
                    <div className="w-8 h-8 rounded-full bg-[var(--primary)]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <FlaskConical
                        size={14}
                        className="text-[var(--primary)]"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[var(--text)]">
                        {item.name}
                      </p>
                      <p className="text-xs text-[var(--text-secondary)]">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* === Reviews Section === */}
      <div className="max-w-7xl mx-auto mt-12 bg-[var(--surface)] rounded-[var(--radius-lg)] shadow-lg border border-[var(--border)] p-6 lg:p-10">
        <h2 className="text-xl font-bold text-[var(--text)] mb-6">
          Customer Reviews
        </h2>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Summary */}
          <div className="lg:w-1/3">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-4xl font-bold text-[var(--text)]">
                {product.rating}
              </span>
              <div>
                <div className="flex items-center gap-0.5">
                  {renderStars(product.rating)}
                </div>
                <p className="text-sm text-[var(--text-muted)]">
                  Based on {product.reviews} reviews
                </p>
              </div>
            </div>
            {/* Review bars */}
            {[5, 4, 3, 2, 1].map((star) => (
              <div key={star} className="flex items-center gap-3 mb-1.5">
                <span className="text-xs font-medium text-[var(--text-secondary)] w-6">
                  {star}★
                </span>
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-400 rounded-full"
                    style={{ width: `${(5 - star + 1) * 18}%` }}
                  />
                </div>
                <span className="text-xs text-[var(--text-muted)] w-8 text-right">
                  {(5 - star + 1) * 18}%
                </span>
              </div>
            ))}
          </div>
          {/* Review List */}
          <div className="lg:w-2/3 space-y-6">
            {[1, 2, 3].map((review) => (
              <div
                key={review}
                className="border-b border-[var(--border)] pb-6 last:border-0 last:pb-0"
              >
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">
                    {["JD", "SK", "MR"][review - 1]}
                  </div>
                  <span className="text-sm font-medium text-[var(--text)]">
                    {["John Doe", "Sarah Kim", "Mike Ross"][review - 1]}
                  </span>
                  <span className="text-xs text-[var(--text-muted)]">
                    • 2 days ago
                  </span>
                </div>
                <div className="flex items-center gap-0.5 mb-2">
                  {renderStars(5 - review + 1)}
                </div>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {review === 1 &&
                    "Absolutely love these headphones! The noise cancellation is incredible, and the sound quality is top-notch. Battery life lasts forever."}
                  {review === 2 &&
                    "Great product for the price. The build quality feels premium and they're super comfortable for long listening sessions."}
                  {review === 3 &&
                    "Decent headphones, but I wish the bass was a bit stronger. Still, a solid choice for everyday use."}
                </p>
              </div>
            ))}

            {/* See All Reviews Button */}
            <div className="pt-2">
              <button className="w-full sm:w-auto px-6 py-2.5 border border-[var(--primary)] text-[var(--primary)] rounded-lg font-medium text-sm hover:bg-[var(--primary)] hover:text-white transition-all duration-200 flex items-center justify-center gap-2">
                See All {product.reviews} Reviews
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* === Recommended Products Section === */}
      <div className="max-w-7xl mx-auto mt-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-[var(--text)]">
            You might also like
          </h2>
        
        </div>
       <ProductCards />
      </div>
    </div>
  );
};

export default SingleProduct;
