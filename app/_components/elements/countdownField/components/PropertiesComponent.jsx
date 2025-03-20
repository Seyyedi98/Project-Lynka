"use client";

import { ShinyButton } from "@/app/_components/common/button/shiny-button";
import ElementBorderRadiusFormField from "@/app/_components/common/form/element-properties/element-border-radius-formfield";
import ElementCountdownFormField from "@/app/_components/common/form/element-properties/element-countdown-formfield";
import ElementTitleFormField from "@/app/_components/common/form/element-properties/element-title-formfield";
import ElementThemeSelector from "@/app/_components/theme/element-theme-selector";
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
import { toast } from "@/hooks/use-toast";
import { useUserSubscription } from "@/hooks/useUserSubscription";
import { Check, ChevronLeft } from "lucide-react";
import { Suspense, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

function PropertiesComponent({ elementInstance }) {
  const element = elementInstance;
  const dispatch = useDispatch();

  const { isSilver } = useUserSubscription();

  const form = useForm({
    // resolver: zodResolver(cardFieldSchems),
    defaultValues: {
      countdownDate: element.extraAttributes.countdownDate || "0",
      message: element.extraAttributes.message || "",
      borderRadius: element.extraAttributes.borderRadius || "",
    },
  });

  useEffect(() => {
    form.reset(element.extraAttributes);
  }, [element, form]);

  function applyChanges(values) {
    const { countdownDate, message, theme, borderRadius } = values;

    const payload = {
      id: element.id,
      updatedElement: {
        ...element,
        extraAttributes: {
          ...element.extraAttributes,
          countdownDate,
          message,
          theme,
          borderRadius,
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
            className="flex flex-col gap-5 text-text/90"
            onSubmit={form.handleSubmit(applyChanges)}
          >
            <Tabs dir="rtl" defaultValue="content" className="">
              <TabsList className="mb-2">
                <TabsTrigger value="content">محتوا</TabsTrigger>
                <TabsTrigger value="design">طراحی</TabsTrigger>
              </TabsList>

              <TabsContent value="content" className="flex flex-col gap-5">
                {/* message */}
                <div className="flex flex-col gap-3">
                  <p className="text-wrap text-xs text-text/70">
                    نمایش متن پس از پایان شمارش گر
                  </p>
                  <ElementTitleFormField
                    fieldName="message"
                    placeholder="متن خود را اینجا بنویسید"
                    form={form}
                    description="اگر نمیخواهید پس از پایان شمارشگر متنی نمایش داده شود، این فیلد را خالی بگذارید"
                  />
                </div>

                {/* Countdown */}
                <div className="mt-2 flex flex-col gap-2">
                  <p className="text-wrap text-xs text-text/70">
                    تاریخ اتمام شمارش
                  </p>
                  <ElementCountdownFormField
                    showToggle={false}
                    countdownData={element.extraAttributes}
                    form={form}
                    isSilver={isSilver}
                  />
                </div>
              </TabsContent>

              <TabsContent value="design" className="flex flex-col gap-4">
                {/* Border radius */}
                <ElementBorderRadiusFormField form={form} />{" "}
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
