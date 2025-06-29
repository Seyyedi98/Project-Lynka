import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const ElementhrefFormField = ({ form, message, fieldName }) => {
  return (
    <FormField
      control={form.control}
      name={fieldName || "href"}
      render={({ field }) => (
        <FormItem>
          <div>
            <FormControl>
              <Input
                dir="ltr"
                {...field}
                placeholder="http://url..."
                onChange={(e) => {
                  const value = e.target.value;
                  field.onChange(value);
                }}
                onBlur={(e) => {
                  const value = e.target.value.replace(/^https?:\/\//i, "");
                  field.onChange(value);
                }}
              />
            </FormControl>
          </div>
          <FormDescription className="text-xs">{message}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ElementhrefFormField;
