import {
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
  FormItem,
} from "@/components/ui/form";
import {Checkbox} from "@/components/ui/checkbox";

// hooks
import { FieldValues } from "react-hook-form";

// types
import { CheckBoxFormFieldProps } from "@/lib/types/typeUi";


export function CheckBoxFormField<T extends FieldValues>({
  formData,
  valueKey,
  formLabel,
  data,
  maxCount
}: CheckBoxFormFieldProps<T>) {
  const { formState } = formData
  const { errors } = formState

  const watchedFields = formData.watch()

  return (
    <FormField
      control={formData.control}
      name={valueKey}
      render={({field}) => (
        <FormItem>
          { formLabel && <FormLabel>{formLabel}</FormLabel>}
          <FormControl>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {
                typeof data === 'string' ? (
                  <Checkbox
                    id={data}
                    checked={!!watchedFields[data]}
                    onCheckedChange={(checked) => {
                      formData.setValue(data, checked as boolean);
                    }}
                  />
                )
                : (
                  data.map(el => (
                    <div key={el} className="flex items-center space-x-2">
                      <Checkbox
                        id={el}
                        checked={Array.isArray(field.value) && field.value.includes(el)}
                        onCheckedChange={(checked) => {
                          const newValue = checked
                            ? [...(Array.isArray(field.value) ? field.value : []), el]
                            : field.value.filter((val:string) => val !== el);
                          field.onChange(newValue);
                        }}
                        disabled={field.value?.length >= ( maxCount ?? data.length ) && !field.value.includes(el)}
                      />
                      <FormLabel htmlFor={el}>{el}</FormLabel>
                    </div>
                  ))
                )
              }
            </div>
          </FormControl>
          {errors[valueKey] && (
            <FormMessage className="absolute bottom-0 right-0 text-sm text-destructive mt-1">{errors[valueKey].message as string}</FormMessage>
          )}
        </FormItem>
      )}
    />
  );
}
