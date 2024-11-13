"use client";

import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {Navigation, Pagination, Scrollbar, A11y} from "swiper/modules";
import React from "react";

interface RecommendCarouselProps {
  slides: any;
}

export default function RecommendCarousel({slides}: RecommendCarouselProps) {
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      pagination={{clickable: true}}
      scrollbar={{draggable: true}}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log("slide change")}
    >
      {slides?.map((slide: any, index: number) => (
        <SwiperSlide key={index}>
          <div className="flex items-center justify-center h-72 bg-gray-200 rounded-lg shadow-md text-xl font-bold">
            {slide.name}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
