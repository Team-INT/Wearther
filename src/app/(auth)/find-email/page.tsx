"use client";

import {useState} from "react";
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
import {useToast} from "@/lib/hooks/useToast";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {ArrowLeft, CheckCircle2} from "lucide-react";
import Link from "next/link";

const formSchema = z.object({
  email: z.string().email({
    message: "유효한 이메일 주소를 입력해주세요.",
  }),
  username: z.string().min(2, {
    message: "사용자 이름은 2글자 이상이어야 합니다.",
  }),
});

export function AccountRecoveryForm({
  type,
  onSubmit,
  isSubmitting,
}: {
  type: "password" | "email";
  onSubmit: (data: z.infer<typeof formSchema>) => void;
  isSubmitting: boolean;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      username: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {type === "password" ? (
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
        ) : (
          <FormField
            control={form.control}
            name="username"
            render={({field}) => (
              <FormItem>
                <FormLabel>사용자 이름</FormLabel>
                <FormControl>
                  <Input placeholder="사용자 이름을 입력하세요" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting
            ? "처리 중..."
            : type === "password"
            ? "비밀번호 재설정 링크 받기"
            : "이메일 주소 찾기"}
        </Button>
      </form>
    </Form>
  );
}

export default function AccountRecoveryPage({type}: {type: "password" | "email"}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { toast } = useToast()

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    // 여기에 실제 계정 복구 로직을 구현합니다.
    // API 호출을 시뮬레이션합니다.
    await new Promise((resolve) => setTimeout(resolve, 2000)); 
    setIsSubmitting(false);
    setIsSubmitted(true);
    toast({
      title: type === "password" ? "이메일이 전송되었습니다." : "이메일을 찾았습니다.",
      description:
        type === "password"
          ? "비밀번호 재설정 링크를 확인해주세요."
          : "가입된 이메일 주소를 확인해주세요.",
    });
  };

  const title = type === "password" ? "비밀번호 찾기" : "이메일 찾기";
  const description =
    type === "password"
      ? "가입한 이메일 주소를 입력하시면 비밀번호 재설정 링크를 보내드립니다."
      : "가입 시 사용한 사용자 이름을 입력하시면 등록된 이메일 주소를 알려드립니다.";

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center mb-2">
            <Link href="/login" className="text-muted-foreground hover:text-primary mr-2">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <CardTitle className="text-2xl font-bold">{title}</CardTitle>
          </div>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          {!isSubmitted ? (
            <AccountRecoveryForm type={type} onSubmit={onSubmit} isSubmitting={isSubmitting} />
          ) : (
            <Alert>
              <CheckCircle2 className="h-4 w-4" />
              <AlertTitle>
                {type === "password" ? "이메일이 전송되었습니다" : "이메일을 찾았습니다"}
              </AlertTitle>
              <AlertDescription>
                {type === "password"
                  ? "입력하신 이메일 주소로 비밀번호 재설정 링크를 보냈습니다. 이메일을 확인해주세요."
                  : "입력하신 사용자 이름과 연결된 이메일 주소를 찾았습니다. 이메일을 확인해주세요."}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            {type === "password" ? "이메일을 받지 못하셨나요?" : "이메일을 찾지 못하셨나요?"}{" "}
            <Button variant="link" className="p-0 h-auto" onClick={() => setIsSubmitted(false)}>
              다시 시도하기
            </Button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
