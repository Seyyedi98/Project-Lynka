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
import { PlusCircleIcon, XIcon, CheckIcon } from "lucide-react";
import dynamic from "next/dynamic";
import { useState } from "react";

const ImageUploaderField = dynamic(
  () =>
    import("../../input/image-uploader").then((mod) => mod.ImageUploaderField),
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
  const [confirmDeleteIndex, setConfirmDeleteIndex] = useState(null);

  const handleDeleteClick = (index, e) => {
    e.preventDefault();
    if (confirmDeleteIndex === index) {
      // Second click - confirm deletion
      const currentSlides = form.getValues("slides") || [];
      const newSlides = currentSlides.filter((_, i) => i !== index);
      form.setValue("slides", newSlides);
      setConfirmDeleteIndex(null);
    } else {
      // First click - show confirmation
      setConfirmDeleteIndex(index);
    }
  };

  const cancelDelete = () => {
    setConfirmDeleteIndex(null);
  };

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
                    className="relative flex flex-col gap-2 rounded border border-border/50 p-2 dark:border-border"
                  >
                    {/* Title */}
                    <div className="mt-8 flex items-center justify-between gap-1">
                      <Input
                        placeholder="عنوان"
                        value={item.title}
                        onChange={(e) => {
                          field.value[index].title = e.target.value;
                          field.onChange(field.value);
                        }}
                      />
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

                    {/* Delete button with confirmation */}
                    {confirmDeleteIndex === index ? (
                      <div className="absolute right-2 top-2 flex gap-1">
                        <Button
                          variant="destructive"
                          size="icon"
                          className="h-6 w-6 rounded-full"
                          onClick={(e) => handleDeleteClick(index, e)}
                        >
                          <CheckIcon className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-6 w-6 rounded-full"
                          onClick={cancelDelete}
                        >
                          <XIcon className="h-3 w-3" />
                        </Button>
                      </div>
                    ) : (
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute right-2 top-2 h-6 w-6 rounded-full"
                        onClick={(e) => handleDeleteClick(index, e)}
                      >
                        <XIcon className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </FormControl>
          </div>

          <Button
            variant="primary_2"
            className="w-full gap-2 text-white"
            onClick={(e) => {
              e.preventDefault();
              form.setValue(
                "slides",
                field.value.concat({ title: "", description: "", image: "" }),
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
