import {TypographyProps} from "@/lib/types/typeCommon";

export function TypographyP1({children}: TypographyProps) {
  return <p className="leading-7 [&:not(:first-child)]:mt-6">{children}</p>;
}
