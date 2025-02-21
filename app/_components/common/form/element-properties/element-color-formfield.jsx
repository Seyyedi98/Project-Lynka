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
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input {...field} type="color" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ElementColorFormField;
