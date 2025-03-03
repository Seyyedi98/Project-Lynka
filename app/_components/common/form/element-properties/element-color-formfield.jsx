import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const ElementColorFormField = ({ form, fieldName, label }) => {
  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <div className="flex items-center justify-between gap-4">
              <FormLabel className="text-nowrap">{label}</FormLabel>
              <Input className="w-[220px]" {...field} type="color" />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ElementColorFormField;
