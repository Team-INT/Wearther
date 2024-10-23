import {TypographyProps} from "@/lib/types/typeCommon";

export function TypographyLarge({children}: TypographyProps) {
  return <div className="text-lg font-semibold">{children}</div>;
}
