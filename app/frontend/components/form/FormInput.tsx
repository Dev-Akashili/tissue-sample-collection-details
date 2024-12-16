/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface FormInputProps {
  form: any;
  name: string;
  label: string;
  placeholder?: string;
  width?: string;
  type?: string;
  disabled?: boolean;
}

export const FormInput = ({
  form,
  name,
  label,
  placeholder,
  disabled = false,
  type
}: FormInputProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="mt-2">
          <FormLabel className="dark:text-white">{label}</FormLabel>
          <FormControl>
            <Input
              placeholder={placeholder}
              type={type ? type : "text"}
              disabled={disabled}
              className="dark:text-white"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
