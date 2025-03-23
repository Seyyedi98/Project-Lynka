import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PlusCircleIcon } from "lucide-react";
import CloseIcon from "../../button/close-button";

const ElementAddQuestionsFormField = ({ form, fieldName, description }) => {
  return (
    <FormField
      control={form.control}
      name={fieldName || "questions"}
      render={({ field }) => (
        <FormItem>
          <Button
            variant="outline"
            className="gap-2"
            onClick={(e) => {
              e.preventDefault();
              form.setValue(
                "questions",
                field.value.concat({ question: "", answer: "" }),
              );
            }}
          >
            <PlusCircleIcon />
            افزودن
          </Button>

          <div>
            <FormControl>
              <div className="flex flex-col gap-2">
                {form.watch("questions")?.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col gap-2 rounded border p-2"
                  >
                    <div className="flex items-center justify-between gap-1">
                      <Input
                        placeholder="سوال"
                        value={item.question}
                        onChange={(e) => {
                          field.value[index].question = e.target.value;
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
                    <Input
                      placeholder="جواب"
                      value={item.answer}
                      onChange={(e) => {
                        field.value[index].answer = e.target.value;
                        field.onChange(field.value);
                      }}
                    />
                  </div>
                ))}
              </div>
            </FormControl>
          </div>
          {description && (
            <FormDescription className="text-xs">{description}</FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ElementAddQuestionsFormField;
