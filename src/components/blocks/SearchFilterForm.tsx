"use client"

// lib
import { format } from "date-fns"

// components
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {Input} from "@/components/ui/input";
import {FormField, FormLabel, FormControl, FormMessage, Form, FormItem} from "@/components/ui/form";
import { Button } from "@/components/ui/button";

// react hook form + zod
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import { trendSchema, trendSchemaType } from "@/service/schema/trend.schema";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { CalendarPopover } from "@/components/composites/CalendarPopover";
import { GetMonthlyTrendData } from "@/lib/service/trend";



export default function SearchFilterForm() {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const getTrendMutation = GetMonthlyTrendData()

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

  const onSubmit = (value : trendSchemaType)=> {
    const data = {
      ...value,
      startDate : format(value.startDate, "yyyy-MM-dd"),
      endDate : format(value.endDate, "yyyy-MM-dd"),
    }

    getTrendMutation.mutate(data)
  }

  return (
    <Form {...trendForm}>
      <form
        className="space-y-6"
        onSubmit={(e)=> {
          e.preventDefault()
          onSubmit(trendForm.getValues())
        }}
      >

        <div className="space-x-4 flex">
          <CalendarPopover form={trendForm} valueKey={'startDate'} label={'시작 기간을 선택해주세요.'}/>
          <CalendarPopover form={trendForm} valueKey={'endDate'} label={'끝나는 기간을 선택해주세요.'}/>
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
                    나이를 선택해주세요
                  </FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger id="ages">
                        <SelectValue placeholder="선택해주세요" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10">10대</SelectItem>
                        <SelectItem value="20">20대</SelectItem>
                        <SelectItem value="30">30대</SelectItem>
                        <SelectItem value="40">40대</SelectItem>
                        <SelectItem value="50">50대</SelectItem>
                        <SelectItem value="60">60대 이상</SelectItem>
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