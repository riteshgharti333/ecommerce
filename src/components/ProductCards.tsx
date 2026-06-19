import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Star, Heart, ShoppingBag, Sparkles, X } from "lucide-react";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

const ProductCards = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(
    null,
  );

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, selectedCategory, sortBy, searchQuery]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      setProducts(response.data);
      setFilteredProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = [...products];

    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory,
      );
    }

    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating.rate - a.rating.rate);
        break;
      case "popular":
        filtered.sort((a, b) => b.rating.count - a.rating.count);
        break;
      default:
        break;
    }

    setFilteredProducts(filtered);
  };

  const toggleWishlist = (id: number) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const categories = [
    "all",
    ...Array.from(new Set(products.map((p) => p.category))),
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto mb-4">
            <div className="absolute inset-0 border-4 border-[var(--primary)]/20 rounded-full" />
            <div className="absolute inset-0 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin" />
          </div>
          <p className="text-[var(--text-secondary)] text-sm">
            Loading products...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1 sm:gap-4">
      {filteredProducts.map((product, index) => (
        <div
          key={product.id}
          className="group bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-md)] overflow-hidden hover:border-[var(--primary)]/40 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 ease-out flex flex-col"
        >
          {/* Image Container - Reduced Height */}
          <Link
            to={`/product/${product.id}`}
            className="relative overflow-hidden bg-[var(--background)] block aspect-[2/2] sm:aspect-[5/4]"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-contain p-3 sm:p-4 group-hover:scale-105 transition-transform duration-500"
            />
          </Link>

          {/* Product Info */}
          <div className="p-2 sm:p-3 flex flex-col flex-1">
            <Link to={`/product/${product.id}`} className="block mb-1">
              <h3 className="text-xs sm:text-sm font-medium text-[var(--text)] leading-tight line-clamp-2 group-hover:text-[var(--primary)] transition-colors">
                {product.title}
              </h3>
              <p className="line-clamp-1 text-[11px] mt-0.5 text-[var(--text-muted)]">
                {product.description}
              </p>
            </Link>

            <div className="flex items-center gap-1 mb-1.5">
              <Star
                size={11}
                className="fill-[var(--accent)] text-[var(--accent)]"
              />
              <span className="text-[11px] font-semibold text-[var(--text-secondary)]">
                {product.rating.rate}
              </span>
              <span className="text-[10px] text-[var(--text-muted)]">
                ({product.rating.count})
              </span>
            </div>

            <div className="flex items-baseline gap-1.5 mb-1.5">
              <span className="text-sm font-bold text-[var(--text)]">
                {formatPrice(product.price)}
              </span>
              <span className="text-[10px] text-[var(--text-muted)] line-through">
                {formatPrice(product.price * 1.4)}
              </span>
              <span className="text-[10px] font-bold text-green-600 bg-green-50/80 px-1.5 py-0.5 rounded ml-auto">
                -40%
              </span>
            </div>

            <div className="mt-auto pt-1.5 border-t border-[var(--border)]/50 flex items-center gap-1.5">
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-1.5 rounded-full transition-all ${
                  wishlist.includes(product.id)
                    ? "text-red-500 bg-red-50"
                    : "text-[var(--text-secondary)] hover:text-red-500 hover:bg-red-50"
                }`}
              >
                <Heart
                  size={14}
                  fill={wishlist.includes(product.id) ? "currentColor" : "none"}
                />
              </button>
              <button className="flex-1 py-1.5 rounded-md bg-[var(--primary)]/10 text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white transition-all text-[11px] font-medium flex items-center justify-center gap-1">
                <ShoppingBag size={13} />
                Add
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCards;
