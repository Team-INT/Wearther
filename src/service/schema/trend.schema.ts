import z from "zod";

const dateSchema = z.date({
  required_error: "A date of birth is required.",
})

export const trendSchema = z.object({
  startDate: dateSchema,
  endDate: dateSchema,
  categoryName: z.string(),
  categoryParam: z.string(),
  timeUnit: z.enum(['day', 'week', 'month']),
  gender: z.enum(['male', 'female', '']).optional(),
  ages: z.string().optional(),
  device: z.enum(['mobile', 'desktop']).optional()
})

export type trendSchemaType = z.infer<typeof trendSchema>
