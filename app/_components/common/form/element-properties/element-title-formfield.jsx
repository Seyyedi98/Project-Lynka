import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const ElementTitleFormField = ({ form, fieldName, placeholder }) => {
  return (
    <FormField
      control={form.control}
      name={fieldName || "title"}
      render={({ field }) => (
        <FormItem>
          {/* <FormLabel>عنوان</FormLabel> */}
          <FormControl>
            <Input
              {...field}
              placeholder={placeholder || "عنوان"}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.currentTarget.blur();
                }
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ElementTitleFormField;
