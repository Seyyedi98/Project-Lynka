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
import { Check, Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import HeroWorkspaceUploader from "../../common/input/workspace-hero-uploader";
import { HeroController } from "../../controller/hero-controller";

const type = "HeroElement";

const extraAttributes = {
  style: "",
  title: "",
  subtitle: "",
  heroType: "",
  heroValue: "",
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

  // Ensure element is defined and has a valid 'extraAttributes' property before checking length
  if (
    !element ||
    !element.extraAttributes ||
    Object.keys(element.extraAttributes).length === 0
  )
    return;

  const data = element?.extraAttributes;
  const RenderedElement = HeroController[data.style][0];

  return <RenderedElement {...data} />;
}

function LivePageComponent({ elementInstance }) {
  const element = elementInstance;
  const data = element?.extraAttributes;

  if (!data) return <Loader2 className="animate-spin" />;
  const RenderedElement = HeroController[data.style][0];

  return <RenderedElement {...data} />;
}

function PropertiesComponent({ elementInstance }) {
  const element = elementInstance;
  const dispatch = useDispatch();

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

    dispatch({
      type: "page/setHero",
      payload: {
        ...element,
        extraAttributes: {
          ...element.extraAttributes,
          title,
          subtitle,
        },
      },
    });

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
            className="absolute -top-20 right-2 flex cursor-pointer items-center justify-center rounded-full bg-green-500 p-2 duration-200 hover:bg-green-600 sm:right-0"
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
