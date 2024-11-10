"use client";

import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {registerSchema, registerSchemaType} from "@/service/schema/auth.schema";
import {signIn} from "next-auth/react";

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
    const trimmedValues = {
      userName: values.userName.trim(),
      email: values.email.trim(),
      password: values.password.trim(),
    };
    console.log("Trimmed values:", trimmedValues);

    const response = await signIn("credentials", {
      redirect: false,
      ...trimmedValues,
    });

    if (response?.error) {
      console.error("회원가입 에러:", response.error);
      alert(response.error);
    } else {
      console.log("회원가입 성공", response);
    }
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">회원가입</CardTitle>
        <CardDescription>회원가입</CardDescription>
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
