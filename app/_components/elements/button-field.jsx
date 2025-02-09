"use client";

import { fontsList } from "@/app/fonts/fonts";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ButtonIcon } from "@radix-ui/react-icons";
import { Check } from "lucide-react";
import { memo, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { ThemeController } from "../controller/theme-controller";
import { toast } from "@/hooks/use-toast";

const type = "ButtonField";

const extraAttributes = {
  title: "عنوان",
  theme: "",
  font: "",
  href: " ",
  color: "#ffffff",
};

const WorkspaceComponent = memo(function WorkspaceComponent({
  elementInstance,
}) {
  const element = elementInstance;
  const data = element.extraAttributes;
  const RenderedElement = ThemeController[element.type][data.theme][0];

  return <RenderedElement {...data} />;
});

function LivePageComponent({ elementInstance }) {
  const element = elementInstance;
  const data = element.extraAttributes;

  const RenderedElement = ThemeController[element.type][data.theme][0];
  return <RenderedElement isLive={true} {...data} />;
}

function PropertiesComponent({ elementInstance }) {
  const element = elementInstance;
  const dispatch = useDispatch();

  const form = useForm({
    // TODO: Create zod schema
    // resolver: zodResolver(),
    defaultValues: {
      title: element.extraAttributes.title || "",
      href: element.extraAttributes.href || "",
      font: element.extraAttributes.font || "",
      color: element.extraAttributes.color || "",
    },
  });

  useEffect(() => {
    form.reset(element.extraAttributes);
  }, [element, form]);

  function applyChanges(values) {
    const { title, href, font, color } = values;

    const payload = {
      id: element.id,
      updatedElement: {
        ...element,
        extraAttributes: {
          ...element.extraAttributes,
          title,
          href,
          font,
          color,
        },
      },
    };

    toast({
      description: "تغییرات با موفقیت اعمال شد",
    });

    dispatch({ type: "page/updateElement", payload });

    dispatch({ type: "modal/closeMenu" });
    setTimeout(
      () => dispatch({ type: "page/setSelectedElement", payload: null }),
      200,
    );
  }

  return (
    <>
      <Form {...form}>
        <form
          // onBlur={form.handleSubmit(applyChanges)}
          className="flex flex-col gap-2 text-primary"
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

          <div className="relative flex gap-1">
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
                            // Prevent space key
                            if (e.key === " ") {
                              e.preventDefault();
                            }
                            // Handle Enter key
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

          <FormField
            control={form.control}
            name="font"
            render={({ field }) => (
              <FormItem>
                <FormLabel>فونت</FormLabel>
                <FormControl>
                  <Select
                    {...field}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    dir="rtl"
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="فونت" />
                    </SelectTrigger>

                    <SelectContent>
                      {fontsList.map(({ fontName, fontValue }, index) => (
                        <SelectItem
                          className="hover:cursor-pointer"
                          key={`${index}-${fontName}`}
                          value={fontValue}
                        >
                          <p style={{ fontFamily: fontValue }}>{fontName}</p>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="color"
            render={({ field }) => (
              <FormItem>
                <FormLabel>رنگ</FormLabel>
                <FormControl>
                  <Input {...field} type="color" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Mobile drawaer button */}
          <button
            type="submit"
            className="absolute -top-20 right-2 flex cursor-pointer items-center justify-center rounded-full bg-green-500 p-2 duration-200 hover:bg-green-600 sm:right-0 md:hidden"
          >
            <Check className="h-4 w-4 text-white" />
          </button>

          {/* Desktop sidebar button */}
          <button
            type="submit"
            className="mt-4 hidden h-12 cursor-pointer items-center justify-center rounded-sm bg-green-500 p-2 text-white duration-200 hover:bg-green-600 sm:right-0 md:flex"
          >
            اعمال تغییرات
          </button>
        </form>
      </Form>
    </>
  );
}

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
  LivePageComponent: LivePageComponent,
  PropertiesComponent: PropertiesComponent,
};
