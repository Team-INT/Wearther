import {
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
  FormItem,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// hooks
import { FieldValues } from "react-hook-form";

// types
import { SelectFormFieldProps } from "@/lib/types/typeUi";

export function SelectFormField<T extends FieldValues>({
  form,
  valueKey,
  label,
  data
}: SelectFormFieldProps<T>) {
  const { formState } = form
  const { errors } = formState

  return (
    <div className="relative pb-6">
      <FormField
      control={form.control}
      name={valueKey}
      render={({ field }) => (
        <FormItem className="space-y-2">
          <FormLabel
            className="text-sm font-medium text-muted-foreground"
            htmlFor="name"
          >
            {label ?? ""}
          </FormLabel>
          <FormControl>
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger id="{valueKey}">
                <SelectValue placeholder="선택해주세요" />
              </SelectTrigger>
              <SelectContent>
                {
                  data.map(el=> (
                    <SelectItem value={el.value} key={`${el.label}${el.value}`}>{el.label}</SelectItem>
                  ))
                }
              </SelectContent>
            </Select>
          </FormControl>
          {errors[valueKey] && (
            <FormMessage className="absolute bottom-0 right-0 text-sm text-destructive mt-1">{errors[valueKey].message as string}</FormMessage>
          )}
        </FormItem>
      )}
    />
    </div>
  );
}
