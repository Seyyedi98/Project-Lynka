import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
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

const ElementAddGalleyImageFormField = ({ form, fieldName }) => {
  const [confirmDeleteIndex, setConfirmDeleteIndex] = useState(null);

  const handleDeleteClick = (index, e) => {
    e.preventDefault();
    if (confirmDeleteIndex === index) {
      // Second click - confirm deletion
      const currentImages = form.getValues("images") || [];
      const newImages = currentImages.filter((_, i) => i !== index);
      form.setValue("images", newImages);
      setConfirmDeleteIndex(null);
    } else {
      // First click - show confirmation
      setConfirmDeleteIndex(index);
    }
  };

  const cancelDelete = () => {
    setConfirmDeleteIndex(null);
  };

  const handleImageChange = (value, index) => {
    const currentImages = form.getValues("images") || [];
    const newImages = [...currentImages];
    newImages[index] = { image: value };

    // Filter out empty images immediately
    const filteredImages = newImages.filter(
      (item) => item.image && item.image !== "",
    );
    form.setValue("images", filteredImages);
  };

  const handleAddImage = (e) => {
    e.preventDefault();
    const currentImages = form.getValues("images") || [];

    // Only allow adding new field if there are no empty images
    if (currentImages.every((item) => item.image && item.image !== "")) {
      form.setValue("images", [...currentImages, { image: "" }]);
    }
  };

  // Get the current images for display (including the empty one if being added)
  const displayImages = () => {
    const currentImages = form.getValues("images") || [];
    // If the form has an empty image, show it (for UI purposes)
    if (currentImages.some((item) => !item.image || item.image === "")) {
      return currentImages;
    }
    // Otherwise, show the current images plus an empty one if we want to allow addition
    return [...currentImages, { image: "" }];
  };

  return (
    <FormField
      control={form.control}
      name={fieldName || "images"}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <div className="flex flex-col gap-4">
              {displayImages().map((item, index) => (
                <div
                  key={index}
                  className="relative rounded border border-border/50 p-2 dark:border-border"
                >
                  <ImageUploaderField
                    value={item.image}
                    onChange={(value) => handleImageChange(value, index)}
                    options={{
                      maxSizeMB: 0.4,
                      maxWidthOrHeight: 720,
                      useWebWorker: true,
                    }}
                    showImageDeleteButton={false}
                  />

                  {item.image &&
                    item.image !== "" &&
                    (confirmDeleteIndex === index ? (
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
                    ))}
                </div>
              ))}

              {/* <Button
                variant="outline"
                className="w-full gap-2"
                onClick={handleAddImage}
              >
                <PlusCircleIcon className="h-4 w-4" />
                افزودن تصویر جدید
              </Button> */}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ElementAddGalleyImageFormField;
