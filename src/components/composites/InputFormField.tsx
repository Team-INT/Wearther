import {
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
  FormItem,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// hooks
import { FieldValues } from "react-hook-form";

// types
import { InputFormFieldProps } from "@/lib/types/typeUi";

// utils
import {cn} from "@/lib/utils";

export function InputFormField<T extends FieldValues>({
  inputType,
  formData,
  valueKey,
  formLabel,
  classNm = 'flex items-center justify-between',
  ...inputProps
}: InputFormFieldProps<T>) {
  const { formState } = formData
  const { errors } = formState

  return (
    <div className="relative pb-6">
      <FormField
        control={formData.control}
        name={valueKey}
        render={({field}) => (
          <FormItem className={cn("input-wrap", classNm)}>
            {
              formLabel && (<FormLabel htmlFor={valueKey}>{formLabel}</FormLabel>)
            }
            <FormControl>
            {
              inputType === 'input' ? (
                <Input {...field} id={valueKey} {...inputProps} />
              ) : (
                <Textarea {...field} id={valueKey} {...inputProps} />
              )
            }
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
