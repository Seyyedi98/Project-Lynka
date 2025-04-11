import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

const ElementTextAreaFormField = ({ form, fieldName, placeholder }) => {
  return (
    <FormField
      control={form.control}
      name={fieldName || "title"}
      render={({ field }) => (
        <FormItem>
          <FormLabel>متن</FormLabel>
          <FormControl>
            <Textarea
              {...field}
              className="h-20"
              placeholder={placeholder || "عنوان"}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ElementTextAreaFormField;
