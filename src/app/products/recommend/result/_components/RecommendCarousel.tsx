"use client";

import React, {useState} from "react";
import Image from "next/image";
import {Swiper, SwiperSlide} from "swiper/react";
import {Pagination, Scrollbar, A11y} from "swiper/modules";
import {RecommendedProduct} from "@/lib/types/product";

// utils
import {cn} from "@/lib/utils";

// hooks
import {useImageLoading} from "@/lib/hooks/useImageLoading";

// styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

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
          slidesPerView: 3.5,
          spaceBetween: 30,
        },
      }}
      pagination={{clickable: true}}
      className="relative px-8"
    >
      {productData?.map((slide, index) => (
        <SwiperSlide key={`${slide.title}-${index}`}>
          <ProductCard product={slide} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

function ProductCard({product}: {product: RecommendedProduct}) {
  const {isLoading, handleLoadingComplete, imageStyles} = useImageLoading();

  return (
    <div className="flex flex-col h-80 bg-white rounded-lg shadow-md overflow-hidden">
      <div className={imageStyles.container}>
        {/* 스켈레톤 UI */}
        <div className={imageStyles.skeleton} style={{transition: "opacity 0.3s ease-in-out"}} />

        {/* 실제 이미지 */}
        <Image
          width={200}
          height={200}
          src={product.image}
          alt={product.title}
          className={imageStyles.image}
          style={{transition: "opacity 0.3s ease-in-out"}}
          onLoadingComplete={handleLoadingComplete}
        />

        {/* 카테고리 뱃지 */}
        <span
          className={cn(
            "absolute top-2 left-2 bg-gray-800 text-white px-2 py-1 text-sm rounded",
            isLoading ? "opacity-0" : "opacity-100"
          )}
          style={{transition: "opacity 0.3s ease-in-out"}}
        >
          {product.category1}
        </span>
      </div>

      {/* 상품 정보 */}
      <div className="p-4 flex flex-col gap-1">
        {isLoading ? (
          <>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
            <div className="h-6 bg-gray-200 rounded w-1/2" />
          </>
        ) : (
          <>
            <h3 className="font-medium text-gray-900 line-clamp-2">{product.title}</h3>
            <p className="font-bold text-lg">{product.lprice.toLocaleString()}원</p>
          </>
        )}
      </div>
    </div>
  );
}
