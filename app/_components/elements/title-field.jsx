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
import useModal from "@/hooks/useModal";
import { Check, Heading } from "lucide-react";
import { memo, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { ThemeController } from "../controller/theme-controller";

const type = "TitleField";

const extraAttributes = {
  title: "عنوان",
  theme: "",
};

const WorkspaceComponent = memo(function WorkspaceComponent({
  elementInstance,
}) {
  const element = elementInstance;
  const { title, theme } = element.extraAttributes;
  const RenderedElement = ThemeController[element.type][theme];

  return <RenderedElement title={title} />;
});

function LivePageComponent({ elementInstance }) {
  const element = elementInstance;
  const { title, theme } = element.extraAttributes;

  const RenderedElement = ThemeController[element.type][theme];

  return <RenderedElement title={title} />;
}

function PropertiesComponent({ elementInstance }) {
  const element = elementInstance;
  const dispatch = useDispatch();

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
    const { title } = values;

    const payload = {
      id: element.id,
      updatedElement: {
        ...element,
        extraAttributes: {
          ...element.extraAttributes,
          title,
        },
      },
    };
    dispatch({ type: "page/updateElement", payload });

    closeMenu();
    setTimeout(
      dispatch({ type: "page/setSelectedElement", payload: null }),
      200,
    );
  }

  return (
    <>
      <Form {...form}>
        <form
          // onBlur={form.handleSubmit(applyChanges)}
          className="flex flex-col gap-2"
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
            className="absolute -top-20 right-2 flex cursor-pointer items-center justify-center rounded-full bg-green-500 p-2 duration-200 hover:bg-green-600 sm:right-0"
          >
            <Check className="h-4 w-4 text-white" />
          </button>
        </form>
      </Form>
    </>
  );
}

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
  LivePageComponent: LivePageComponent,
  PropertiesComponent: PropertiesComponent,
};
