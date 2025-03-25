import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { PlusCircleIcon } from "lucide-react";
import dynamic from "next/dynamic";

const ImageUploaderField = dynamic(
  () =>
    import("../../input/slider-image-uploader").then(
      (mod) => mod.ImageUploaderField,
    ),
  {
    ssr: false,
    loading: () => <Skeleton className="h-32 w-full rounded-md"></Skeleton>,
  },
);

const ElementAddSlideFormField = ({
  form,
  fieldName,
  description,
  element,
}) => {
  return (
    <FormField
      control={form.control}
      name={fieldName || "slides"}
      render={({ field }) => (
        <FormItem>
          <div>
            <FormControl>
              <div className="flex flex-col gap-2">
                {form.watch("slides")?.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col gap-2 rounded border border-border/50 p-2 dark:border-border"
                  >
                    {/* Title */}
                    <div className="flex items-center justify-between gap-1">
                      <Input
                        placeholder="عنوان"
                        value={item.title}
                        onChange={(e) => {
                          field.value[index].title = e.target.value;
                          field.onChange(field.value);
                        }}
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.preventDefault();
                          const newOptions = [...field.value];
                          newOptions.splice(index, 1);
                          field.onChange(newOptions);
                        }}
                      >
                        <span className="px-2">حذف</span>
                      </Button>
                    </div>

                    {/* Description */}
                    <Input
                      placeholder="توضیحات"
                      value={item.description}
                      onChange={(e) => {
                        field.value[index].description = e.target.value;
                        field.onChange(field.value);
                      }}
                    />

                    {/* image uplaoder */}
                    <ImageUploaderField
                      value={item.image}
                      onChange={(value) => {
                        field.value[index].image = value;
                        field.onChange(field.value);
                      }}
                      index={index}
                      options={{
                        maxSizeMB: 0.4,
                        maxWidthOrHeight: 720,
                        useWebWorker: true,
                      }}
                    />
                  </div>
                ))}
              </div>
            </FormControl>
          </div>

          <Button
            variant="primary_2"
            className="w-full gap-2 text-text"
            onClick={(e) => {
              e.preventDefault();
              form.setValue(
                "slides",
                field.value.concat({ title: "", image: "" }),
              );
            }}
          >
            <PlusCircleIcon />
            افزودن اسلاید جدید
          </Button>
          {description && (
            <FormDescription className="text-xs">{description}</FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ElementAddSlideFormField;
