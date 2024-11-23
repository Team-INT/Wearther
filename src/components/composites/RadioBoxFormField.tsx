import {
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
  FormItem,
} from "@/components/ui/form";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";

// hooks
import { FieldValues } from "react-hook-form";

// types
import { RadioBoxFormFieldProps } from "@/lib/types/typeUi";


export function RadioBoxFormField<T extends FieldValues>({
  formData,
  valueKey,
  formLabel,
  data,
  children
}: RadioBoxFormFieldProps<T>) {
  const { formState } = formData
  const { errors } = formState

  return (
    <FormField
      control={formData.control}
      name={valueKey}
      render={({field}) => (
        <FormItem>
          { formLabel && <FormLabel>{formLabel}</FormLabel>}
          <FormControl>
            <RadioGroup {...field} value={field.value} onValueChange={field.onChange}>
              <>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {data.map((el) => (
                    <div key={el} className="flex items-center space-x-2">
                      <RadioGroupItem value={el} id={el} />
                      <FormLabel htmlFor={el}>{el}</FormLabel>
                    </div>
                  ))}
                </div>
                {children && children(field)}
              </>
            </RadioGroup>
            
          </FormControl>
          {errors[valueKey] && (
            <FormMessage className="absolute bottom-0 right-0 text-sm text-destructive mt-1">{errors[valueKey].message as string}</FormMessage>
          )}
        </FormItem>
      )}
    />
  );
}
