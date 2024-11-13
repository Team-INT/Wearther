"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { Calendar } from "@/components/ui/calendar"
import {Input} from "@/components/ui/input";
import {FormField, FormLabel, FormControl, FormMessage, Form, FormItem} from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { CalendarIcon } from "lucide-react"

import { format } from "date-fns"
import { cn } from "@/lib/utils"

// react hook form + zod
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import { trendSchema, trendSchemaType } from "@/service/schema/trend.schema";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { CalendarPopover } from "../composites/CalendarPopover";



export default function SearchFilterForm() {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const trendForm = useForm<trendSchemaType>({
    resolver: zodResolver(trendSchema),
    defaultValues: {
      startDate: '',
      endDate: '',
      categoryName: '',
      categoryParam: '',
      timeUnit: 'day',
      gender: '',
      ages: '',
      device: isDesktop ? 'desktop' : 'mobile',
    },
  });

  return (
    <Form {...trendForm}>
      <form
        className="space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >

        <div className="space-x-4 flex">
          <CalendarPopover form={trendForm} valueKey={'startDate'} label={'시작기간'}/>
          <CalendarPopover form={trendForm} valueKey={'endDate'} label={'끝기간'}/>
        </div>
      
        <div className="space-x-4 flex">
        <div className="space-y-2 w-full">
          <FormField
            control={trendForm.control}
            name="timeUnit"
            render={({field}) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-sm font-medium text-muted-foreground" htmlFor="name">
                  조회 기간을 선택해주세요.
                </FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger id="timeUnit">
                      <SelectValue placeholder="선택해주세요" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="day">day</SelectItem>
                      <SelectItem value="week">week</SelectItem>
                      <SelectItem value="month">month</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="space-y-2 w-full">
          <FormField
            control={trendForm.control}
            name="gender"
            render={({field}) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-sm font-medium text-muted-foreground" htmlFor="name">
                  성별을 선택해주세요.
                </FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger id="gender">
                      <SelectValue placeholder="선택해주세요" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">남성</SelectItem>
                      <SelectItem value="female">여성</SelectItem>
                      <SelectItem value="other">전체</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="space-y-2 w-full">
          <FormField
            control={trendForm.control}
            name="ages"
            render={({field}) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-sm font-medium text-muted-foreground" htmlFor="name">
                  대분류를 선택해주세요.
                </FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger id="ages">
                      <SelectValue placeholder="선택해주세요" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="50000001">패션/잡화</SelectItem>
                      <SelectItem value="50000002">화장품/미용</SelectItem>
                      <SelectItem value="50000008">패션/의류</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        </div>

        <div className="space-x-4 flex">
          <div className="w-full">
          <FormField
            control={trendForm.control}
            name="categoryName"
            render={({field}) => (
              <FormItem className="space-y-2 pb-4 md:pb-8">
                <FormLabel className="text-sm font-medium text-muted-foreground" htmlFor="name">
                  관심있는 키워드를 입력해주세요.
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="categoryName"
                    placeholder="예) 셔츠/남방, 재킷, 코트"
                    maxLength={20}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          </div>
          <div className="w-full">
          <FormField
            control={trendForm.control}
            name="categoryParam"
            render={({field}) => (
              <FormItem className="space-y-2 pb-4 md:pb-8">
                <FormLabel className="text-sm font-medium text-muted-foreground" htmlFor="name">
                  관심있는 키워드를 입력해주세요.
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="categoryParam"
                    placeholder="예) 셔츠/남방, 재킷, 코트"
                    maxLength={20}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          </div>
          
        </div>
        
        <Button type="submit" className="w-full">
          트렌드 조회하기
        </Button>
      </form>
    </Form>
  );
}