import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircleIcon, XIcon } from "lucide-react";
import { useState } from "react";

const fieldTypes = [
  {
    value: "text",
    name: "متن کوتاه",
    description: "برای متن های کوتاه مثل اسم، ایمیل و...",
  },
  {
    value: "textarea",
    name: "متن طولانی",
    description: "برای متن های طولانی، مانند آدرس",
  },
  {
    value: "number",
    name: "عدد",
    description: "برای ورودی اعداد",
  },
];

const ElementAddContactFormFormField = ({
  form,
  fieldName = "fields",
  description,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmDeleteIndex, setConfirmDeleteIndex] = useState(null);

  const handleDeleteClick = (index, e) => {
    e.preventDefault();
    if (confirmDeleteIndex === index) {
      const currentFields = form.getValues(fieldName) || [];
      const newFields = currentFields.filter((_, i) => i !== index);
      form.setValue(fieldName, newFields);
      setConfirmDeleteIndex(null);
    } else {
      setConfirmDeleteIndex(index);
    }
  };

  const addField = (fieldType) => {
    const currentFields = form.getValues(fieldName) || [];
    form.setValue(fieldName, [
      ...currentFields,
      {
        type: fieldType,
        label: "",
        required: false,
        placeholder: "",
      },
    ]);
    setIsModalOpen(false);
  };

  const handleFieldChange = (index, key, value) => {
    const currentFields = form.getValues(fieldName) || [];
    const updatedFields = [...currentFields];
    updatedFields[index] = { ...updatedFields[index], [key]: value };
    form.setValue(fieldName, updatedFields);
  };

  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem>
          <div>
            <FormControl>
              <div className="flex flex-col gap-4">
                {(field.value || []).map((item, index) => (
                  <div
                    key={index}
                    className="relative flex flex-col gap-2 rounded border border-border/50 p-4 pt-10 dark:border-border"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-medium">
                        {fieldTypes.find((p) => p.value === item.type)?.name ||
                          "Field"}
                      </span>
                    </div>

                    <Input
                      placeholder="عنوان فیلد"
                      value={item.label}
                      onChange={(e) =>
                        handleFieldChange(index, "label", e.target.value)
                      }
                    />

                    <Input
                      placeholder="متن نمونه"
                      value={item.placeholder}
                      onChange={(e) =>
                        handleFieldChange(index, "placeholder", e.target.value)
                      }
                    />

                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id={`required-${index}`}
                        checked={item.required}
                        onChange={(e) =>
                          handleFieldChange(index, "required", e.target.checked)
                        }
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label htmlFor={`required-${index}`} className="text-sm">
                        پر کردن این فیلد اجباری است
                      </label>
                    </div>

                    <div className="absolute right-2 top-2">
                      {confirmDeleteIndex === index ? (
                        <div className="flex gap-1">
                          <Button
                            variant="destructive"
                            size="icon"
                            className="h-6 w-6 rounded-full"
                            onClick={(e) => handleDeleteClick(index, e)}
                          >
                            ✓
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-6 w-6 rounded-full"
                            onClick={() => setConfirmDeleteIndex(null)}
                          >
                            <XIcon className="h-3 w-3" />
                          </Button>
                        </div>
                      ) : (
                        <Button
                          variant="destructive"
                          size="icon"
                          className="h-6 w-6 rounded-full"
                          onClick={(e) => handleDeleteClick(index, e)}
                        >
                          <XIcon className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </FormControl>
          </div>

          <Button
            variant="primary_2"
            className="mt-2 w-full gap-2"
            size="md"
            onClick={(e) => {
              e.preventDefault();
              setIsModalOpen(true);
            }}
          >
            <PlusCircleIcon />
            افزودن فیلد جدید
          </Button>

          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>نوع فیلد را انتخاب کنید</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-1 gap-2">
                {fieldTypes.map((fieldType) => (
                  <div
                    key={fieldType.value}
                    className="flex cursor-pointer items-center justify-between gap-2 rounded-md border border-border p-4 text-left"
                    onClick={() => addField(fieldType.value)}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{fieldType.icon}</span>
                      <div className="flex flex-col gap-2">
                        <div className="text-right font-medium text-text">
                          {fieldType.name}
                        </div>
                        <div className="text-right text-xs text-muted-foreground">
                          {fieldType.description}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </DialogContent>
          </Dialog>

          {description && (
            <FormDescription className="text-xs">{description}</FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ElementAddContactFormFormField;
