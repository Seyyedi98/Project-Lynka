import { fontsList } from "@/app/fonts/fonts";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ElementFontFormField = ({ form, fieldName, label }) => {
  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <div className="flex items-center justify-between gap-4">
              <FormLabel className="text-nowrap">{label || "فونت"}</FormLabel>
              <Select
                {...field}
                onValueChange={field.onChange}
                defaultValue={field.value}
                dir="rtl"
              >
                <SelectTrigger className="w-[220px]">
                  <SelectValue placeholder="فونت" />
                </SelectTrigger>

                <SelectContent>
                  {fontsList.map(({ fontName, fontValue }, index) => (
                    <SelectItem
                      className="hover:cursor-pointer"
                      key={`${index}-${fontName}`}
                      value={fontValue}
                    >
                      <p style={{ fontFamily: fontValue }}>{fontName}</p>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ElementFontFormField;
