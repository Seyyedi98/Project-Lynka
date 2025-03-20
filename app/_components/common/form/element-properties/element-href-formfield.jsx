import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const ElementhrefFormField = ({ form, message }) => {
  return (
    <FormField
      control={form.control}
      name="href"
      render={({ field }) => (
        <FormItem>
          {/* <FormLabel>آدرس</FormLabel> */}

          <div>
            <FormControl>
              <Input
                dir="ltr"
                {...field}
                placeholder="http://url..."
                onKeyDown={(e) => {
                  // Prevent space key
                  if (e.key === " ") {
                    e.preventDefault();
                  }
                  // Handle Enter key
                  if (e.key === "Enter") {
                    e.currentTarget.blur();
                  }
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
