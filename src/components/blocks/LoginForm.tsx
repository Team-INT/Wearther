"use client";

import Link from "next/link";

import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {loginSchema, loginSchemaType} from "@/service/schema/auth.schema";
// import { signInWithCredentials, signInWithGoogle } from "@/server/auth";

export function LoginForm<loginSchemaType>() {
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values) => {
    // 여기서 버튼 이름에 따라 if문으로 credentials(일반) / google(구글) 체크해서 로그인
    // signInWithCredentials(values)
    // signInWithGoogle(value)
    console.log(values);
    // signInWithCredentials(values)
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
                      <div className="flex items-center">
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <Link href="#" className="ml-auto inline-block text-sm underline">
                          Forgot your password?
                        </Link>
                      </div>

                      <FormControl>
                        <Input id="password" type="password" {...field} />
                      </FormControl>
                      <FormMessage className="absolute top-0 right-0 text-sm text-destructive mt-1" />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" name="credentials" className="w-full">
                Login
              </Button>
              <Button variant="outline" name="google" className="w-full">
                Login with Google
              </Button>
            </div>
          </form>
        </Form>

        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
