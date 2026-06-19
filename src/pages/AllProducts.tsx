import React, { useState } from "react";
import {
  Filter,
  ChevronDown,
  ChevronUp,
  Star,
  X,
  SlidersHorizontal,
  Grid3X3,
  Check,
  ArrowUpDown,
  Heart,
  Sparkles,
  Shield,
  Droplets,
  Leaf,
  Zap,
  Tag,
  Package,
  Flame,
  ArrowLeft,
  type LucideIcon,
} from "lucide-react";
import ProductCards from "../components/ProductCards";

// ---------- Types ----------

interface FilterOption {
  value: string;
  label: string;
}

interface FilterGroup {
  id: string;
  label: string;
  icon: LucideIcon;
  type: "checkbox" | "radio";
  options: FilterOption[];
  selected: string[] | string | null;
}

type SectionKey =
  | "category"
  | "brand"
  | "price"
  | "rating"
  | "skinType"
  | "concern"
  | "ingredients"
  | "discount"
  | "availability";

// ---------- Component ----------

const AllProducts: React.FC = () => {
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState("relevance");
  const [sortOpen, setSortOpen] = useState(false);
  const [mobileSortOpen, setMobileSortOpen] = useState(false);

  const [openSections, setOpenSections] = useState<Record<SectionKey, boolean>>({
    category: true,
    brand: false,
    price: false,
    rating: false,
    skinType: false,
    concern: false,
    ingredients: false,
    discount: false,
    availability: false,
  });

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);
  const [selectedRating, setSelectedRating] = useState<string | null>(null);
  const [selectedSkinTypes, setSelectedSkinTypes] = useState<string[]>([]);
  const [selectedConcerns, setSelectedConcerns] = useState<string[]>([]);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [selectedDiscount, setSelectedDiscount] = useState<string | null>(null);
  const [inStockOnly, setInStockOnly] = useState(false);

  // ---- Helpers ----

  const toggleSection = (section: SectionKey) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const toggleArrayFilter = (
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    arr: string[],
    value: string
  ) => {
    setter(arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value]);
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setSelectedPrice(null);
    setSelectedRating(null);
    setSelectedSkinTypes([]);
    setSelectedConcerns([]);
    setSelectedIngredients([]);
    setSelectedDiscount(null);
    setInStockOnly(false);
  };

  const hasActiveFilters =
    selectedCategories.length > 0 ||
    selectedBrands.length > 0 ||
    selectedPrice ||
    selectedRating ||
    selectedSkinTypes.length > 0 ||
    selectedConcerns.length > 0 ||
    selectedIngredients.length > 0 ||
    selectedDiscount ||
    inStockOnly;

  const activeFilterCount =
    selectedCategories.length +
    selectedBrands.length +
    (selectedPrice ? 1 : 0) +
    (selectedRating ? 1 : 0) +
    selectedSkinTypes.length +
    selectedConcerns.length +
    selectedIngredients.length +
    (selectedDiscount ? 1 : 0) +
    (inStockOnly ? 1 : 0);

  // ---- Data ----

  const sortOptions = [
    { value: "relevance", label: "Relevance" },
    { value: "popularity", label: "Popularity" },
    { value: "bestSelling", label: "Best Selling" },
    { value: "newArrivals", label: "New Arrivals" },
    { value: "rating", label: "Customer Rating" },
    { value: "priceLow", label: "Price: Low to High" },
    { value: "priceHigh", label: "Price: High to Low" },
    { value: "discount", label: "Discount: High to Low" },
    { value: "latest", label: "Latest" },
    { value: "topReviewed", label: "Top Reviewed" },
  ];

  const filters: FilterGroup[] = [
    {
      id: "category",
      label: "Category",
      icon: Grid3X3,
      type: "checkbox",
      options: [
        { value: "all", label: "All Face Wash" },
        { value: "gel", label: "Gel Face Wash" },
        { value: "foam", label: "Foam Face Wash" },
        { value: "cream", label: "Cream Face Wash" },
        { value: "exfoliating", label: "Exfoliating Face Wash" },
      ],
      selected: selectedCategories,
    },
    {
      id: "brand",
      label: "Brand",
      icon: Tag,
      type: "checkbox",
      options: [
        { value: "cetaphil", label: "Cetaphil" },
        { value: "cerave", label: "CeraVe" },
        { value: "minimalist", label: "Minimalist" },
        { value: "neutrogena", label: "Neutrogena" },
        { value: "mamaearth", label: "Mamaearth" },
      ],
      selected: selectedBrands,
    },
    {
      id: "price",
      label: "Price",
      icon: ArrowUpDown,
      type: "radio",
      options: [
        { value: "under300", label: "Under ₹300" },
        { value: "300to700", label: "₹300–₹700" },
        { value: "700to1500", label: "₹700–₹1,500" },
        { value: "above1500", label: "Above ₹1,500" },
      ],
      selected: selectedPrice,
    },
    {
      id: "rating",
      label: "Customer Rating",
      icon: Star,
      type: "radio",
      options: [
        { value: "4", label: "4★ & Up" },
        { value: "3", label: "3★ & Up" },
      ],
      selected: selectedRating,
    },
    {
      id: "skinType",
      label: "Skin Type",
      icon: Droplets,
      type: "checkbox",
      options: [
        { value: "oily", label: "Oily" },
        { value: "dry", label: "Dry" },
        { value: "combination", label: "Combination" },
        { value: "sensitive", label: "Sensitive" },
        { value: "normal", label: "Normal" },
      ],
      selected: selectedSkinTypes,
    },
    {
      id: "concern",
      label: "Skin Concern",
      icon: Zap,
      type: "checkbox",
      options: [
        { value: "acne", label: "Acne & Pimples" },
        { value: "oil", label: "Oil Control" },
        { value: "hydration", label: "Hydration" },
        { value: "brightening", label: "Brightening" },
        { value: "darkspots", label: "Dark Spots" },
        { value: "blackheads", label: "Blackheads" },
      ],
      selected: selectedConcerns,
    },
    {
      id: "ingredients",
      label: "Ingredients",
      icon: Leaf,
      type: "checkbox",
      options: [
        { value: "salicylic", label: "Salicylic Acid" },
        { value: "niacinamide", label: "Niacinamide" },
        { value: "vitaminC", label: "Vitamin C" },
        { value: "hyaluronic", label: "Hyaluronic Acid" },
        { value: "teatree", label: "Tea Tree" },
        { value: "aloevera", label: "Aloe Vera" },
        { value: "charcoal", label: "Charcoal" },
      ],
      selected: selectedIngredients,
    },
    {
      id: "discount",
      label: "Discount",
      icon: Flame,
      type: "radio",
      options: [
        { value: "10", label: "10%+" },
        { value: "25", label: "25%+" },
        { value: "50", label: "50%+" },
      ],
      selected: selectedDiscount,
    },
  ];

  // ---- Handlers for radio filters ----

  const handleRadioChange = (filterId: string, value: string) => {
    switch (filterId) {
      case "price":
        setSelectedPrice(value);
        break;
      case "rating":
        setSelectedRating(value);
        break;
      case "discount":
        setSelectedDiscount(value);
        break;
    }
  };

  // ---- Handler for checkbox filters ----

  const handleCheckboxToggle = (filterId: string, value: string) => {
    switch (filterId) {
      case "category":
        toggleArrayFilter(setSelectedCategories, selectedCategories, value);
        break;
      case "brand":
        toggleArrayFilter(setSelectedBrands, selectedBrands, value);
        break;
      case "skinType":
        toggleArrayFilter(setSelectedSkinTypes, selectedSkinTypes, value);
        break;
      case "concern":
        toggleArrayFilter(setSelectedConcerns, selectedConcerns, value);
        break;
      case "ingredients":
        toggleArrayFilter(setSelectedIngredients, selectedIngredients, value);
        break;
    }
  };

  // ---- Remove single filter pill ----

  const removeFilter = (type: string, value: string) => {
    switch (type) {
      case "category":
        setSelectedCategories((prev) => prev.filter((v) => v !== value));
        break;
      case "brand":
        setSelectedBrands((prev) => prev.filter((v) => v !== value));
        break;
      case "price":
        setSelectedPrice(null);
        break;
      case "rating":
        setSelectedRating(null);
        break;
      case "discount":
        setSelectedDiscount(null);
        break;
      default:
        break;
    }
  };

  // ---- Filter content (shared between desktop & mobile) ----

  const FilterContent = () => (
    <div className="space-y-1">
      {filters.map((filter) => {
        const FilterIcon = filter.icon;
        const isOpen = openSections[filter.id as SectionKey];
        const isArray = Array.isArray(filter.selected);

        return (
          <div
            key={filter.id}
            className="border-b border-[var(--border)] last:border-0"
          >
            <button
              onClick={() => toggleSection(filter.id as SectionKey)}
              className="w-full flex items-center justify-between py-3 px-1 text-sm font-semibold text-[var(--text)] hover:text-[var(--primary)] transition-colors"
            >
              <span className="flex items-center gap-2">
                <FilterIcon
                  size={14}
                  className="text-[var(--text-secondary)]"
                />
                {filter.label}
              </span>
              {isOpen ? (
                <ChevronUp
                  size={14}
                  className="text-[var(--text-muted)]"
                />
              ) : (
                <ChevronDown
                  size={14}
                  className="text-[var(--text-muted)]"
                />
              )}
            </button>

            {isOpen && (
              <div className="pb-3 px-1 space-y-1.5">
                {filter.options.map((option) => (
                  <label
                    key={option.value}
                    className="flex items-center gap-2.5 cursor-pointer group py-1"
                  >
                    {filter.type === "checkbox" ? (
                      <input
                        type="checkbox"
                        checked={
                          isArray
                            ? (filter.selected as string[]).includes(
                                option.value
                              )
                            : false
                        }
                        onChange={() =>
                          handleCheckboxToggle(filter.id, option.value)
                        }
                        className="w-4 h-4 rounded border-gray-300 text-[var(--primary)] focus:ring-[var(--primary)]"
                      />
                    ) : (
                      <input
                        type="radio"
                        name={filter.id}
                        checked={filter.selected === option.value}
                        onChange={() =>
                          handleRadioChange(filter.id, option.value)
                        }
                        className="w-4 h-4 border-gray-300 text-[var(--primary)] focus:ring-[var(--primary)]"
                      />
                    )}
                    <span className="text-sm text-[var(--text-secondary)] group-hover:text-[var(--text)] transition-colors">
                      {option.label}
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>
        );
      })}

      {/* Availability toggle */}
      <div className="pt-3 px-1">
        <label className="flex items-center gap-2.5 cursor-pointer group">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => setInStockOnly(e.target.checked)}
            className="w-4 h-4 rounded border-gray-300 text-[var(--primary)] focus:ring-[var(--primary)]"
          />
          <span className="flex items-center gap-2 text-sm text-[var(--text-secondary)] group-hover:text-[var(--text)] transition-colors">
            <Package size={14} />
            In Stock
          </span>
        </label>
      </div>
    </div>
  );

  // ---- Active filter pills data ----

  const activePills: { type: string; value: string; label: string }[] = [];
  selectedCategories.forEach((v) =>
    activePills.push({
      type: "category",
      value: v,
      label: v,
    })
  );
  selectedBrands.forEach((v) =>
    activePills.push({
      type: "brand",
      value: v,
      label: v,
    })
  );
  if (selectedPrice)
    activePills.push({
      type: "price",
      value: selectedPrice,
      label: selectedPrice,
    });
  if (selectedRating)
    activePills.push({
      type: "rating",
      value: selectedRating,
      label: `${selectedRating}★ & Up`,
    });
  if (selectedDiscount)
    activePills.push({
      type: "discount",
      value: selectedDiscount,
      label: `${selectedDiscount}%+ off`,
    });

  // ---- Render ----

  return (
    <div className="min-h-screen bg-[var(--background)] pt-5 sm:pt-10 pb-12 sm:pb-16">
      <div className="max-w-7xl mx-auto px-1 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text)]">
            Face Wash
          </h1>
          <p className="text-sm text-[var(--text-muted)] mt-1">
            Find your perfect face wash
          </p>
        </div>

        <div className="flex gap-6">
          {/* ========== DESKTOP FILTER SIDEBAR ========== */}
          <div className="w-64 flex-shrink-0 hidden lg:block">
            <div className="bg-[var(--surface)] rounded-xl border border-[var(--border)] p-4 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-semibold text-[var(--text)] flex items-center gap-2">
                  <Filter size={16} />
                  Filters
                </h2>
                {hasActiveFilters && (
                  <button
                    onClick={clearAllFilters}
                    className="text-xs font-medium text-red-500 hover:text-red-600 transition-colors"
                  >
                    Clear All
                  </button>
                )}
              </div>
              <FilterContent />
            </div>
          </div>

          {/* ========== PRODUCT AREA ========== */}
          <div className="flex-1 min-w-0">
            {/* Sort + Active Filters Row */}
            <div className="flex flex-col gap-4 mb-6">
              <div className="flex items-center justify-between">
                <p className="text-sm text-[var(--text-muted)]">
                  <span className="font-medium text-[var(--text)]">
                    24 Products
                  </span>{" "}
                  found
                </p>

                {/* Desktop Sort Dropdown */}
                <div
                  className="hidden sm:block relative"
                  onMouseEnter={() => setSortOpen(true)}
                  onMouseLeave={() => setSortOpen(false)}
                >
                  <button className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-sm text-[var(--text-secondary)] hover:bg-[var(--background)] transition-colors">
                    <ArrowUpDown size={14} />
                    <span>Sort by:</span>
                    <span className="font-medium text-[var(--text)]">
                      {sortOptions.find((o) => o.value === sortBy)?.label}
                    </span>
                    <ChevronDown
                      size={14}
                      className={`transition-transform ${
                        sortOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {sortOpen && (
                    <div className="absolute right-0 top-full mt-1 bg-[var(--surface)] rounded-xl border border-[var(--border)] shadow-lg z-20 py-1 min-w-full w-max">
                      {sortOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => {
                            setSortBy(option.value);
                            setSortOpen(false);
                          }}
                          className={`w-full flex items-center justify-between gap-4 px-4 py-2.5 text-sm whitespace-nowrap transition-colors ${
                            sortBy === option.value
                              ? "text-[var(--primary)] bg-[var(--primary)]/5 font-medium"
                              : "text-[var(--text-secondary)] hover:bg-[var(--background)]"
                          }`}
                        >
                          {option.label}
                          {sortBy === option.value && (
                            <Check
                              size={16}
                              className="text-[var(--primary)] flex-shrink-0"
                            />
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Active Filter Pills */}
              {hasActiveFilters && (
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs text-[var(--text-muted)]">
                    Filters:
                  </span>
                  {activePills.map((pill) => (
                    <button
                      key={`${pill.type}-${pill.value}`}
                      onClick={() => removeFilter(pill.type, pill.value)}
                      className="inline-flex items-center gap-1.5 text-xs pl-2.5 pr-1.5 py-1 rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-colors group"
                    >
                      {pill.label}
                      <X
                        size={12}
                        className="group-hover:text-red-500"
                      />
                    </button>
                  ))}
                  <button
                    onClick={clearAllFilters}
                    className="text-xs font-medium text-red-500 hover:text-red-600 transition-colors ml-1"
                  >
                    Clear All
                  </button>
                </div>
              )}
            </div>

            <ProductCards />
          </div>
        </div>
      </div>

      {/* ========== MOBILE BOTTOM BAR ========== */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-[var(--surface)] border-t border-[var(--border)] z-30 flex items-center">
        <button
          onClick={() => setMobileFilterOpen(true)}
          className="flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium text-[var(--text)] hover:bg-[var(--background)] transition-colors border-r border-[var(--border)]"
        >
          <SlidersHorizontal size={16} />
          Filters
          {hasActiveFilters && (
            <span className="w-5 h-5 rounded-full bg-[var(--primary)] text-white text-[10px] flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setMobileSortOpen(true)}
          className="flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium text-[var(--text)] hover:bg-[var(--background)] transition-colors"
        >
          <ArrowUpDown size={16} />
          Sort
        </button>
      </div>

      {/* ========== MOBILE FILTER PANEL (full-screen) ========== */}
      {mobileFilterOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-[var(--background)] flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)] bg-[var(--surface)]">
            <button
              onClick={() => setMobileFilterOpen(false)}
              className="p-1"
            >
              <X size={20} className="text-[var(--text)]" />
            </button>
            <h2 className="text-base font-semibold text-[var(--text)]">
              Filters
            </h2>
            {hasActiveFilters ? (
              <button
                onClick={clearAllFilters}
                className="text-sm font-medium text-red-500"
              >
                Clear All
              </button>
            ) : (
              <div className="w-16" />
            )}
          </div>

          {/* Scrollable filters */}
          <div className="flex-1 overflow-y-auto px-4 py-4">
            <FilterContent />
          </div>

          {/* Bottom action buttons */}
          <div className="px-4 py-3 border-t border-[var(--border)] bg-[var(--surface)] flex gap-3">
            <button
              onClick={() => setMobileFilterOpen(false)}
              className="flex-1 py-3 border border-[var(--border)] text-[var(--text)] rounded-lg font-medium text-sm hover:bg-[var(--background)] transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => setMobileFilterOpen(false)}
              className="flex-1 py-3 bg-[var(--primary)] text-white rounded-lg font-medium text-sm hover:opacity-90 transition-opacity"
            >
              Apply
            </button>
          </div>
        </div>
      )}

      {/* ========== MOBILE SORT PANEL (full-screen) ========== */}
      {mobileSortOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-[var(--background)] flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)] bg-[var(--surface)]">
            <button
              onClick={() => setMobileSortOpen(false)}
              className="p-1"
            >
              <X size={20} className="text-[var(--text)]" />
            </button>
            <h2 className="text-base font-semibold text-[var(--text)]">
              Sort By
            </h2>
            <div className="w-12" />
          </div>

          {/* Sort options */}
          <div className="flex-1 overflow-y-auto py-2">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  setSortBy(option.value);
                  setMobileSortOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-3 text-sm transition-colors ${
                  sortBy === option.value
                    ? "text-[var(--primary)] bg-[var(--primary)]/5 font-medium"
                    : "text-[var(--text-secondary)] hover:bg-[var(--background)]"
                }`}
              >
                {option.label}
                {sortBy === option.value && (
                  <Check
                    size={16}
                    className="text-[var(--primary)]"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Spacer for mobile bottom bar */}
      <div className="lg:hidden h-14" />
    </div>
  );
};

export default AllProducts;