import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

const PageFieldValueSlider = ({ form, fieldName, label, max }) => {
  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <div className="flex items-center justify-between gap-4">
              <p>{label || "اندازه"}</p>
              <Slider
                {...field}
                onValueChange={(value) => field.onChange(value[0])}
                value={[field.value || 0]}
                max={max}
                step={10}
                className={cn("mx-auto w-[60%]")}
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default PageFieldValueSlider;
