import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";

import "swiper/css";

import bn1 from "../assets/ChatGPTImageJun18202607_25_24P.jpeg";
import bn2 from "../assets/Gemini_Generated_Image_7qx8g67qx8g67qx.jpeg";
import bn3 from "../assets/Gemini_Generated_Image_yazn9gyazn9gyaz.jpeg";

const Banner2 = () => {
  const slides = [
    { id: 1, image: bn1, link: "/chatgpt" },
    { id: 2, image: bn2, link: "/chatgpt" },
    { id: 3, image: bn3, link: "/chatgpt" },
    { id: 4, image: bn1, link: "/chatgpt" },
    { id: 5, image: bn2, link: "/chatgpt" },
    { id: 6, image: bn3, link: "/chatgpt" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-1 sm:px-6 lg:px-8 py-8 sm:py-12">
      <Swiper
        modules={[Autoplay]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        speed={800}
        spaceBetween={16}
        slidesPerView={1.5}
        breakpoints={{
          640: {
            slidesPerView: 2.5,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3.5,
            spaceBetween: 24,
          },
          1200: {
            slidesPerView: 4,
            spaceBetween: 24,
          },
        }}
        className="w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <Link
              to={slide.link}
              className="group relative  rounded-[var(--radius-xl)] overflow-hidden block"
            >
              <img
                src={slide.image}
                alt="Banner"
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 bg-[var(--background)]"
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner2;
