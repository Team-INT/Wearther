import { TypopgraphyBlockquote } from "@/types/TypeCommon";

export function TypographyBlockquote({ title }: TypopgraphyBlockquote) {
  return (
    <blockquote className="mt-6 border-l-2 pl-6 italic">
      {title}
    </blockquote>
  )
}
