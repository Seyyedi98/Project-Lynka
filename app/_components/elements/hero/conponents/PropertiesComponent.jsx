"use client";

import ElementColorFormField from "@/app/_components/common/form/element-properties/element-color-formfield";
import ElementFontFormField from "@/app/_components/common/form/element-properties/element-font-formfield";
import ElementTitleFormField from "@/app/_components/common/form/element-properties/element-title-formfield";
import { fontsList } from "@/app/fonts/fonts";
import {
  Form,
  FormControl,
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
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { Check, LoaderIcon } from "lucide-react";
import dynamic from "next/dynamic";
import { Suspense, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

const UploadButton = dynamic(
  () => import("@/app/_components/common/input/workspace-hero-uploader"),
);

function PropertiesComponent({ elementInstance }) {
  const element = elementInstance;
  const dispatch = useDispatch();

  const form = useForm({
    // TODO: Create zod schema
    // resolver: zodResolver(),
    defaultValues: {
      title: element.title || "",
      subtitle: element.subtitle || "",
      titleFont: element.extraAttributes.titleFont || "",
      subtitleFont: element.extraAttributes.subtitleFont || "",
      titleColor: element.extraAttributes.titleColor || "",
      subtitleColor: element.extraAttributes.subtitleColor || "",
    },
  });

  useEffect(() => {
    form.reset(element.extraAttributes);
  }, [element, form]);

  function applyChanges(values) {
    const {
      title,
      subtitle,
      titleFont,
      subtitleFont,
      titleColor,
      subtitleColor,
    } = values;

    dispatch({
      type: "page/setHero",
      payload: {
        ...element,
        extraAttributes: {
          ...element.extraAttributes,
          title,
          subtitle,
          titleFont,
          subtitleFont,
          titleColor,
          subtitleColor,
        },
      },
    });

    toast({
      description: "تغییرات با موفقیت اعمال شد",
    });

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
            className="flex flex-col gap-2"
            onSubmit={form.handleSubmit(applyChanges)}
          >
            <Tabs dir="rtl" defaultValue="content" className="">
              <TabsList className="mb-2">
                <TabsTrigger value="content">محتوا</TabsTrigger>
                <TabsTrigger value="style">استایل</TabsTrigger>
              </TabsList>

              <TabsContent value="content" className="flex flex-col gap-4">
                {/* Title */}
                <ElementTitleFormField form={form} />

                {/* Subtitle */}
                <ElementTitleFormField
                  form={form}
                  fieldName="subtitle"
                  placeholder="توضیحات"
                />
              </TabsContent>

              <TabsContent value="style" className="flex flex-col gap-4">
                {/* Title Color */}
                <ElementColorFormField
                  form={form}
                  fieldName="titleColor"
                  label="رنگ"
                />

                {/* Title Font */}
                <ElementFontFormField
                  form={form}
                  fieldName="titleFont"
                  label="فونت عنوان اصلی"
                />

                {/* Subtitle Color */}
                <ElementColorFormField
                  form={form}
                  fieldName="subtitleColor"
                  label="رنگ"
                />

                {/* Subtitle Font */}
                <ElementFontFormField
                  form={form}
                  fieldName="subtitleFont"
                  label="فونت عنوان دوم"
                />
              </TabsContent>
            </Tabs>

            <div className="mt-2">
              {/* <HeroWorkspaceUploader /> */}
              <UploadButton />
              <p className="text-xs text-textLight">
                پس از انتخاب فایل، دکمه بارگزاری را بزنید
              </p>
            </div>

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
        </Suspense>
      </Form>
    </>
  );
}

export default PropertiesComponent;
