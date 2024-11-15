import {
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
  FormItem,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// hooks
import { FieldValues } from "react-hook-form";

// types
import { InputFormFieldProps } from "@/lib/types/typeUi";


export function InputFormField<T extends FieldValues>({
  formData,
  valueKey,
  formLabel,
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
          <FormItem className="input-wrap flex items-center justify-between">
            <FormLabel htmlFor={valueKey}>{formLabel}</FormLabel>
            <FormControl>
              <Input {...field} id={valueKey} {...inputProps} required />
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
