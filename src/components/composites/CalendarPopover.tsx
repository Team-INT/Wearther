// libs
import { format } from "date-fns";

// components
import {
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
  FormItem,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";

// hooks
import { FieldValues } from "react-hook-form";

// icons
import { CalendarIcon } from "lucide-react";

// utils
import { cn } from "@/lib/utils";

// types
import { CompositesFormProps } from "@/lib/types/typeUi";

export function CalendarPopover<T extends FieldValues>({ form, valueKey, label } : CompositesFormProps<T>) {
  return (
    <FormField
      control={form.control}
      name={valueKey}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel
            className="text-sm font-medium text-muted-foreground"
            htmlFor="name"
          >
            {label ?? ""}
          </FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[240px] pl-3 text-left font-normal",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value ? (
                    format(field.value, "yyyy-MM-dd")
                  ) : (
                    <span>Pick a date</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                disabled={(date) =>
                  date > new Date() || date < new Date("1900-01-01")
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
