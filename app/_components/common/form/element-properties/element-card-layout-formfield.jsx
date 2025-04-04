import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { DesktopIcon } from "@radix-ui/react-icons";

const layoutOptions = [
  { id: "basic", label: "Option 1" },
  { id: "roundedImage", label: "Option 2" },
  { id: "wideFullImage", label: "Option 3" },
  { id: "highFullImage", label: "Option 3" },
];

const ElementCardLayoutFormField = ({
  form,
  isPremium,
  RenderElement,
  element,
}) => {
  return (
    <FormField
      control={form.control}
      name="layout"
      render={({ field }) => (
        <FormItem>
          <FormLabel>طرح بندی</FormLabel>
          <FormControl>
            <div className="flex flex-col gap-4">
              <RadioGroup
                dir="rtl"
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="mt-2 flex items-center justify-between px-8"
              >
                {layoutOptions.map((option) => (
                  <FormItem
                    key={option.id}
                    className="flex items-center space-x-3 space-y-0"
                  >
                    <FormControl>
                      <RadioGroupItem className="hidden" value={option.id} />
                    </FormControl>
                    <FormLabel
                      className={`cursor-pointer font-normal text-icon-light ${
                        field.value === option.id ? "text-muted-foreground" : ""
                      }`}
                    >
                      <div>
                        <DesktopIcon className="h-7 w-7" />
                      </div>
                    </FormLabel>
                  </FormItem>
                ))}
              </RadioGroup>

              <div
                className={cn(
                  "pointer-events-none mt-2 scale-95",
                  !isPremium && field.value === "wideFullImage" && "opacity-40",
                  !isPremium && field.value === "highFullImage" && "opacity-40",
                )}
              >
                <RenderElement
                  {...element.extraAttributes}
                  layout={field.value}
                />
              </div>
              {!isPremium &&
                (field.value === "wideFullImage" ||
                  field.value === "highFullImage") && (
                  <p className="-mt-4 mb-2 text-center text-sm text-destructive">
                    برای استفاده ای این قابلیت به اشتراک ویژه نیاز دارید
                  </p>
                )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ElementCardLayoutFormField;
