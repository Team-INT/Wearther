import {TypographyProps} from "@/lib/types/typeCommon";

export function TypographySmall({children}: TypographyProps) {
  return <small className="text-sm font-medium leading-none">{children}</small>;
}
