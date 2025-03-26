"use client";

import DeleteElementBtn from "@/app/_components/common/button/delete-element-button";
import ElementBorderRadiusFormField from "@/app/_components/common/form/element-properties/element-border-radius-formfield";
import ElementCountdownFormField from "@/app/_components/common/form/element-properties/element-countdown-formfield";
import ElementScheduleFormField from "@/app/_components/common/form/element-properties/element-schedule-formfield";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { useUserSubscription } from "@/hooks/useUserSubscription";
import { Check, TrashIcon } from "lucide-react";
import dynamic from "next/dynamic";
import { Suspense, useEffect } from "react";
import { useForm } from "react-hook-form";
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

function PropertiesComponent({ elementInstance }) {
  const element = elementInstance;
  const dispatch = useDispatch();

  const { isSilver } = useUserSubscription();

  const form = useForm({
    // resolver: zodResolver(cardFieldSchems),
    defaultValues: {
      borderRadius: element.extraAttributes.borderRadius || "",
      image: element.extraAttributes.image || "",
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
      theme,
      borderRadius,
      image,
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
          theme,
          image,
          borderRadius,
          schedule: isSilver ? schedule : element.extraAttributes.schedule,
          scheduleStart: isSilver
            ? scheduleStart
            : element.extraAttributes.scheduleStart,
          scheduleEnd: isSilver
            ? scheduleEnd
            : element.extraAttributes.scheduleEnd,
          countdown: isSilver ? countdown : element.extraAttributes.countdown,
          countdownDate: isSilver
            ? countdownDate
            : element.extraAttributes.countdownDate,
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
          <div className="h-full w-full">
            <form
              // onBlur={form.handleSubmit(applyChanges)}
              className="flex h-full flex-col gap-5 text-text/90"
              onSubmit={form.handleSubmit(applyChanges)}
            >
              <Tabs dir="rtl" defaultValue="content" className="">
                <TabsList className="mb-2">
                  <TabsTrigger value="content">محتوا</TabsTrigger>
                  <TabsTrigger value="design">طراحی</TabsTrigger>
                  <TabsTrigger value="visibility">نمایش</TabsTrigger>
                </TabsList>

                <TabsContent value="content" className="flex flex-col gap-5">
                  <ImageUploaderField
                    value={form.watch("image")}
                    onChange={(value) => form.setValue("image", value)}
                    label="پیش نمایش"
                    options={{
                      maxSizeMB: 0.4,
                      maxWidthOrHeight: 720,
                      useWebWorker: true,
                    }}
                  />
                </TabsContent>

                <TabsContent value="design" className="flex flex-col gap-4">
                  {/* Border radius */}
                  <ElementBorderRadiusFormField form={form} />
                </TabsContent>

                <TabsContent value="visibility" className="flex flex-col gap-4">
                  {/* Schedule */}
                  <div className="mt-6">
                    <ElementScheduleFormField
                      scheduleData={element.extraAttributes}
                      form={form}
                      isSilver={isSilver}
                    />
                  </div>

                  {/* Countdown */}
                  <div className="mt-6">
                    <ElementCountdownFormField
                      showToggle={true}
                      countdownData={element.extraAttributes}
                      form={form}
                      isSilver={isSilver}
                    />
                  </div>
                </TabsContent>
              </Tabs>

              {/* Mobile drawer button */}
              <button
                type="submit"
                className="absolute -top-16 right-2 flex cursor-pointer items-center justify-center rounded-full bg-green-500 p-2 duration-200 hover:bg-green-600 sm:right-0 md:hidden"
              >
                <Check className="h-4 w-4 text-white" />
              </button>

              <div className="mt-auto">
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
          </div>
        </Suspense>
      </Form>
    </>
  );
}

export default PropertiesComponent;
