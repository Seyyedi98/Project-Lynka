"use client";

import SquareButton from "@/app/_components/common/button/square-button";
import ElementColorFormField from "@/app/_components/common/form/element-properties/element-color-formfield";
import ElementFontFormField from "@/app/_components/common/form/element-properties/element-font-formfield";
import ElementTitleFormField from "@/app/_components/common/form/element-properties/element-title-formfield";
import Divider from "@/app/_components/common/shared/devider";
import PageFieldValueSlider from "@/app/_components/section/workspace/page-value-slider";
import { Form } from "@/components/ui/form";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { heroFieldSchems } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check } from "lucide-react";
import dynamic from "next/dynamic";
import { Suspense, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

const UploadButton = dynamic(
  () => import("@/app/_components/common/input/workspace-hero-uploader"),
);
const UploadButtonSecondary = dynamic(
  () =>
    import("@/app/_components/common/input/workspace-hero-secondary-uploader"),
);

function PropertiesComponent({ elementInstance }) {
  const element = elementInstance;
  const dispatch = useDispatch();

  const form = useForm({
    // resolver: zodResolver(heroFieldSchems),
    defaultValues: {
      heroType: element.extraAttributes.heroType || "",
      heroValue: element.extraAttributes.heroValue || "",
      title: element.extraAttributes.title || "",
      subtitle: element.extraAttributes.subtitle || "",
      titleFont: element.extraAttributes.titleFont || "",
      subtitleFont: element.extraAttributes.subtitleFont || "",
      titleColor: element.extraAttributes.titleColor || "",
      subtitleColor: element.extraAttributes.subtitleColor || "",
      imageBrightness: element.extraAttributes.imageBrightness || "",
    },
  });

  const [category, setCategory] = useState(element.extraAttributes.heroType);

  useEffect(() => {
    form.reset(element.extraAttributes);
  }, [element, form]);

  function applyChanges(values) {
    const {
      heroValue,
      title,
      subtitle,
      titleFont,
      subtitleFont,
      titleColor,
      subtitleColor,
      imageBrightness,
    } = values;

    dispatch({
      type: "page/setHero",
      payload: {
        ...element,
        extraAttributes: {
          ...element.extraAttributes,
          heroType: category,
          heroValue,
          title,
          subtitle,
          titleFont,
          subtitleFont,
          titleColor,
          subtitleColor,
          imageBrightness,
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
            className="flex flex-col gap-2 text-text"
            onSubmit={form.handleSubmit(applyChanges)}
          >
            <Tabs dir="rtl" defaultValue="content" className="">
              <TabsList className="mb-2">
                <TabsTrigger value="content">محتوا</TabsTrigger>
                <TabsTrigger value="design">استایل</TabsTrigger>
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

                <Divider className="mt-4 opacity-50" />

                {/* Title Color */}
                <ElementColorFormField
                  form={form}
                  fieldName="titleColor"
                  label="رنگ عنوان"
                />

                {/* Title Font */}
                <ElementFontFormField
                  form={form}
                  fieldName="titleFont"
                  label="فونت عنوان "
                />

                {/* Subtitle Color */}
                <ElementColorFormField
                  form={form}
                  fieldName="subtitleColor"
                  label="رنگ توضیحات"
                />

                {/* Subtitle Font */}
                <ElementFontFormField
                  form={form}
                  fieldName="subtitleFont"
                  label="فونت توضیحات"
                />
              </TabsContent>

              <TabsContent value="design" className="flex flex-col gap-4">
                <div className="flex">
                  <SquareButton
                    state={category}
                    action={setCategory}
                    rule="image"
                  >
                    تصویر
                  </SquareButton>
                  <SquareButton
                    state={category}
                    action={setCategory}
                    rule="color"
                  >
                    رنگ
                  </SquareButton>
                </div>
                {category === "image" && (
                  <>
                    {/* <HeroWorkspaceUploader /> */}
                    <UploadButton />
                    <UploadButtonSecondary />
                    <p className="mb-6 text-xs">
                      پس از انتخاب فایل، دکمه بارگزاری را بزنید
                    </p>
                    <PageFieldValueSlider
                      form={form}
                      max={100}
                      fieldName="imageBrightness"
                      label="میزان تیرگی تصویر"
                    />
                  </>
                )}
                {category === "color" && (
                  <>
                    <ElementColorFormField
                      form={form}
                      fieldName="heroValue"
                      label="رنگ پس زمینه"
                    />
                    <p className="text-textLight text-xs"></p>
                  </>
                )}
              </TabsContent>
            </Tabs>

            {/* Mobile drawer button */}
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
    </>
  );
}

export default PropertiesComponent;
