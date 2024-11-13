import React from "react";
import Image from "next/image";

// components
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";
import RecommendYoutube from "./_components/RecommendYoutube";
import RecommendCarousel from "./_components/RecommendCarousel";
import {ShareButton} from "./_components/ShareButton";

// types
import {RecommendedProduct} from "@/types/product";

// icons
import {Youtube, Instagram} from "lucide-react";

// 응답 데이터 모킹
const recommendationData = {
  info: {
    summary: "50대 여성의 결혼식 참석을 위한 정장 스타일 추천.",
    details:
      "맑은 봄 날씨에 어울리는 단정한 정장스타일로, 다음과 같은 착장을 추천합니다. 하늘색 또는 연한 핑크색의 **블레이저**와 같은 경량 자켓 위에 **흰색 블라우스**를 매치해줍니다. 하의로는 체형에 맞는 직거울 실루엣의 **슬랙스**나 기장은 적당하고 허리선을 정리해줄 수 있는 **롱 스커트**도 좋습니다. 포멀함을 더하기 위해 반드시 심플한-h 의 가벼운 페이턴으츠 앵클부츠로 섬세하게 매칭하고, 액세서리 역시 은은한 귀걸이나 매칭되는 목걸이 등으로 포인트를 주는 것이 좋습니다.",
    keywords: ["50대 여성", "봄 결혼식", "정장 스타일", "단정한 룩", "폴리소재 빈티지 블레이저"],
    related: ["블레이저", "타이트 스커트", "고급스러운 지갑", "컬러 매치"],
    weather: {
      temperature: 20,
      condition: "맑음",
      humidity: 50,
      wind_speed: 10,
    },
  },
};

const recommendedProducts: RecommendedProduct[] = [
  {
    id: 1,
    title: "제품명 1",
    price: 10000,
    imageUrl: "/temp/temp_cloth.jpg",
    url: "/products/1",
    category: "의류",
  },
  {
    id: 2,
    title: "제품명 2",
    price: 20000,
    imageUrl: "/temp/temp_cloth.jpg",
    url: "/products/2",
    category: "신발",
  },
  {
    id: 1,
    title: "제품명 1",
    price: 10000,
    imageUrl: "/temp/temp_cloth.jpg",
    url: "/products/1",
    category: "의류",
  },
  {
    id: 2,
    title: "제품명 2",
    price: 20000,
    imageUrl: "/temp/temp_cloth.jpg",
    url: "/products/2",
    category: "신발",
  },
  {
    id: 1,
    title: "제품명 1",
    price: 10000,
    imageUrl: "/temp/temp_cloth.jpg",
    url: "/products/1",
    category: "의류",
  },
  {
    id: 2,
    title: "제품명 2",
    price: 20000,
    imageUrl: "/temp/temp_cloth.jpg",
    url: "/products/2",
    category: "신발",
  },
];

export default function RecommendResultPage() {
  const boldKeywords = (text: string) => {
    return text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">맞춤 스타일 추천 결과</h2>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>추천 요약</CardTitle>
            <CardDescription className="w-[80%] md:w-full">
              {recommendationData.info.summary}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p
              className="mb-4"
              dangerouslySetInnerHTML={{__html: boldKeywords(recommendationData.info.details)}}
            ></p>
            <div className="flex flex-wrap gap-2 mb-4">
              {recommendationData.info.keywords.map((keyword, index) => (
                <Badge key={index} variant="secondary">
                  {keyword}
                </Badge>
              ))}
            </div>
            <Separator className="my-4" />
            <h3 className="text-lg font-semibold mb-2">관련 아이템</h3>
            <ul className="list-disc pl-5">
              {recommendationData.info.related.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>추천 상품</CardTitle>
          </CardHeader>
          <CardContent>
            {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {productInfo.recommendedProducts.map((product) => (
                <div key={product.id} className="text-center">
                  <a
                    href={productInfo.recommendedProducts.productDetailUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      width={200}
                      height={200}
                      src={product?.image}
                      alt={product?.name}
                      className="w-full h-auto mb-2 rounded"
                    />
                  </a>
                  <p className="font-semibold">{product.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {product.price.toLocaleString()}원
                  </p>
                </div>
              ))}
            </div> */}
            <RecommendCarousel slides={recommendedProducts} />
            <Button className="w-full mt-4" variant="outline" asChild>
              연관 상품 더보기
            </Button>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>관련 콘텐츠</CardTitle>
          </CardHeader>
          <CardContent>
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <Youtube className="mr-2" /> 유튜브 영상
            </h3>
            <RecommendYoutube recommendationData={recommendationData} />
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <Instagram className="mr-2" /> 인스타그램 게시물
            </h3>
            {/* <RecommendInstagram /> */}
          </CardContent>
        </Card>

        <div className="fixed bottom-0 left-0 right-0 bg-background p-4 border-t">
          <div className="max-w-4xl mx-auto">
            <ShareButton />
          </div>
        </div>
      </div>
    </div>
  );
}
// 응답값
// 1. 추천 상품 리스트
// 2. 추천 상품 리스트 중 하나의 상품 상세 페이지 URL
// 3. 연관 유튜브 영상 리스트
// 4. 인스타그램 연관 게시물?

// 응답 예시
// INPUT
// {
//   "age": "50대",
//   "gender": "여성",
//   "season": "봄",
//   "weather": "맑음",
//   "style": "정장",
//   "mood": "단정한",
//   "additionalInfo": "친한 동생의 딸의 결혼식을 가기로 했어요."
// }

// OUTPUT
// {
//   "success_response": {
//       "status": 200,
//       "data": {
//           "info": {
//               "summary": "패션 추천 결과입니다.",
//               "details": {
//                   "status": 200,
//                   "data": {
//                       "info": {
//                           "summary": "50대 여성의 결혼식 참석을 위한 정장 스타일 추천.",
//                           "details": "맑은 봄 날씨에 어울리는 단정한 정장스타일로, 다음과 같은 착장을 추천합니다. 하늘색 또는 연한 핑크색의 **블레이저**와 같은 경량 자켓 위에 **흰색 블라우스**를 매치해줍니다. 하의로는 체형에 맞는 직거울 실루엣의 **슬랙스**나 기장은 적당하고 허리선을 정리해줄 수 있는 **롱 스커트**도 좋습니다. 포멀함을 더하기 위해 반드시 심플한-h 의 가벼운 페이턴으츠 앵클부츠로 섬세하게 매칭하고, 액세서리 역시 은은한 귀걸이나 매칭되는 목걸이 등으로 포인트를 주는 것이 좋습니다.",
//                           "keywords": [
//                               "50대 여성",
//                               "봄 결혼식",
//                               "정장 스타일",
//                               "단정한 룩",
//                               "폴리소재 빈티지 블레이저"
//                           ],
//                           "related": [
//                               "블레이저",
//                               "타이트 스커트",
//                               "고급스러운 지갑",
//                               "컬러 매치"
//                           ]
//                       }
//                   }
//               },
//               "keywords": [],
//               "related": []
//           }
//       }
//   }
// }
// **베이직한 블랙 터틀넥 스웨터** 는 KEYWORD 추출, BOLD로 활용 가능
