"use client";

import PageFieldValueSlider from "@/app/_components/section/workspace/page-value-slider";
import { Form } from "@/components/ui/form";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/hooks/use-toast";
import { Check, ChevronLeft } from "lucide-react";
import { Suspense, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import { ShinyButton } from "@/app/_components/common/button/shiny-button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ElementThemeSelector from "@/app/_components/theme/element-theme-selector";
import ElementTitleFormField from "@/app/_components/common/form/element-properties/element-title-formfield";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ElementFontFormField from "@/app/_components/common/form/element-properties/element-font-formfield";
import ElementColorFormField from "@/app/_components/common/form/element-properties/element-color-formfield";

function PropertiesComponent({ elementInstance }) {
  const element = elementInstance;
  const dispatch = useDispatch();

  const form = useForm({
    // resolver: zodResolver(cardFieldSchems),
    defaultValues: {
      title: element.extraAttributes.title || "",
      theme: element.extraAttributes.theme || "",
      textColor: element.extraAttributes.textColor || "",
      font: element.extraAttributes.font || "",
      deviderColor: element.extraAttributes.deviderColor || "",
    },
  });

  useEffect(() => {
    form.reset(element.extraAttributes);
  }, [element, form]);

  function applyChanges(values) {
    const { title, theme, textColor, font, deviderColor } = values;

    const payload = {
      id: element.id,
      updatedElement: {
        ...element,
        extraAttributes: {
          ...element.extraAttributes,
          title,
          theme,
          textColor,
          font,
          deviderColor,
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
        <Suspense
          fallback={
            <div>
              <div className="flex w-full gap-4">
                <Skeleton className="h-16 w-1/2" />

                <Skeleton className="h-16 w-1/2" />
              </div>
              <Skeleton className="mt-6 h-16 w-full" />
              <Skeleton className="mt-6 h-48 w-full" />
              <Skeleton className="mt-6 h-4 w-[250px]" />
              <Skeleton className="mt-3 h-4 w-[200px]" />
            </div>
          }
        >
          <form
            // onBlur={form.handleSubmit(applyChanges)}
            className="mt-4 flex flex-col gap-5 text-text/90"
            onSubmit={form.handleSubmit(applyChanges)}
          >
            {/* title, */}
            <ElementTitleFormField
              fieldName="title"
              placeholder="متن"
              form={form}
            />

            {/* font */}
            <ElementFontFormField fieldName="font" form={form} />

            {/* textColor */}
            <ElementColorFormField
              form={form}
              label="رنگ متن"
              fieldName="textColor"
            />

            {/* deviderColor */}
            <ElementColorFormField
              form={form}
              label="رنگ بلوک"
              fieldName="deviderColor"
            />

            {/* Mobile drawaer button */}
            <button
              type="submit"
              className="absolute -top-16 right-2 flex cursor-pointer items-center justify-center rounded-full bg-green-500 p-2 duration-200 hover:bg-green-600 sm:right-0 md:hidden"
            >
              <Check className="h-4 w-4 text-white" />
            </button>

            {/* Desktop sidebar button */}
            <button
              type="submit"
              className="mt-4 hidden h-12 cursor-pointer items-center justify-center rounded-md bg-green-500 p-2 text-white duration-200 hover:bg-green-600 sm:right-0 md:flex"
            >
              اعمال تغییرات
            </button>
          </form>
        </Suspense>
      </Form>

      <div className="mt-auto">
        <Dialog>
          <DialogTrigger asChild>
            <ShinyButton
              className="mt-4 h-14 w-full bg-button hover:bg-card-light"
              size="lg"
            >
              <span className="s flex w-full items-center justify-between text-text">
                تغییر تم
                <ChevronLeft />
              </span>
            </ShinyButton>
          </DialogTrigger>
          <DialogContent className="flex h-screen max-h-svh w-screen max-w-full flex-grow flex-col gap-0 p-0">
            <DialogTitle className="hidden"></DialogTitle>
            <DialogDescription className="hidden"></DialogDescription>
            <ElementThemeSelector elementInstance={element} />
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}

export default PropertiesComponent;
