"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useEditor from "@/hooks/useEditor";
import useModal from "@/hooks/useModal";
import { Check, Heading } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const type = "TitleField";

const extraAttributes = {
  title: "عنوان",
  theme: "",
};

export const TitleFieldFormElement = {
  type,
  construct: (id) => ({
    id,
    type,
    extraAttributes,
  }),

  ElementAdderBtn: {
    icon: Heading,
    label: "عنوان",
  },

  WorkspaceComponent: WorkspaceComponent,
  PageComponent: PageComponent,
  PropertiesComponent: PropertiesComponent,
};

function WorkspaceComponent({ elementInstance }) {
  const element = elementInstance;
  const { title, theme } = element.extraAttributes;

  return (
    <div className="flex h-16 w-full flex-col items-center justify-center gap-2 rounded-md border-2 border-slate-800 bg-card p-2">
      <p>
        {title} {theme}
      </p>
      {/* <Input readOnly disabled /> */}
    </div>
  );
}

function PageComponent({ elementInstance }) {
  const element = elementInstance;
  const { title } = element.extraAttributes;
  return (
    <div className="flex h-16 w-full flex-col items-center justify-center gap-2 rounded-md border-2 border-slate-800 bg-card p-2">
      <p>{title}</p>
    </div>
  );
}

function PropertiesComponent({ elementInstance }) {
  const element = elementInstance;
  const { updateElement, setSelectedElement } = useEditor();
  const { closeMenu } = useModal();

  const form = useForm({
    // TODO: Create zod schema
    // resolver: zodResolver(),
    defaultValues: {
      title: element.extraAttributes.title || "",
      theme: element.extraAttributes.theme,
    },
  });

  useEffect(() => {
    form.reset(element.extraAttributes);
  }, [element, form]);

  function applyChanges(values) {
    const { title, theme } = values;

    updateElement(element.id, {
      ...element,
      extraAttributes: {
        title,
        theme,
      },
    });

    closeMenu();
    setTimeout(() => setSelectedElement(null), 200);
  }

  return (
    <>
      <Form {...form}>
        <form
          // onBlur={form.handleSubmit(applyChanges)}
          className="mx-2 flex flex-col gap-2"
          onSubmit={form.handleSubmit(applyChanges)}
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>عنوان</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.currentTarget.blur();
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="theme"
            render={({ field }) => (
              <FormItem>
                <FormLabel>تم</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.currentTarget.blur();
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <button
            type="submit"
            className="absolute -top-20 right-2 flex cursor-pointer items-center justify-center rounded-full bg-green-500 p-2 duration-200 hover:bg-green-600"
          >
            <Check className="h-4 w-4 text-white" />
          </button>
        </form>
      </Form>
    </>
  );
}

const TitleField = () => {
  return <div>TitleField</div>;
};

export default TitleField;
