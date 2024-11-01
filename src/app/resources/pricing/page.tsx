"use client";

import {Button} from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {Badge} from "@/components/ui/badge";
import {Check, Zap} from "lucide-react";

const pricingPlans = [
  {
    name: "Free",
    price: "0",
    tokens: 10,
    features: ["기본 날씨 정보", "일일 스타일 추천", "제한된 검색 기능"],
    badge: "시작하기",
    popular: false,
  },
  {
    name: "Basic",
    price: "5,000",
    tokens: 50,
    features: ["상세 날씨 정보", "주간 스타일 추천", "기본 검색 기능", "이메일 지원"],
    badge: "구매하기",
    popular: false,
  },
  {
    name: "Standard",
    price: "15,000",
    tokens: 200,
    features: ["고급 날씨 예측", "개인화된 스타일 추천", "고급 검색 기능", "우선 고객 지원"],
    badge: "구매하기",
    popular: true,
  },
  {
    name: "Premium",
    price: "50,000",
    tokens: 1000,
    features: [
      "AI 기반 스타일 분석",
      "VIP 고객 지원",
      "브랜드 콜라보레이션 기회",
      "맞춤형 패션 컨설팅",
    ],
    badge: "구매하기",
    popular: false,
  },
];

const faqs = [
  {
    question: "토큰은 어떻게 사용되나요?",
    answer:
      "토큰은 스타일 추천, 날씨 정보 조회, 고급 검색 기능 등 서비스 이용 시 사용됩니다. 각 기능마다 필요한 토큰 수가 다르며, 사용 내역은 계정 페이지에서 확인할 수 있습니다.",
  },
  {
    question: "무료 플랜은 어떤 제한이 있나요?",
    answer:
      "무료 플랜은 기본적인 기능을 제공하지만, 일일 사용량과 고급 기능에 제한이 있습니다. 더 많은 기능과 사용량이 필요하시다면 유료 플랜을 고려해보세요.",
  },
  {
    question: "구매한 토큰은 언제까지 사용할 수 있나요?",
    answer:
      "구매한 토큰은 만료 기간이 없어 언제든지 사용하실 수 있습니다. 단, 서비스 정책 변경 시 사전 공지를 통해 변경될 수 있습니다.",
  },
  {
    question: "토큰을 추가로 구매할 수 있나요?",
    answer:
      '네, 언제든지 추가 토큰을 구매하실 수 있습니다. 마이페이지의 "토큰 충전" 메뉴를 통해 원하는 만큼 구매가 가능합니다.',
  },
  {
    question: "환불 정책은 어떻게 되나요?",
    answer:
      "미사용 토큰에 한해 구매 후 14일 이내에 전액 환불이 가능합니다. 부분 사용한 경우, 잔여 토큰에 대해 환불해 드립니다.",
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            {" "}
            심플한 요금제, 다양한 혜택.{" "}
          </h2>{" "}
          <p className="text-xl text-muted-foreground mb-6">
            {" "}
            원하는 만큼 구매하고, 원하는 대로 사용하세요{" "}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {pricingPlans.map((plan) => (
            <Card
              key={plan.name}
              className={`flex flex-col ${plan.popular ? "border-primary shadow-lg" : ""}`}
            >
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                {/* <CardDescription>
                  {plan.popular && <Badge className="mb-2">가장 인기 있는 플랜</Badge>}
                </CardDescription> */}
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">₩{plan.price}</div>
                  <div className="text-sm font-normal text-muted-foreground mb-4">
                    {plan.tokens} 토큰
                  </div>
                </div>
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  {plan.badge}
                  {plan.popular && <Zap className="ml-2 h-4 w-4" />}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">자주 묻는 질문</h2>
          <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">아직 궁금한 점이 있으신가요?</h2>
          <p className="mb-4">저희 고객 지원 팀이 언제나 도와드리겠습니다.</p>
          <Button variant="outline">문의하기</Button>
        </div>
      </div>
    </div>
  );
}
