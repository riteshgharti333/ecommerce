import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Sparkles, ArrowRight, Shield, AlertCircle } from "lucide-react";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";

const dand =
  "https://plus.unsplash.com/premium_photo-1733317329824-7028adef050a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZGFuZHJ1ZmZ8ZW58MHwxfDB8fHww";

const acne =
  "https://plus.unsplash.com/premium_photo-1683140815244-7441fd002195?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YWNuZXxlbnwwfDF8MHx8fDA%3D";

const dry =
  "https://images.unsplash.com/photo-1619451427882-6aaaded0cc61?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZHJ5JTIwc2tpbnxlbnwwfDF8MHx8fDA%3D";

const hair =
  "https://images.unsplash.com/photo-1711274092450-ead7a2c364fb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGhhaXIlMjBmYWxsfGVufDB8MXwwfHx8MA%3D%3D";

const oily =
  "https://images.unsplash.com/photo-1655026392641-bf283a5f12d4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8b2lseSUyMHNraW58ZW58MHwxfDB8fHww";

const ShopByConcern = () => {
  const concerns = [
    {
      id: 1,
      name: "Acne & Pimples",
      image: acne,
      products: "12 Products",
      description: "Clear breakouts & prevent acne",
      color: "from-teal-400 to-emerald-300",
      bgBadge: "bg-teal-100",
      textBadge: "text-teal-700",
      href: "/concerns/acne",
    },
    {
      id: 2,
      name: "Dry Skin",
      image: dry,
      products: "15 Products",
      description: "Deep hydration & moisture lock",
      color: "from-sky-400 to-blue-300",
      bgBadge: "bg-sky-100",
      textBadge: "text-sky-700",
      href: "/concerns/dry-skin",
    },
    {
      id: 3,
      name: "Hair Fall",
      image: hair,
      products: "10 Products",
      description: "Strengthen roots & reduce fall",
      color: "from-amber-400 to-orange-300",
      bgBadge: "bg-amber-100",
      textBadge: "text-amber-700",
      href: "/concerns/hair-fall",
    },

    {
      id: 6,
      name: "Oily Skin",
      image: oily,
      products: "11 Products",
      description: "Control excess oil & shine",
      color: "from-lime-400 to-green-300",
      bgBadge: "bg-lime-100",
      textBadge: "text-lime-700",
      href: "/concerns/oily-skin",
    },
    {
      id: 7,
      name: "Dandruff",
      image: dand,
      products: "9 Products",
      description: "Flake-free scalp & healthy hair",
      color: "from-cyan-400 to-teal-300",
      bgBadge: "bg-cyan-100",
      textBadge: "text-cyan-700",
      href: "/concerns/dandruff",
    },
  ];

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-1 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
            Shop by Concern
          </h2>
        </div>

        {/* Swiper Container */}
        <div className="relative concern-swiper-container">
          <Swiper
            modules={[Navigation]}
            navigation={{
              nextEl: ".concern-next",
              prevEl: ".concern-prev",
            }}
            spaceBetween={12}
            slidesPerView={2.2}
            breakpoints={{
              360: {
                slidesPerView: 2.2,
                spaceBetween: 12,
              },
              480: {
                slidesPerView: 2.5,
                spaceBetween: 14,
              },
              640: {
                slidesPerView: 3.2,
                spaceBetween: 16,
              },
              768: {
                slidesPerView: 3.5,
                spaceBetween: 16,
              },
              1024: {
                slidesPerView: 4.2,
                spaceBetween: 20,
              },
              1280: {
                slidesPerView: 4.5,
                spaceBetween: 24,
              },
            }}
            className="w-full"
          >
            {concerns.map((concern) => (
              <SwiperSlide key={concern.id}>
                <Link
                  to={concern.href}
                  className="group relative flex flex-col"
                >
                  {/* Image Container */}
                  <div className="relative w-full aspect-[3/4]  rounded-[var(--radius-md)] overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-500 group-hover:-translate-y-1">
                    {/* Gradient Overlay */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${concern.color} opacity-20 group-hover:opacity-30 transition-opacity duration-500 z-10`}
                    />

                    {/* Image */}
                    <img
                      src={concern.image}
                      alt={concern.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />

                    {/* Bottom Gradient Overlay */}
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent z-20" />

                    {/* Content on Image */}
                    <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 z-30">
                      <h3 className="text-white text-sm sm:text-base lg:text-lg font-bold mb-1 group-hover:text-white/90 transition-colors">
                        {concern.name}
                      </h3>
                      <p className="text-white/80 text-[10px] sm:text-xs mb-2 hidden sm:block">
                        {concern.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span
                          className={`${concern.bgBadge} ${concern.textBadge} text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full backdrop-blur-sm`}
                        >
                          {concern.products}
                        </span>
                        <ArrowRight
                          size={14}
                          className="text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-0 group-hover:translate-x-1"
                        />
                      </div>
                    </div>

                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 pointer-events-none" />
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Arrows */}
          <button className="concern-prev absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 bg-white shadow-lg rounded-full flex items-center justify-center opacity-0 lg:opacity-100 transition-all duration-300 hover:bg-gray-50 hover:shadow-xl -translate-x-4 sm:-translate-x-6 disabled:opacity-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-700"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button className="concern-next absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 bg-white shadow-lg rounded-full flex items-center justify-center opacity-0 lg:opacity-100 transition-all duration-300 hover:bg-gray-50 hover:shadow-xl translate-x-4 sm:translate-x-6 disabled:opacity-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-700"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ShopByConcern;
