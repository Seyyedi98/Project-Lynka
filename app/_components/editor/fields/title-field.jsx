"use client";

import { Button } from "@/components/ui/button";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-select";
import { Check, Heading } from "lucide-react";
import { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";

const type = "TitleField";

const extraAttributes = {
  title: "عنوان",
};

export const TitleFieldFormElement = {
  type,
  contruct: (id) => ({
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
  const { title } = element.extraAttributes;

  return (
    <div className="flex h-24 w-full flex-col gap-2 bg-pink-500">
      <p>{title}</p>
      {/* <Input readOnly disabled /> */}
    </div>
  );
}

function PageComponent({ elementInstance }) {
  const element = elementInstance;
  const { title } = element.extraAttributes;
  return <p className="bg-sky-400 p-12 text-2xl">{title}</p>;
}

function PropertiesComponent({ elementInstance }) {
  const element = elementInstance;
  const { updateElement, setSelectedElement } = useEditor();
  const { setIsWorkspaceMenuOpen } = useModal();

  const form = useForm({
    // resolver: zodResolver(),
    defaultValues: {
      title: element.extraAttributes.title || "",
    },
  });

  useEffect(() => {
    form.reset(element.extraAttributes);
  }, [element, form]);

  function applyChanges(values) {
    const { title } = values;

    updateElement(element.id, {
      ...element,
      extraAttributes: {
        title,
      },
    });

    setIsWorkspaceMenuOpen(false);
    setTimeout(() => setSelectedElement(null), 200);
  }

  return (
    <>
      <Form {...form}>
        <form
          // onBlur={form.handleSubmit(applyChanges)}

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
          <button
            type="submit"
            className="absolute right-3 top-3 flex cursor-pointer items-center justify-center rounded-full bg-green-500 p-2 duration-200 hover:bg-green-600"
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
