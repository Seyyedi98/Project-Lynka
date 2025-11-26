import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

const borderRadiusList = [
  { id: "none", value: "0px" },
  { id: "small", value: "4px" },
  { id: "medium", value: "8px" },
  { id: "large", value: "12px" },
  { id: "xlarge", value: "16px" },
  { id: "xxlarge", value: "100px" },
];

const ElementBorderRadiusFormField = ({ form, fieldName, label }) => {
  return (
    <FormField
      control={form.control}
      name={fieldName || "borderRadius"}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label || "زاویه گوشه ها"}</FormLabel>
          <FormControl>
            <div className="flex flex-col gap-4">
              <RadioGroup
                dir="rtl"
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="mt-2 flex items-center justify-between px-2"
              >
                {borderRadiusList.map((option) => (
                  <FormItem
                    key={option.id}
                    className="flexitems-center space-x-3 space-y-0"
                  >
                    <FormControl>
                      <RadioGroupItem className="hidden" value={option.value} />
                    </FormControl>
                    <FormLabel
                      className={`cursor-pointer font-normal text-icon-light`}
                    >
                      <div
                        style={{ borderRadius: option.value }}
                        className={cn(
                          `h-10 w-10 bg-icon-light/60`,
                          field.value === option.value && "bg-icon",
                        )}
                      ></div>
                    </FormLabel>
                  </FormItem>
                ))}
              </RadioGroup>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ElementBorderRadiusFormField;
