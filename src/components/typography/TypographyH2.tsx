import {TypographyProps} from "@/lib/types/typeCommon";

export function TypographyH2({children}: TypographyProps) {
  return (
    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
      {children}
    </h2>
  );
}
