"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useEditor from "@/hooks/useEditor";
import useModal from "@/hooks/useModal";
import { ButtonIcon } from "@radix-ui/react-icons";
import { Check, Heading } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const type = "ButtonField";

const extraAttributes = {
  title: "عنوان",
  href: " ",
};

export const ButtonFieldFormElement = {
  type,
  construct: (id) => ({
    id,
    type,
    extraAttributes,
  }),

  ElementAdderBtn: {
    icon: ButtonIcon,
    label: "لینک",
  },

  WorkspaceComponent: WorkspaceComponent,
  PageComponent: PageComponent,
  PropertiesComponent: PropertiesComponent,
};

function WorkspaceComponent({ elementInstance }) {
  const element = elementInstance;
  const { title } = element.extraAttributes;

  return (
    <div className="flex h-16 w-full flex-col items-center justify-center gap-2 rounded-md border-2 border-slate-800 bg-card p-2">
      <p>{title}</p>
    </div>
  );
}

function PageComponent({ elementInstance }) {
  const element = elementInstance;
  const { title, href } = element.extraAttributes;

  return (
    <Link
      href={`http://${href}`}
      target="_blank" // ask open in new page??
      className="flex h-16 w-full flex-col items-center justify-center gap-2 rounded-md border-2 border-slate-800 bg-card p-2"
    >
      <p>{title}</p>
    </Link>
  );
}

function PropertiesComponent({ elementInstance }) {
  const element = elementInstance;
  const { updateElement, setSelectedElement } = useEditor();
  const { closeMenu } = useModal();

  const form = useForm({
    // resolver: zodResolver(),
    defaultValues: {
      title: element.extraAttributes.title || "",
      href: element.extraAttributes.href || "",
    },
  });

  useEffect(() => {
    form.reset(element.extraAttributes);
  }, [element, form]);

  function applyChanges(values) {
    const { title, href } = values;

    updateElement(element.id, {
      ...element,
      extraAttributes: {
        title,
        href,
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
          className="flex flex-col gap-4"
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

          <div className="flex gap-1">
            <div className="w-full">
              <FormField
                control={form.control}
                name="href"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>آدرس</FormLabel>
                    <FormDescription>
                      آدرس صفحه ای که می خواهید به آن هدایت شوید
                    </FormDescription>
                    <div>
                      <FormControl>
                        <Input
                          dir="ltr"
                          {...field}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.currentTarget.blur();
                            }
                          }}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mb-1 flex items-end justify-end" dir="ltr">
              http://
            </div>
          </div>
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

const ButtonField = () => {
  return <div>ButtonField</div>;
};

export default ButtonField;
