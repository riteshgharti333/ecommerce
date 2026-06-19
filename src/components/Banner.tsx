import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Pagination,
  Navigation,
  EffectFade,
  Parallax,
} from "swiper/modules";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Leaf, Star } from "lucide-react";

// Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

import bn1 from "../assets/bn1.jpeg";
import bn2 from "../assets/bn2.jpeg";
import bn3 from "../assets/bn3.jpeg";
import bn4 from "../assets/bn4.jpeg";

const Banner = () => {
  const slides = [
    {
      id: 1,
      image: bn1,
      title: "Natural Glow,\nRadiant You",
      subtitle: "Discover our new Vitamin C Collection",
      tag: "New Arrival",
      cta: "Shop Collection",
      badge: "20% Off Launch",
      color: "from-green-900/60",
      accent: "#2E7D32",
    },
    {
      id: 2,
      image: bn2,
      title: "Luxury Skincare,\nCrafted by Nature",
      subtitle: "Premium ingredients for your daily ritual",
      tag: "Best Seller",
      cta: "Explore Products",
      badge: "Free Shipping",
      color: "from-amber-900/60",
      accent: "#D4AF37",
    },
    {
      id: 3,
      image: bn3,
      title: "Your Journey to\nPerfect Skin",
      subtitle: "Scientifically proven natural formulas",
      tag: "Popular",
      cta: "Start Your Routine",
      badge: "Rated 4.8/5",
      color: "from-rose-900/60",
      accent: "#E11D48",
    },
    {
      id: 4,
      image: bn4,
      title: "Reveal Your\nInner Glow",
      subtitle: "Transform your skin with natural ingredients",
      tag: "Featured",
      cta: "Discover More",
      badge: "Best Value",
      color: "from-purple-900/60",
      accent: "#7C3AED",
    },
  ];

  return (
    <div className="relative">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade, Parallax]}
        effect="fade"
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          renderBullet: (index, className) => {
            return `<span class="${className} custom-bullet">
        <span class="bullet-inner" style="background: ${slides[index].accent}"></span>
      </span>`;
          },
        }}
        navigation={false}
        loop={true}
        parallax={true}
        speed={1000}
        autoHeight={true}
        className="w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-auto"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom CSS */}
      <style>{`
        .custom-bullet {
          width: 40px !important;
          height: 4px !important;
          border-radius: 10px !important;
          background: rgba(255, 255, 255, 0.3) !important;
          opacity: 1 !important;
          margin: 0 6px !important;
          transition: all 0.3s ease;
        }
        .custom-bullet.swiper-pagination-bullet-active {
          width: 60px !important;
          background: rgba(255, 255, 255, 0.5) !important;
        }
        .bullet-inner {
          display: block;
          width: 100%;
          height: 100%;
          border-radius: 10px;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .swiper-pagination-bullet-active .bullet-inner {
          opacity: 1;
        }
        .swiper-button-next,
        .swiper-button-prev {
          color: white !important;
          width: 50px !important;
          height: 50px !important;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: all 0.3s ease;
          opacity: 0;
        }
        .group:hover .swiper-button-next,
        .group:hover .swiper-button-prev {
          opacity: 1;
        }
        .swiper-button-next:hover,
        .swiper-button-prev:hover {
          background: rgba(255, 255, 255, 0.2);
        }
        .swiper-button-next::after,
        .swiper-button-prev::after {
          font-size: 18px !important;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
        .animation-delay-600 {
          animation-delay: 0.6s;
        }
        .animation-delay-800 {
          animation-delay: 0.8s;
        }
        .animation-delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </div>
  );
};

export default Banner;
