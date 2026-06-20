import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

// Reusable Coupon Card Component
const CouponCard = ({
  topColor = "from-pink-300 to-pink-100",
  badgeText = "EXTRA",
  discount = "5% OFF",
  subText = "on Sunscreens & Serum*",
  code = "SCREEN5",
  iconBg = "bg-pink-400",
}) => {
  return (
    <div className="relative w-full bg-white rounded-[var(--radius-md)] overflow-hidden border border-gray-100 transition-transform shadow-md hover:scale-105 duration-300">
      {/* Top Colored Section */}
      <div
        className={`bg-gradient-to-br ${topColor} p-3 xs:p-4 sm:p-6 flex flex-col items-center justify-center text-center h-24 xs:h-28 sm:h-32 lg:h-40 relative`}
      >
        {/* Subtle decorative circle in background */}
        <div className="absolute top-[-20px] right-[-20px] w-24 h-24 bg-white/10 rounded-full pointer-events-none"></div>
        <div className="absolute bottom-[-30px] left-[-30px] w-32 h-32 bg-white/10 rounded-full pointer-events-none"></div>

        <span className="text-purple-900/70 font-bold tracking-widest text-[8px] xs:text-[10px] sm:text-xs uppercase mb-1">
          {badgeText}
        </span>
        <h3 className="text-lg xs:text-xl sm:text-2xl lg:text-3xl font-black text-purple-900 leading-none mb-1">
          {discount}
        </h3>
        <p className="text-[8px] xs:text-[10px] sm:text-xs font-medium text-purple-800/90 text-center px-1">
          {subText}
        </p>
      </div>

      {/* Scalloped Divider */}
      <div className="h-2 w-full relative flex items-center justify-center -my-1 z-10">
        <div className="w-full h-full bg-white"></div>
        <div className="absolute top-0 left-0 w-full h-2 border-b-2 border-dashed border-purple-200"></div>
        <div className="absolute -top-1 left-0 w-full flex justify-between px-2">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 xs:w-2.5 xs:h-2.5 sm:w-3 sm:h-3 bg-white rounded-full border-2 border-purple-200"
            ></div>
          ))}
        </div>
      </div>

      {/* Bottom Code Section */}
      <div className="bg-white p-3 xs:p-4 sm:p-6 pt-2 xs:pt-3 sm:pt-4 flex flex-col items-center justify-center relative">
        <span className="text-[8px] xs:text-[10px] sm:text-xs text-gray-500 font-medium tracking-wide mb-0.5 xs:mb-1 sm:mb-2">
          USE CODE:
        </span>
        <p className="text-sm xs:text-base sm:text-lg lg:text-2xl font-extrabold text-gray-800 tracking-widest">
          {code}
        </p>
      </div>
    </div>
  );
};

// Main Component
const Disc = () => {
  const offers = [
    {
      topColor: "from-fuchsia-300 to-purple-200",
      badgeText: "EXTRA",
      discount: "5% OFF",
      subText: "on Sunscreens & Serum*",
      code: "SCREEN5",
      iconBg: "bg-fuchsia-500",
    },
    {
      topColor: "from-indigo-300 to-blue-200",
      badgeText: "GET",
      discount: "₹75 OFF",
      subText: "on orders above ₹1499*",
      code: "CLAIM75OFF",
      iconBg: "bg-indigo-500",
    },
    {
      topColor: "from-violet-300 to-purple-200",
      badgeText: "EXTRA",
      discount: "5% OFF",
      subText: "on all orders*",
      code: "JUNE5OFF",
      iconBg: "bg-violet-500",
    },
    {
      topColor: "from-rose-300 to-pink-200",
      badgeText: "SAVE",
      discount: "10% OFF",
      subText: "on first order*",
      code: "WELCOME10",
      iconBg: "bg-rose-500",
    },
    {
      topColor: "from-amber-300 to-yellow-200",
      badgeText: "FLAT",
      discount: "₹200 OFF",
      subText: "on orders above ₹2499*",
      code: "FLAT200",
      iconBg: "bg-amber-500",
    },
    {
      topColor: "from-emerald-300 to-green-200",
      badgeText: "BONUS",
      discount: "15% OFF",
      subText: "on skincare combo*",
      code: "GLOW15",
      iconBg: "bg-emerald-500",
    },
  ];

  return (
    <div className="py-6 sm:py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-1 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-7 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
            Exclusive Offers
          </h2>
        </div>

        <Swiper
          modules={[Autoplay]}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop={false}
          speed={800}
          spaceBetween={12}
          slidesPerView={2.2}
          breakpoints={{
            360: {
              slidesPerView: 2.2,
              spaceBetween: 10,
            },
            480: {
              slidesPerView: 2.5,
              spaceBetween: 12,
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
              slidesPerView: 4.2,
              spaceBetween: 24,
            },
          }}
          className="w-full"
        >
          {offers.map((offer, index) => (
            <SwiperSlide key={index} className="my-2">
              <CouponCard {...offer} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Disc;
