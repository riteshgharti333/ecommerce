import React from "react";
import { Link } from "react-router-dom";
import { Sparkles, ArrowRight } from "lucide-react";

// Import real category images
import skincareImg from "../assets/data/categories/johanne-pold-jacobsen-XYkc3MfT7b4-unsplash-100kb (1).jpg";
import haircareImg from "../assets/data/categories/jovs-beauty-7HOFZoUpXYE-unsplash-100kb.jpg";
import bodycareImg from "../assets/data/categories/prahant-studio-djftKZT4jnE-unsplash-100kb (1).jpg";
import makeupImg from "../assets/data/categories/stacy-1OGUHdT-JU8-unsplash-100kb (1).jpg";
import lipcareImg from "../assets/data/categories/the-skin-and-the-beard-story-T1IQEZET7u0-unsplash-100kb (1).jpg";

const Category = () => {
  const categories = [
    {
      id: 1,
      name: "Skin Care",
      image: skincareImg,
      itemCount: "24 Products",
      description: "Cleansers, serums & moisturizers",
      color: "from-rose-400 to-pink-300",
      href: "/skincare",
    },
    {
      id: 2,
      name: "Hair Care",
      image: haircareImg,
      itemCount: "18 Products",
      description: "Shampoos, oils & treatments",
      color: "from-amber-400 to-yellow-300",
      href: "/haircare",
    },
    {
      id: 3,
      name: "Body Care",
      image: bodycareImg,
      itemCount: "20 Products",
      description: "Lotions, scrubs & washes",
      color: "from-emerald-400 to-green-300",
      href: "/bodycare",
    },
    {
      id: 4,
      name: "Makeup",
      image: makeupImg,
      itemCount: "32 Products",
      description: "Foundations, eyes & cheeks",
      color: "from-purple-400 to-violet-300",
      href: "/makeup",
    },
    {
      id: 5,
      name: "Lip Care",
      image: lipcareImg,
      itemCount: "15 Products",
      description: "Balms, glosses & tints",
      color: "from-red-400 to-orange-300",
      href: "/lipcare",
    },
  ];

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-1 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
         
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
            Shop by Category
           
          </h2>
          
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={category.href}
              className="group relative flex flex-col items-center"
            >
              {/* Image Container */}
              <div className="relative w-full aspect-square rounded-[var(--radius-sm)] overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2">
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-20 group-hover:opacity-30 transition-opacity duration-500 z-10`} />
                
                {/* Real Image */}
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 flex items-end justify-center pb-4">
                  <span className="text-white text-sm font-semibold flex items-center gap-1.5 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                    Explore <ArrowRight size={14} />
                  </span>
                </div>

                {/* Item Count Badge */}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-semibold text-gray-700 shadow-sm z-20">
                  {category.itemCount}
                </div>
              </div>

              {/* Category Info */}
              <div className="mt-3 sm:mt-4 text-center">
                <h3 className="text-sm sm:text-base font-bold text-gray-900 group-hover:text-[var(--primary)] transition-colors">
                  {category.name}
                </h3>
                <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5 sm:mt-1 hidden sm:block">
                  {category.description}
                </p>
              </div>

              {/* Decorative Dot Indicator */}
              <div className="mt-2 w-1.5 h-1.5 rounded-full bg-[var(--primary)] opacity-0 group-hover:opacity-100 transition-all duration-300" />
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Category;