"use client";

// api
import {GetMonthlyTrendData} from "@/service/api/trend";

// lib
import {format} from "date-fns";

// components
import {Form} from "@/components/ui/form";
import {Button} from "@/components/ui/button";
import {CalendarPopover} from "@/components/composites/CalendarPopover";
import { SelectFormField } from '@/components/composites/SelectFormField';

// const
import { AgeConst, CategoryConst, FavorKeywordConst, GenderConst, TimeUnitConst } from "@/constants/TrendConst";

// hooks
import {useMediaQuery} from "@/lib/hooks/useMediaQuery";

// react hook form + zod
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {trendSchema, trendSchemaType} from "@/service/schema/trend.schema";


export default function SearchTrendForm() {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const getTrendMutation = GetMonthlyTrendData();

  const trendForm = useForm<trendSchemaType>({
    resolver: zodResolver(trendSchema),
    defaultValues: {
      startDate: undefined,
      endDate: undefined,
      categoryName: "",
      categoryParam: "",
      timeUnit: "day",
      gender: "other",
      ages: "",
      device: isDesktop ? "desktop" : "mobile",
    },
  });

  const onSubmit = (value: trendSchemaType) => {
    console.log(value)
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
        className="space-y-2"
        onSubmit={(e) => {
          e.preventDefault();
          trendForm.handleSubmit(onSubmit)()
        }}
      >
        <div className="space-x-4 flex">
          <CalendarPopover
            formData={trendForm}
            valueKey={"startDate"}
            formLabel={"시작 기간을 선택해주세요."}
          />
          <CalendarPopover
            formData={trendForm}
            valueKey={"endDate"}
            formLabel={"끝나는 기간을 선택해주세요."}
          />
        </div>

        <div className="space-x-4 flex">
          <div className="w-full">
            <SelectFormField formData={trendForm} valueKey="timeUnit" formLabel={'조회 기간을 선택해주세요.'} data={TimeUnitConst}/>
          </div>

          <div className="w-full">
            <SelectFormField formData={trendForm} valueKey="gender" formLabel={'성별을 선택해주세요.'} data={GenderConst}/>
          </div>
          <div className="w-full">
            <SelectFormField formData={trendForm} valueKey="ages" formLabel={'나이를 선택해주세요.'} data={AgeConst}/>
          </div>
        </div>

        <div className="space-x-4 flex">
          <div className="w-full">
            <SelectFormField formData={trendForm} valueKey="categoryName" formLabel={'대분류를 선택해주세요.'} data={CategoryConst}/>
          </div>
          <div className="w-full">
          <SelectFormField formData={trendForm} valueKey="categoryParam" formLabel={'관심있는 키워드를 선택해주세요.'} data={FavorKeywordConst}/>
          </div>
        </div>

        <Button type="submit" className="w-full">
          트렌드 조회하기
        </Button>
      </form>
    </Form>
  );
}
