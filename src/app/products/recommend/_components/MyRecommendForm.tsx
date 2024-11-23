"use client";

import {useRouter} from "next/navigation";

// animation
import {motion, AnimatePresence} from "framer-motion";

// components
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Progress} from "@/components/ui/progress";
import {Form} from "@/components/ui/form";

import { InputFormField } from "@/components/composites/InputFormField";
import { fashionConst, GenderConst, moodConst, shoppingMallsConst } from "@/constants/TrendConst";
import { SelectFormField } from "@/components/composites/SelectFormField";
import { CheckBoxFormField } from "@/components/composites/CheckBoxFormField";
import { RadioBoxFormField } from "@/components/composites/RadioBoxFormField";

// hooks
import useFormTransition from "../_hooks/useFormTransition";
import useAnimateProgress from "../_hooks/useAnimateProgress";

// store
import useProgressStore from "@/lib/store/useRecommendStore";

// react hook form + zod
import {FieldPath, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

// schema
import {
  recommendProgressSchema,
  recommendProgressSchemaType,
} from "@/service/schema/recommend.schema";
import { GetRecommendTrendData } from "@/service/api/recommend";


export default function MyRecommendForm() {
  const router = useRouter();
  const {step, setStep, totalFields, progress, setTotalFields, setProgress} = useProgressStore();
  const recommendMutation = GetRecommendTrendData<recommendProgressSchemaType>()

  // 훅 호출
  // 진행률 애니메이션, 폼 전환 애니메이션
  const {controls: progressControls} = useAnimateProgress();
  const {controls: formControls} = useFormTransition();

  const recommendProgressForm = useForm<recommendProgressSchemaType>({
    resolver: zodResolver(recommendProgressSchema),
    defaultValues: {
      name: "",
      age: "",
      gender: undefined,
      fashionTypes: [],
      moods: [],
      shoppingMall: "",
      otherShoppingMall: "",
      additionalInfo: "",
      agreement: false,
    },
  });

  const stepSchema: Array<FieldPath<typeof recommendProgressForm>>[] = [
    ["name", "age"],
    ["fashionTypes", "moods", "shoppingMall", "otherShoppingMall"],
    ["additionalInfo", "agreement"]
  ]
  
  const {
    control,
    handleSubmit,
    watch,
    formState: {errors},
  } = recommendProgressForm;

  const watchedFields: recommendProgressSchemaType = watch();
  // 동의 완료 감시하는 변수, 완료되면 전송 가능
  const agreementValue = watch("agreement");

  const onSubmit = (data: recommendProgressSchemaType) => {
    console.log("Form submitted:", data);

    recommendMutation.mutate(data)
    router.push("/recommend/result");
  };

  const handleNextAction = async () => {
    recommendProgressForm.clearErrors(stepSchema[step-1]);
    const validate = await recommendProgressForm.trigger(stepSchema[step-1]);

    //벨리데이션 성공시 다음스텝 이동
    if (validate) {
      setStep(Math.min(step + 1, 3));
    }
  };

  const handlePrevAction = ()=> {
    setStep(Math.max(step - 1, 1));
  }

  return (
    <>
      <Progress value={progress} className="w-full pb-6" />
      <motion.div className="flex justify-center mb-4 overflow-hidden" animate={progressControls}>
        <AnimatePresence>
          {String(progress)
            .padStart(2, "0")
            .split("")
            .map((digit, index) => (
              <motion.span
                key={`${digit}-${index}`} // 각 digit에 고유한 key 부여
                initial={{y: 50, opacity: 0}}
                animate={{y: 0, opacity: 1}}
                exit={{y: -50, opacity: 0}}
                transition={{duration: 0.3}}
              >
                {digit}
              </motion.span>
            ))}
        </AnimatePresence>
        <span>% 완료</span>
      </motion.div>
      <Form {...recommendProgressForm}>
        <motion.form onSubmit={handleSubmit(onSubmit)} animate={formControls} initial={{x: 200}}>
          {step === 1 && (
            <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-4">기본 정보</h2>
            <div className="space-y-4">
              <InputFormField inputType={'input'} formData={recommendProgressForm} valueKey={'name'} formLabel={'이름'} placeholder={'이름을 입력해주세요'}/>
              <InputFormField inputType={'input'} formData={recommendProgressForm} valueKey={'age'} formLabel={'나이'} placeholder={'나이를 입력해주세요'}/>
              <SelectFormField formData={recommendProgressForm} valueKey="gender" formLabel={'성별'} data={GenderConst}/>
            </div>
          </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-4">패션 선호도</h2>
            <div className="space-y-4">
              <CheckBoxFormField formData={recommendProgressForm} valueKey={'fashionTypes'} formLabel={'관심있는 패션 종류를 선택해주세요 (최대 5개)'} data={fashionConst} maxCount={5}/>
              <CheckBoxFormField formData={recommendProgressForm} valueKey={'moods'} formLabel={'원하시는 무드를 선택해주세요 (최대 3개)'} data={moodConst} maxCount={3}/>
              
              <RadioBoxFormField formData={recommendProgressForm} valueKey={'shoppingMall'} formLabel={'평소 자주 사는 쇼핑몰이 있나요?'} data={shoppingMallsConst}>
                {
                  (field) => (
                    field.value === "기타" && (
                      <Input
                        name="otherShoppingMall"
                        value={field.value?.otherShoppingMall ?? ""}
                        onChange={field.onChange}
                        placeholder="기타 쇼핑몰 입력"
                        className="mt-2"
                      />
                    )
                  )
                }
              </RadioBoxFormField>
            </div>
          </div>
          )}

                
          {step === 3 && (
            <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-4">추가 정보</h2>
            <div className="space-y-4">
              <InputFormField inputType={'textarea'} formData={recommendProgressForm} valueKey={'additionalInfo'} formLabel={'추가적인 정보가 있으면 입력해주세요 (선택사항)'} classNm={"flex-none"} placeholder={'추가 정보 입력'} rows={4}/>
              <CheckBoxFormField formData={recommendProgressForm} valueKey={'agreement'} formLabel={'개인정보 수집 및 이용에 동의합니다'} data={'agreement'}/>
            </div>
          </div>
          )} 

          <div className="flex justify-between mt-6">
            {step > 1 && (
              <Button type="button" onClick={handlePrevAction}>
                이전
              </Button>
            )}
            {step < 3 ? (
              <Button type="button" onClick={handleNextAction}>
                다음
              </Button>
            ) : (
              <Button type="submit" disabled={!agreementValue}>
                제출
              </Button>
            )}
          </div>
        </motion.form>
      </Form>
    </>
  );
}
