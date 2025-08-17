"use client";

import DeleteElementBtn from "@/app/_components/common/button/PrimaryButton/delete-element-button";
import { ShinyButton } from "@/app/_components/common/button/PrimaryButton/shiny-button";
import ElementBorderRadiusFormField from "@/app/_components/common/form/element-properties/element-border-radius-formfield";
import ElementColorFormField from "@/app/_components/common/form/element-properties/element-color-formfield";
import ElementCountdownFormField from "@/app/_components/common/form/element-properties/element-countdown-formfield";
import ElementFontFormField from "@/app/_components/common/form/element-properties/element-font-formfield";
import ElementAddGalleyImageFormField from "@/app/_components/common/form/element-properties/element-gallery-image-formfield";
import ElementhrefFormField from "@/app/_components/common/form/element-properties/element-href-formfield";
import ElementScheduleFormField from "@/app/_components/common/form/element-properties/element-schedule-formfield";
import ElementTitleFormField from "@/app/_components/common/form/element-properties/element-title-formfield";
import Divider from "@/app/_components/common/shared/devider";
import ElementThemeSelector from "@/app/_components/elements_theme/element-theme-selector";
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
import { Check, ChevronLeft, TrashIcon } from "lucide-react";
import { Suspense, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

function PropertiesComponent({ elementInstance, isPremium }) {
  const element = elementInstance;
  const dispatch = useDispatch();

  const form = useForm({
    // resolver: zodResolver(cardFieldSchems),
    defaultValues: {
      // Title
      title: element.extraAttributes.title || "",
      titleFont: element.extraAttributes.titleFont || "",
      titleColor: element.extraAttributes.titleColor || "",
      // Description
      description: element.extraAttributes.description || "",
      descriptionFont: element.extraAttributes.descriptionFont || "",
      descriptionColor: element.extraAttributes.descriptionColor || "",
      // Price
      price: element.extraAttributes.price || "",
      priceFont: element.extraAttributes.priceFont || "",
      priceColor: element.extraAttributes.priceColor || "",
      // Discount
      discount: element.extraAttributes.discount || "",
      discountFont: element.extraAttributes.discountFont || "",
      discountColor: element.extraAttributes.discountColor || "",

      href: element.extraAttributes.href || "",
      borderRadius: element.extraAttributes.borderRadius || "",
      bgColor: element.extraAttributes.bgColor || "",
      images: element.extraAttributes.questions || [],
      schedule: element.extraAttributes.schedule || false,
      scheduleStart: element.extraAttributes.scheduleStart || "0",
      scheduleEnd: element.extraAttributes.scheduleEnd || "0",
      countdown: element.extraAttributes.countdown || false,
      countdownDate: element.extraAttributes.countdownDate || "0",
    },
  });

  useEffect(() => {
    form.reset(element.extraAttributes);
  }, [element, form]);

  function applyChanges(values) {
    const {
      title,
      titleFont,
      titleColor,
      description,
      descriptionFont,
      descriptionColor,
      price,
      priceFont,
      priceColor,
      discount,
      discountFont,
      discountColor,
      theme,
      href,
      bgColor,
      borderRadius,
      images,
      font,
      schedule,
      scheduleStart,
      scheduleEnd,
      countdown,
      countdownDate,
    } = values;

    const payload = {
      id: element.id,
      updatedElement: {
        ...element,
        extraAttributes: {
          ...element.extraAttributes,
          title,
          titleFont,
          titleColor,
          description,
          descriptionFont,
          descriptionColor,
          price,
          priceFont,
          priceColor,
          discount,
          discountFont,
          discountColor,
          theme,
          href,
          images,
          font,
          bgColor,
          borderRadius,
          schedule: isPremium ? schedule : element.extraAttributes.schedule,
          scheduleStart: isPremium
            ? scheduleStart
            : element.extraAttributes.scheduleStart,
          scheduleEnd: isPremium
            ? scheduleEnd
            : element.extraAttributes.scheduleEnd,
          countdown: isPremium ? countdown : element.extraAttributes.countdown,
          countdownDate: isPremium
            ? countdownDate
            : element.extraAttributes.countdownDate,
        },
      },
    };

    toast.success("تغییرات با موفقیت اعمال شد");

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
            className="flex flex-col gap-5 text-text/90"
            onSubmit={form.handleSubmit(applyChanges)}
          >
            <Tabs dir="rtl" defaultValue="content" className="">
              <TabsList className="mb-2">
                <TabsTrigger value="content">محتوا</TabsTrigger>
                <TabsTrigger value="design">طراحی</TabsTrigger>
                <TabsTrigger value="visibility">نمایش</TabsTrigger>
              </TabsList>

              <TabsContent value="content" className="flex flex-col gap-5">
                {/* Product Title */}
                <ElementTitleFormField
                  fieldName="title"
                  placeholder="نام محصول"
                  description="نام محصول را اینجا وارد کنید"
                  form={form}
                />

                {/* Product Description */}
                <ElementTitleFormField
                  fieldName="description"
                  placeholder="توضیحات محصول"
                  description="توضیحات محصول را اینجا وارد کنید"
                  form={form}
                />

                {/* Product Price */}
                <ElementTitleFormField
                  fieldName="price"
                  placeholder="قیمت محصول"
                  description="قیمت محصول را اینجا وارد کنید"
                  form={form}
                />

                {/* Product Discount */}
                <ElementTitleFormField
                  fieldName="discount"
                  placeholder="قیمت نهایی"
                  description="قیمت محصول را  بعد از تخفیف اینجا وارد کنید"
                  form={form}
                />

                {/* Address */}
                <ElementhrefFormField form={form} message="لینک محصول" />

                <Divider className="mt-4 opacity-50" />

                {/* Images */}
                <ElementAddGalleyImageFormField
                  fieldName="images"
                  form={form}
                />

                <Divider className="mt-4 opacity-50" />

                {/* Title Font and Text Colot */}
                <ElementFontFormField
                  fieldName="titleFont"
                  label="فونت عنوان"
                  form={form}
                />
                <ElementColorFormField
                  form={form}
                  label="رنگ عنوان"
                  fieldName="titleColor"
                />

                {/* Description Font and Text Colot */}
                <ElementFontFormField
                  fieldName="descriptionFont"
                  label="فونت توضیحات"
                  form={form}
                />
                <ElementColorFormField
                  form={form}
                  label="رنگ توضیحات"
                  fieldName="descriptionColor"
                />

                {/* Price Font and Text Colot */}
                <ElementFontFormField
                  fieldName="priceFont"
                  label="فونت قیمت"
                  form={form}
                />
                <ElementColorFormField
                  form={form}
                  label="رنگ قیمت"
                  fieldName="priceColor"
                />

                {/* Discount Font and Text Colot */}
                <ElementFontFormField
                  fieldName="discountFont"
                  label="فونت تخفیف"
                  form={form}
                />
                <ElementColorFormField
                  form={form}
                  label="رنگ تخفیف"
                  fieldName="discountColor"
                />
              </TabsContent>

              <TabsContent value="design" className="flex flex-col gap-4">
                {/* Border radius */}
                <ElementBorderRadiusFormField form={form} />

                {/* Background Color */}
                <ElementColorFormField
                  form={form}
                  label="رنگ پس زمینه"
                  fieldName="bgColor"
                />
              </TabsContent>

              <TabsContent value="visibility" className="flex flex-col gap-4">
                {/* Schedule */}
                <div className="mt-6">
                  <ElementScheduleFormField
                    scheduleData={element.extraAttributes}
                    form={form}
                    isPremium={isPremium}
                  />
                </div>

                {/* Countdown */}
                <div className="mt-6">
                  <ElementCountdownFormField
                    showToggle={true}
                    countdownData={element.extraAttributes}
                    form={form}
                    isPremium={isPremium}
                  />
                </div>
              </TabsContent>
            </Tabs>

            {/* Mobile drawaer button */}
            <button
              type="submit"
              className="absolute -top-16 right-2 flex cursor-pointer items-center justify-center rounded-full bg-green-500 p-2 duration-200 hover:bg-green-600 sm:right-0 md:hidden"
            >
              <Check className="h-4 w-4 text-white" />
            </button>

            <div className="mt-auto">
              {/* <Dialog>
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
              </Dialog> */}

              {/* Desktop sidebar button */}
              <button
                type="submit"
                className="mt-4 hidden h-12 w-full cursor-pointer items-center justify-center rounded-md bg-green-500 p-2 text-white duration-200 hover:bg-green-600 sm:right-0 md:flex"
              >
                اعمال تغییرات
              </button>

              {/* Delete element buttons */}
              <div>
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

                <DeleteElementBtn id={element?.id}>
                  <button
                    variant="destructive"
                    className="absolute -top-16 left-2 flex cursor-pointer items-center justify-center rounded-full bg-destructive p-2 duration-200 hover:bg-green-600 md:right-0 md:hidden"
                  >
                    <TrashIcon className="h-4 w-4 text-white" />
                  </button>
                </DeleteElementBtn>
              </div>
            </div>
          </form>
        </Suspense>
      </Form>
    </>
  );
}

export default PropertiesComponent;
