import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { AlignCenter, AlignJustify, AlignLeft, AlignRight } from "lucide-react";

const ElementItemsToggleFormField = ({ form, fieldName, placeholder }) => {
  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem>
          {/* <FormLabel>متن</FormLabel> */}
          <FormControl>
            <ToggleGroup
              {...field}
              onValueChange={field.onChange}
              defaultValue={field.value}
              type="single"
            >
              <ToggleGroupItem value="left" aria-label="Toggle bold">
                <AlignLeft className="h-4 w-4" />
              </ToggleGroupItem>
              <ToggleGroupItem value="center" aria-label="Toggle italic">
                <AlignCenter className="h-4 w-4" />
              </ToggleGroupItem>
              <ToggleGroupItem value="right" aria-label="Toggle strikethrough">
                <AlignRight className="h-4 w-4" />
              </ToggleGroupItem>
              <ToggleGroupItem
                value="justify"
                aria-label="Toggle strikethrough"
              >
                <AlignJustify className="h-4 w-4" />
              </ToggleGroupItem>
            </ToggleGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ElementItemsToggleFormField;
