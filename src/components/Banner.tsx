import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Pagination,
  Navigation,
  EffectFade,
  Parallax,
} from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { banners } from "../assets/data/bannerData";

// Import banners data

const Banner = () => {
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
          el: ".custom-pagination",
        }}
        navigation={false}
        loop={true}
        parallax={true}
        speed={1000}
        autoHeight={true}
        className="w-full"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <div className="relative">
              {/* Desktop Image */}
              <img
                src={banner.desktop}
                alt={`Banner ${banner.id}`}
                className="hidden sm:block w-full h-auto"
              />
              {/* Mobile Image */}
              <img
                src={banner.mobile}
                alt={`Banner ${banner.id}`}
                className="block sm:hidden w-full h-auto object-contain"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Pagination - Outside the swiper */}
      <div className="custom-pagination flex justify-center items-center gap-3 py-4 bg-white"></div>

      {/* Custom CSS */}
      <style>{`
        .custom-pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 10px;
        }

        .custom-bullet {
          width: 7px !important;
          height: 7px !important;
          border-radius: 50% !important;
          background: #D1D5DB !important;
          opacity: 1 !important;
          margin: 0 !important;
          transition: all 0.3s ease;
          cursor: pointer;
          display: inline-block;
        }

        .custom-bullet.swiper-pagination-bullet-active {
          width: 10px !important;
          height: 10px !important;
          background: var(--primary, #2E7D32) !important;
          transform: scale(1.2);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }

        /* Remove default swiper pagination */
        .swiper-pagination {
          display: none !important;
        }
      `}</style>
    </div>
  );
};

export default Banner;