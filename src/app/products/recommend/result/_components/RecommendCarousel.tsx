"use client";

// next
import Image from "next/image";

import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {Pagination, Scrollbar, A11y} from "swiper/modules";
import React from "react";
import {RecommendedProduct} from "@/lib/types/product";

export default function RecommendCarousel({productData}: {productData: RecommendedProduct[]}) {
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
      {productData?.map((slide, index) => (
        <SwiperSlide key={`${slide.title}-${index}`}>
          <div className="flex flex-col h-80 bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative h-48">
              <Image
                width={200}
                height={200}
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-2 left-2 bg-gray-800 text-white px-2 py-1 text-sm rounded">
                {slide.category1}
              </span>
            </div>
            <div className="p-4 flex flex-col gap-1">
              <h3 className="font-medium text-gray-900 line-clamp-2">{slide.title}</h3>
              <p className="font-bold text-lg">{slide.lprice.toLocaleString()}원</p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

// {
//   "title": "지프 <b>트레이닝복</b> 후디 <b>츄리닝</b> 기모 바지 팬츠",
//   "link": "https://smartstore.naver.com/main/products/10419402411",
//   "image": "https://shopping-phinf.pstatic.net/main_8796390/87963907397.1.jpg",
//   "lprice": "36900",
//   "hprice": "",
//   "mallName": "소네바",
//   "productId": "87963907397",
//   "productType": "2",
//   "brand": "지프",
//   "maker": "제이엔지",
//   "category1": "패션의류",
//   "category2": "남성의류",
//   "category3": "트레이닝복",
//   "category4": ""
// },
