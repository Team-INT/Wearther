"use client";

import {useState, useRef, useEffect} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";
import {Button} from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {toast} from "@/lib/hooks/useToast";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Separator} from "@/components/ui/separator";
import {Mail, Phone, MapPin, Clock} from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "이름은 2글자 이상이어야 합니다.",
  }),
  email: z.string().email({
    message: "유효한 이메일 주소를 입력해주세요.",
  }),
  subject: z.string().min(1, {
    message: "문의 유형을 선택해주세요.",
  }),
  message: z.string().min(10, {
    message: "메시지는 10글자 이상이어야 합니다.",
  }),
});

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    // 여기에 실제 API 호출 로직을 구현합니다.
    await new Promise((resolve) => setTimeout(resolve, 2000)); // API 호출을 시뮬레이션합니다.
    setIsSubmitting(false);
    toast({
      title: "문의가 접수되었습니다.",
      description: "빠른 시일 내에 답변 드리겠습니다.",
    });
    form.reset();
  };

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      const adjustHeight = () => {
        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;
      };
      textarea.addEventListener("input", adjustHeight);
      return () => textarea.removeEventListener("input", adjustHeight);
    }
  }, []);

  return (
    <div className="min-h-screen">
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">문의하기</h2>
          <p className="text-xl">
            궁금한 점이 있으시면 <br className="block md:hidden" /> 언제든 문의해주세요.
          </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>문의 양식</CardTitle>
                <CardDescription>아래 양식을 작성하여 문의해주세요.</CardDescription>
              </CardHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({field}) => (
                        <FormItem>
                          <FormLabel>이름</FormLabel>
                          <FormControl>
                            <Input placeholder="홍길동" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({field}) => (
                        <FormItem>
                          <FormLabel>이메일</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="example@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({field}) => (
                        <FormItem>
                          <FormLabel>문의 유형</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="문의 유형을 선택해주세요" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="general">일반 문의</SelectItem>
                              <SelectItem value="technical">기술 지원</SelectItem>
                              <SelectItem value="billing">결제 문의</SelectItem>
                              <SelectItem value="partnership">제휴 문의</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="message"
                      render={({field}) => (
                        <FormItem>
                          <FormLabel>메시지</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="문의 내용을 입력해주세요."
                              {...field}
                              ref={textareaRef}
                              style={{resize: "none", overflow: "hidden"}}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? "제출 중..." : "문의하기"}
                    </Button>
                  </CardFooter>
                </form>
              </Form>
            </Card>
          </div>
          <div>
            <Card>
              <CardHeader>
                <CardTitle>연락처 정보</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-end space-x-2">
                  <Mail width={20} height={20} className="w-5 h-5 text-primary" />
                  <span>support@weatherfashion.com</span>
                </div>
                <div className="flex items-end space-x-2">
                  <Phone className="w-5 h-5 text-primary" />
                  <span>02-1234-5678</span>
                </div>
                <div className="flex items-end space-x-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>서울특별시 강남구 테헤란로 123</span>
                </div>
                <Separator />
                <div>
                  <h3 className="font-semibold mb-2 flex items-center">
                    <Clock className="w-5 h-5 text-primary mr-2" />
                    운영 시간
                  </h3>
                  <p>평일: 오전 9시 - 오후 6시</p>
                  <p>주말 및 공휴일: 휴무</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
