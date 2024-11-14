"use client";

import React from "react";
import Image from "next/image";
import {Swiper, SwiperSlide} from "swiper/react";
import {Pagination, Scrollbar, A11y} from "swiper/modules";
import {RecommendedProduct} from "@/lib/types/product";

// utils
import {cn} from "@/lib/utils";
import {parseBoldText} from "@/utils/parse";

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
      // pagination={{clickable: true}}
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
    <a
      href={product.link}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col h-80 bg-white rounded-lg shadow-md overflow-hidden"
    >
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
          loading="lazy"
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
            <h3
              className="font-medium text-gray-900 line-clamp-2"
              dangerouslySetInnerHTML={{__html: parseBoldText(product.title)}}
            ></h3>
            <dl>
              <dt>{Number(product.lprice).toLocaleString()}원</dt>
              <dd>{product?.brand}</dd>
            </dl>
          </>
        )}
      </div>
    </a>
  );
}

// {
//   "title": "헬스복 남자 <b>트레이닝복</b> 바지 <b>츄리닝</b> 트레이닝 트랙 조거팬츠 헬스 운동 체육복 런닝 짐웨어",
//   "link": "https://smartstore.naver.com/main/products/9935274482",
//   "image": "https://shopping-phinf.pstatic.net/main_8747977/87479776756.1.jpg",
//   "lprice": "10900",
//   "hprice": "",
//   "mallName": "SOLID",
//   "productId": "87479776756",
//   "productType": "2",
//   "brand": "솔리드",
//   "maker": "",
//   "category1": "패션의류",
//   "category2": "남성의류",
//   "category3": "트레이닝복",
//   "category4": ""
// },
// {
//   "title": "나이키 드라이핏 스우시 트레이닝 팬츠 운동 런닝 아디다스 <b>츄리닝</b> 일자 조거 기모 긴바지",
//   "link": "https://smartstore.naver.com/main/products/5370976277",
//   "image": "https://shopping-phinf.pstatic.net/main_8291546/82915469411.6.jpg",
//   "lprice": "29800",
//   "hprice": "",
//   "mallName": "스포티제이",
//   "productId": "82915469411",
//   "productType": "2",
//   "brand": "나이키",
//   "maker": "나이키",
//   "category1": "패션의류",
//   "category2": "남성의류",
//   "category3": "트레이닝복",
//   "category4": ""
// },
