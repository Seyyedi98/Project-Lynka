"use client";

import DeleteElementBtn from "@/app/_components/common/button/PrimaryButton/delete-element-button";
import { ShinyButton } from "@/app/_components/common/button/PrimaryButton/shiny-button";
import SquareButton from "@/app/_components/common/button/PrimaryButton/square-button";
import ElementColorFormField from "@/app/_components/common/form/element-properties/element-color-formfield";
import ElementFontFormField from "@/app/_components/common/form/element-properties/element-font-formfield";
import ElementTitleFormField from "@/app/_components/common/form/element-properties/element-title-formfield";
import PageFieldValueSlider from "@/app/_components/common/form/element-properties/page-slider-formfield";
import Divider from "@/app/_components/common/shared/devider";
import HeroThemeSelector from "@/app/_components/elements_theme/hero-theme-selector";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, TrashIcon } from "lucide-react";
import dynamic from "next/dynamic";
import { Suspense, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

const ImageUploaderField = dynamic(
  () =>
    import("@/app/_components/common/input/image-uploader").then(
      (mod) => mod.ImageUploaderField,
    ),
  {
    ssr: false,
    loading: () => <Skeleton className="h-32 w-full rounded-md"></Skeleton>,
  },
);

function PropertiesComponent({ elementInstance, isSilver }) {
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
      primaryImage: element.extraAttributes.primaryImage || "",
      secondaryImage: element.extraAttributes.secondaryImage || "",
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
      primaryImage,
      secondaryImage,
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
          primaryImage,
          secondaryImage,
        },
      },
    });

    toast.success("تغییرات با موفقیت اعمال شد");

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
          <div className="h-full w-full">
            <form
              // onBlur={form.handleSubmit(applyChanges)}
              className="flex h-full flex-col gap-2 text-text"
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
                      <ImageUploaderField
                        value={form.watch("primaryImage")}
                        onChange={(value) =>
                          form.setValue("primaryImage", value)
                        }
                        label="پیش نمایش"
                        options={{
                          maxSizeMB: 0.4,
                          maxWidthOrHeight: 720,
                          useWebWorker: true,
                        }}
                      />

                      <ImageUploaderField
                        value={form.watch("secondaryImage")}
                        onChange={(value) =>
                          form.setValue("secondaryImage", value)
                        }
                        label="پیش نمایش"
                        options={{
                          maxSizeMB: 0.4,
                          maxWidthOrHeight: 720,
                          useWebWorker: true,
                        }}
                      />
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
                    <HeroThemeSelector />
                  </DialogContent>
                </Dialog>

                {/* Desktop sidebar button */}
                <button
                  type="submit"
                  className="mt-4 hidden h-12 w-full cursor-pointer items-center justify-center rounded-md bg-green-500 p-2 text-white duration-200 hover:bg-green-600 sm:right-0 md:flex"
                >
                  اعمال تغییرات
                </button>

                <div>
                  {element?.type !== "HeroElement" && (
                    <DeleteElementBtn id={element?.id}>
                      <Button
                        asChild
                        variant="destructive"
                        className="mt-2 hidden h-12 w-full cursor-pointer items-center justify-center p-2 duration-200 md:flex"
                      >
                        <span>
                          حذف بلوک
                          <TrashIcon className="h-4 w-4 text-white" />
                        </span>
                      </Button>
                    </DeleteElementBtn>
                  )}

                  {element?.type !== "HeroElement" && (
                    <DeleteElementBtn id={element?.id}>
                      <button
                        variant="destructive"
                        className="absolute -top-16 left-2 flex cursor-pointer items-center justify-center rounded-full bg-destructive p-2 duration-200 hover:bg-green-600 md:right-0 md:hidden"
                      >
                        <TrashIcon className="h-4 w-4 text-white" />
                      </button>
                    </DeleteElementBtn>
                  )}
                </div>
              </div>
            </form>
          </div>
        </Suspense>
      </Form>
    </>
  );
}

export default PropertiesComponent;
