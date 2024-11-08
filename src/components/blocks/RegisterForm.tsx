"use client";

import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {registerSchema, registerSchemaType} from "@/service/schema/auth.schema";
import {signIn} from "next-auth/react"; // signIn 함수 임포트

export function RegisterForm() {
  const form = useForm<registerSchemaType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      userName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values) => {
    console.log(values);
    try {
      const response = await signIn("credentials", {
        userName: values.userName,
        email: values.email,
        password: values.password,
        redirect: false, // 필요한 경우 설정
      });

      console.log(response);

      if (!response?.ok) {
        console.log("인증 실패");
      } else {
        console.log("인증 성공");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>Enter your email below to login to your account</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="userName"
                  render={({field}) => (
                    <FormItem className="relative">
                      <FormLabel htmlFor="user-name">name</FormLabel>
                      <FormControl>
                        <Input id="user-name" type="text" {...field} />
                      </FormControl>
                      <FormMessage className="absolute top-0 right-0 text-sm text-destructive mt-1" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({field}) => (
                    <FormItem className="relative">
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <FormControl>
                        <Input id="email" type="email" placeholder="m@example.com" {...field} />
                      </FormControl>
                      <FormMessage className="absolute top-0 right-0 text-sm text-destructive mt-1" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="password"
                  render={({field}) => (
                    <FormItem className="relative">
                      <FormLabel htmlFor="password">Password</FormLabel>
                      <FormControl>
                        <Input id="password" type="password" {...field} />
                      </FormControl>
                      <FormMessage className="absolute top-0 right-0 text-sm text-destructive mt-1" />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" variant="outline" className="w-full">
                회원가입
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
