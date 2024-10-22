import { TypographyProps } from "@/types/TypeCommon"

export function TypographySmall({ children }: TypographyProps) {
  return (
    <small className="text-sm font-medium leading-none">{children}</small>
  )
}
