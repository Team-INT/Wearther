"use client";

import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Pagination, Scrollbar, A11y} from "swiper/modules";
import React from "react";
import {RecommendedProduct} from "@/types/product";

export default function RecommendCarousel({slides}: {slides: RecommendedProduct[]}) {
  return (
    <Swiper
      modules={[Pagination, Scrollbar, A11y]}
      spaceBetween={20}
      slidesPerView={1}
      breakpoints={{
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
      }}
      pagination={{clickable: true}}
      className="relative px-8"
    >
      {slides?.map((slide, index) => (
        <SwiperSlide key={index}>
          <div className="flex flex-col h-80 bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative h-48">
              <img src={slide.imageUrl} alt={slide.title} className="w-full h-full object-cover" />
              <span className="absolute top-2 left-2 bg-gray-800 text-white px-2 py-1 text-sm rounded">
                {slide.category}
              </span>
            </div>
            <div className="p-4 flex flex-col gap-1">
              <h3 className="font-medium text-gray-900 line-clamp-2">{slide.title}</h3>
              <p className="font-bold text-lg">{slide.price.toLocaleString()}원</p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
