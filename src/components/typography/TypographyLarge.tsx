import { TypographyProps } from "@/types/TypeCommon"

export function TypographyLarge({ children }: TypographyProps) {
  return (
    <div className="text-lg font-semibold">
      {children}
    </div>
  )
}
