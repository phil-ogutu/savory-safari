import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "./carousel.css";

const ImageCarousel = ({ height = "h-[520px]" }) => {
  const images = [
    "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
    "https://images.pexels.com/photos/2454533/pexels-photo-2454533.jpeg",
    "https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg",
    "https://images.pexels.com/photos/17104961/pexels-photo-17104961.jpeg",
  ];

  return (
    <div className={`w-full max-w-3xl mx-auto pb-8`}>
      <Swiper
        modules={[Pagination, Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={true}
        slidesPerView={1}
        speed={1500}
      >
        {images.map((url, i) => (
          <SwiperSlide key={i}>
            <img
              src={url}
              alt={`Slide ${i}`}
              className={`w-full rounded-xl object-cover ${height}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageCarousel;
