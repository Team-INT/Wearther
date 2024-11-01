"use client";

import React, {useEffect} from "react";
import {useRouter} from "next/navigation";

// animation
import {motion, AnimatePresence} from "framer-motion";

// components
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {Checkbox} from "@/components/ui/checkbox";
import {Textarea} from "@/components/ui/textarea";
import {Progress} from "@/components/ui/progress";
import {FormField, FormLabel, FormControl, FormMessage, Form, FormItem} from "@/components/ui/form";

// hooks
import useFormTransition from "@/app/products/recommend/_hooks/useFormTransition";
import useAnimateProgress from "@/app/products/recommend/_hooks/useAnimateProgress";

// store
import useProgressStore from "@/lib/store/useRecommendStore";

// react hook form + zod
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

// schema
import {
  recommendProgressSchema,
  recommendProgressSchemaType,
} from "@/service/schema/recommend.schema";

const fashionTypes = [
  "캐주얼",
  "포멀",
  "스트릿",
  "빈티지",
  "미니멀",
  "로맨틱",
  "스포티",
  "보헤미안",
  "힙합",
  "클래식",
];

const moodTypes = [
  "편안한",
  "세련된",
  "귀여운",
  "시크한",
  "화려한",
  "단정한",
  "자연스러운",
  "독특한",
  "고급스러운",
  "활동적인",
];

const shoppingMalls = ["무신사", "에이블리", "보세", "테무", "기타"];

export default function MyRecommendForm() {
  const router = useRouter();
  const {step, setStep, totalFields, progress, setTotalFields, setProgress} = useProgressStore();

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
    router.push("/products/recommend/result");
  };

  const nextStep = () => setStep(Math.min(step + 1, 3));
  const prevStep = () => setStep(Math.max(step - 1, 1));

  // 총 필드 수 계산 및 업데이트 로직
  useEffect(() => {
    const filledFieldsCount = (
      Object.keys(watchedFields) as Array<keyof recommendProgressSchemaType>
    ).filter((key) => {
      const value = watchedFields[key];

      // 필드가 비어 있는지 체크: 값이 undefined, 빈 문자열, 빈 배열이면 채워지지 않은 것으로 간주
      if (value === undefined || value === "" || (Array.isArray(value) && value.length === 0)) {
        return false;
      }
      return true;
    }).length;

    const totalFieldsCount = 9;
    const calculatedProgress = Math.round((filledFieldsCount / totalFieldsCount) * 100);

    if (calculatedProgress !== progress) {
      setProgress(calculatedProgress);
    }

    // 총 필드 수도 초기화 이후에는 한 번만 설정하도록 처리
    if (totalFields !== totalFieldsCount) {
      setTotalFields(totalFieldsCount);
    }
  }, [watchedFields, setProgress, setTotalFields, totalFields, progress]);

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
        <motion.form onSubmit={handleSubmit(onSubmit)} animate={formControls} initial={{x: 0}}>
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-4">기본 정보</h2>
              <div className="space-y-4">
                <FormField
                  control={recommendProgressForm.control}
                  name="name"
                  render={({field}) => (
                    <FormItem className="space-y-2">
                      <FormLabel htmlFor="name">이름을 입력해주세요</FormLabel>
                      <FormControl>
                        <Input {...field} id="name" placeholder="이름" required />
                      </FormControl>
                      {errors.name && <FormMessage>{errors.name.message}</FormMessage>}
                    </FormItem>
                  )}
                />
                <FormField
                  control={recommendProgressForm.control}
                  name="age"
                  render={({field}) => (
                    <FormItem className="space-y-2">
                      <FormLabel htmlFor="age">나이를 입력해주세요</FormLabel>
                      <FormControl>
                        <Input {...field} id="age" type="number" placeholder="나이" required />
                      </FormControl>
                      {errors.age && <FormMessage>{errors.age.message}</FormMessage>}
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="gender"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>성별을 선택해주세요</FormLabel>
                      <FormControl>
                        <RadioGroup {...field} value={field.value} onValueChange={field.onChange}>
                          <div className="flex space-x-4">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="male" id="male" />
                              <FormLabel htmlFor="male">남성</FormLabel>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="female" id="female" />
                              <FormLabel htmlFor="female">여성</FormLabel>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="other" id="other" />
                              <FormLabel htmlFor="other">기타</FormLabel>
                            </div>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      {errors.gender && <FormMessage>{errors.gender.message}</FormMessage>}
                    </FormItem>
                  )}
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-4">패션 선호도</h2>
              <div className="space-y-4">
                <FormField
                  control={control}
                  name="fashionTypes"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>관심있는 패션 종류를 선택해주세요 (최대 5개)</FormLabel>
                      <FormControl>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          {fashionTypes.map((type) => (
                            <div key={type} className="flex items-center space-x-2">
                              <Checkbox
                                id={type}
                                checked={Array.isArray(field.value) && field.value.includes(type)}
                                onCheckedChange={(checked) => {
                                  const newValue = checked
                                    ? [...(Array.isArray(field.value) ? field.value : []), type]
                                    : field.value.filter((val) => val !== type);
                                  field.onChange(newValue);
                                }}
                                disabled={field.value?.length >= 5 && !field.value.includes(type)}
                              />
                              <FormLabel htmlFor={type}>{type}</FormLabel>
                            </div>
                          ))}
                        </div>
                      </FormControl>
                      {errors.fashionTypes && (
                        <FormMessage>{errors.fashionTypes.message}</FormMessage>
                      )}
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="moods"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>원하시는 무드를 선택해주세요 (최대 3개)</FormLabel>
                      <FormControl>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          {moodTypes.map((mood) => (
                            <div key={mood} className="flex items-center space-x-2">
                              <Checkbox
                                id={mood}
                                checked={Array.isArray(field.value) && field.value.includes(mood)}
                                onCheckedChange={(checked) => {
                                  const newValue = checked
                                    ? [...(Array.isArray(field.value) ? field.value : []), mood]
                                    : field.value.filter((m) => m !== mood);
                                  field.onChange(newValue);
                                }}
                                disabled={field.value?.length >= 3 && !field.value.includes(mood)}
                              />
                              <FormLabel htmlFor={mood}>{mood}</FormLabel>
                            </div>
                          ))}
                        </div>
                      </FormControl>
                      {errors.moods && <FormMessage>{errors.moods.message}</FormMessage>}
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="shoppingMall"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>평소 자주 사는 쇼핑몰이 있나요?</FormLabel>
                      <FormControl>
                        <RadioGroup {...field} value={field.value} onValueChange={field.onChange}>
                          <div className="grid grid-cols-2 gap-2 mt-2">
                            {shoppingMalls.map((mall) => (
                              <div key={mall} className="flex items-center space-x-2">
                                <RadioGroupItem value={mall} id={mall} />
                                <FormLabel htmlFor={mall}>{mall}</FormLabel>
                              </div>
                            ))}
                          </div>
                        </RadioGroup>
                      </FormControl>
                      {/* {field.value === "기타" && (
                            <Input
                              name="otherShoppingMall"
                              value={field.value.otherShoppingMall ?? ""}
                              onChange={field.onChange}
                              placeholder="기타 쇼핑몰 입력"
                              className="mt-2"
                            />
                          )} */}
                      {errors.shoppingMall && (
                        <FormMessage>{errors.shoppingMall.message}</FormMessage>
                      )}
                    </FormItem>
                  )}
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-4">추가 정보</h2>
              <div className="space-y-4">
                <FormField
                  control={control}
                  name="additionalInfo"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel htmlFor="additionalInfo">
                        추가적인 정보가 있으면 입력해주세요 (선택사항)
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          id="additionalInfo"
                          placeholder="추가 정보 입력"
                          rows={4}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="agreement"
                  render={({field}) => (
                    <FormItem className="flex items-center space-x-2">
                      <Checkbox
                        id="agreement"
                        checked={!!watchedFields["agreement"]}
                        onCheckedChange={(checked) => {
                          recommendProgressForm.setValue("agreement", checked as boolean);
                        }}
                      />
                      <FormLabel htmlFor="agreement">
                        개인정보 수집 및 이용에 동의합니다
                        <FormMessage>{errors.agreement?.message}</FormMessage>
                      </FormLabel>
                      {errors.agreement && <FormMessage>{errors.agreement.message}</FormMessage>}
                    </FormItem>
                  )}
                />
              </div>
            </div>
          )}

          <div className="flex justify-between mt-6">
            {step > 1 && (
              <Button type="button" onClick={prevStep}>
                이전
              </Button>
            )}
            {step < 3 ? (
              <Button type="button" onClick={nextStep}>
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
