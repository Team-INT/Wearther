import {TypographyProps} from "@/lib/types/typeCommon";

export function TypographyLead({children}: TypographyProps) {
  return <p className="text-xl text-muted-foreground">{children}</p>;
}
