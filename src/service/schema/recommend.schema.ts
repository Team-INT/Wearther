import z from "zod";

export const recommendProgressSchema = z.object({
  name: z.string().min(1, "이름을 입력해주세요"),
  age: z.string().min(1, "나이를 입력해주세요"),
  gender: z.enum(["male", "female", "other"]),
  fashionTypes: z.array(z.string()).max(5, "최대 5개까지 선택 가능합니다"),
  moods: z.array(z.string()).max(3, "최대 3개까지 선택 가능합니다"),
  shoppingMall: z.string().min(1, "쇼핑몰을 선택해주세요"),
  otherShoppingMall: z.string().optional(),
  additionalInfo: z.string().optional(),
  agreement: z.boolean().refine((val) => val === true, "개인정보 수집 및 이용에 동의해주세요"),
});

export type recommendProgressSchemaType = z.infer<typeof recommendProgressSchema>;

export const recommendTrendSchema = z.object({
  ages: z.string().min(1, "연령대를 선택해주세요."),
  gender: z.string().min(1, "성별을 선택해주세요."),
  categoryName: z.string().min(1, "카테고리를 선택해주세요."),
  categoryParam: z.string().min(1, "키워드를 입력해주세요."),
});

export type recommendTrendSchemaType = z.infer<typeof recommendTrendSchema>;
