"use client";

import ElementCountdownFormField from "@/app/_components/common/form/element-properties/element-countdown-formfield";
import ElementhrefFormField from "@/app/_components/common/form/element-properties/element-href-formfield";
import ElementScheduleFormField from "@/app/_components/common/form/element-properties/element-schedule-formfield";
import { Form } from "@/components/ui/form";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { useUserSubscription } from "@/hooks/useUserSubscription";
import { Check } from "lucide-react";
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
      href: element.extraAttributes.href || "",
      schedule: element.extraAttributes.schedule || false,
      scheduleStart: element.extraAttributes.scheduleStart || "0",
      scheduleEnd: element.extraAttributes.scheduleEnd || "0",
      countdown: element.extraAttributes.countdown || false,
      countdownDate: element.extraAttributes.countdownDate || "0",
      isProtected: element.extraAttributes.isProtected || false,
      password: "",
    },
  });

  useEffect(() => {
    form.reset(element.extraAttributes);
  }, [element, form]);

  function applyChanges(values) {
    const {
      theme,
      href,
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
          href,

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
                  <TabsTrigger value="visibility">نمایش</TabsTrigger>
                </TabsList>

                <TabsContent value="content" className="flex flex-col gap-5">
                  {/* Address */}
                  <ElementhrefFormField
                    form={form}
                    message="آدرس ویدیو در آپارات را اینجا بنویسید"
                  />
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
                className="mt-auto hidden h-12 w-full cursor-pointer items-center justify-center rounded-md bg-green-500 p-2 text-white duration-200 hover:bg-green-600 sm:right-0 md:flex"
              >
                اعمال تغییرات
              </button>
            </form>
          </div>
        </Suspense>
      </Form>
    </>
  );
}

export default PropertiesComponent;
