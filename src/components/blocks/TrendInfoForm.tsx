
// const
import { AgeConst, CategoryConst, FavorKeywordConst, GenderConst } from "@/constants/TrendConst";

// component
import {Button} from "@/components/ui/button";
import {Form} from "@/components/ui/form";
import { SelectFormField } from "@/components/composites/SelectFormField";

// react hook form + zod
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {recommendTrendSchema, recommendTrendSchemaType} from "@/service/schema/recommend.schema";

export const TrendInfoForm = ({onSubmit}: {onSubmit: () => void}) => {
  const recommendTrendForm = useForm<recommendTrendSchemaType>({
    resolver: zodResolver(recommendTrendSchema),
    defaultValues: {
      ages: "",
      gender: "",
      categoryName: "",
      categoryParam: "",
    },
  });

  return (
    <Form {...recommendTrendForm}>
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <div className="space-y-2">
          <SelectFormField formData={recommendTrendForm} valueKey="ages" formLabel={'연령대를 선택해주세요.'} data={AgeConst}/>
        </div>
        <div className="space-y-2">
          <SelectFormField formData={recommendTrendForm} valueKey="gender" formLabel={'성별을 선택해주세요.'} data={GenderConst}/>
        </div>
        <div className="space-y-2">
          <SelectFormField formData={recommendTrendForm} valueKey="categoryName" formLabel={'대분류를 선택해주세요.'} data={CategoryConst}/>
        </div>
        <div className="space-y-2">
        <SelectFormField formData={recommendTrendForm} valueKey="categoryParam" formLabel={'관심있는 키워드를 선택해주세요.'} data={FavorKeywordConst}/>
        </div>
        <Button type="submit" className="w-full">
          맞춤 정보 저장하기
        </Button>
      </form>
    </Form>
  );
};