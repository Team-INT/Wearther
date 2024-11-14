import z from "zod";


const dateSchema = z.date({
  required_error: "A date is required.",
}).refine(val=> {
  return val === undefined && {message: '옵션을 선택해주세요.'}
})

const selectSchema = z.string()
.refine(val=> val !== '', {message: '옵션을 선택해주세요.'})

export const trendSchema = z.object({
  startDate: dateSchema,
  endDate: dateSchema,
  categoryName: selectSchema,
  categoryParam: selectSchema,
  timeUnit: z.enum(['day', 'week', 'month']),
  gender: z.enum(['male', 'female', 'other']).optional(),
  ages: z.string().optional(),
  device: z.enum(['mobile', 'desktop']).optional()
})

export type trendSchemaType = z.infer<typeof trendSchema>
