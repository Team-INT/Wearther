"use client";

// lib
import {format} from "date-fns";

// components
import {Form} from "@/components/ui/form";
import {Button} from "@/components/ui/button";

// react hook form + zod
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {trendSchema, trendSchemaType} from "@/service/schema/trend.schema";

import {useMediaQuery} from "@/lib/hooks/useMediaQuery";
import {CalendarPopover} from "@/components/composites/CalendarPopover";
import {GetMonthlyTrendData} from "@/service/api/trend";
import { SelectFormField } from './../composites/SelectFormField';
import { AgeConst, FavorKeywordConst, GenderConst, TimeUnitConst } from "@/constants/TrendConst";

export default function SearchFilterForm() {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const getTrendMutation = GetMonthlyTrendData();

  const trendForm = useForm<trendSchemaType>({
    resolver: zodResolver(trendSchema),
    defaultValues: {
      startDate: "",
      endDate: "",
      categoryName: "",
      categoryParam: "",
      timeUnit: "day",
      gender: "",
      ages: "",
      device: isDesktop ? "desktop" : "mobile",
    },
  });

  const onSubmit = (value: trendSchemaType) => {
    const data = {
      ...value,
      startDate: format(value.startDate, "yyyy-MM-dd"),
      endDate: format(value.endDate, "yyyy-MM-dd"),
    };

    getTrendMutation.mutate(data);
  };

  return (
    <Form {...trendForm}>
      <form
        className="space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(trendForm.getValues());
        }}
      >
        <div className="space-x-4 flex">
          <CalendarPopover
            form={trendForm}
            valueKey={"startDate"}
            label={"시작 기간을 선택해주세요."}
          />
          <CalendarPopover
            form={trendForm}
            valueKey={"endDate"}
            label={"끝나는 기간을 선택해주세요."}
          />
        </div>

        <div className="space-x-4 flex">
          <div className="space-y-2 w-full">
            <SelectFormField form={trendForm} valueKey="timeUnit" label={'조회 기간을 선택해주세요.'} data={TimeUnitConst}/>
          </div>

          <div className="space-y-2 w-full">
            <SelectFormField form={trendForm} valueKey="gender" label={'성별을 선택해주세요.'} data={GenderConst}/>
          </div>
          <div className="space-y-2 w-full">
            <SelectFormField form={trendForm} valueKey="ages" label={'나이를 선택해주세요.'} data={AgeConst}/>
          </div>
        </div>

        <div className="space-x-4 flex">
          <div className="w-full">
            <SelectFormField form={trendForm} valueKey="categoryName" label={'관심있는 키워드를 선택해주세요.'} data={FavorKeywordConst}/>
          </div>
          <div className="w-full">
          <SelectFormField form={trendForm} valueKey="categoryParam" label={'관심있는 키워드를 선택해주세요.'} data={FavorKeywordConst}/>
          </div>
        </div>

        <Button type="submit" className="w-full">
          트렌드 조회하기
        </Button>
      </form>
    </Form>
  );
}
