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
import { Check, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { HeroController } from "../../controller/hero-controller";
import { useEffect } from "react";
import HeroWorkspaceUploader from "../../common/input/workspace-hero-uploader";

const type = "HeroElement";

const extraAttributes = {
  style: "",
  title: "",
  subtitle: "",
  primaryImage: "",
  secondaryImage: "",
};

export const PageHeroElement = {
  type,
  construct: (id) => ({
    id,
    type,
    extraAttributes,
  }),

  WorkspaceComponent: WorkspaceComponent,
  LivePageComponent: LivePageComponent,
  PropertiesComponent: PropertiesComponent,
};

function WorkspaceComponent({ elementInstance }) {
  const element = elementInstance;
  if (element.length == 0) return;

  const { style, title, subtitle, primaryImage } = element?.extraAttributes;
  const RenderedElement = HeroController[style];

  return (
    <RenderedElement
      title={title}
      subtitle={subtitle}
      primaryImage={primaryImage}
    />
  );
}

function LivePageComponent({ elementInstance }) {
  const element = elementInstance;
  const { style, title, subtitle, primaryImage } = element.extraAttributes;

  if (!style) return <Loader2 className="animate-spin" />;
  const RenderedElement = HeroController[style];

  return (
    <RenderedElement
      title={title}
      subtitle={subtitle}
      primaryImage={primaryImage}
    />
  );
}

function PropertiesComponent({ elementInstance }) {
  const element = elementInstance;
  const { updateHero, setSelectedElement } = useEditor();
  const { closeMenu } = useModal();

  const form = useForm({
    // TODO: Create zod schema
    // resolver: zodResolver(),
    defaultValues: {
      title: element.title || "",
      subtitle: element.subtitle || "",
    },
  });

  useEffect(() => {
    form.reset(element.extraAttributes);
  }, [element, form]);

  function applyChanges(values) {
    const { title, subtitle } = values;

    updateHero({
      ...element,
      extraAttributes: {
        ...element.extraAttributes,
        title,
        subtitle,
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
            name="subtitle"
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
            className="absolute -top-20 right-2 flex cursor-pointer items-center justify-center rounded-full bg-green-500 p-2 duration-200 hover:bg-green-600"
          >
            <Check className="h-4 w-4 text-white" />
          </button>
          <div className="mt-2">
            <HeroWorkspaceUploader />
          </div>
        </form>
      </Form>
    </>
  );
}
