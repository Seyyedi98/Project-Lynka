"use client";

import DeleteElementBtn from "@/app/_components/common/button/delete-element-button";
import PageFieldValueSlider from "@/app/_components/common/form/element-properties/page-slider-formfield";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Skeleton } from "@/components/ui/skeleton";
import toast from "react-hot-toast";
import { Check, TrashIcon } from "lucide-react";
import { Suspense, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

function PropertiesComponent({ elementInstance }) {
  const element = elementInstance;
  const dispatch = useDispatch();

  const form = useForm({
    // resolver: zodResolver(cardFieldSchems),
    defaultValues: {
      height: element.extraAttributes.height || "",
    },
  });

  useEffect(() => {
    form.reset(element.extraAttributes);
  }, [element, form]);

  function applyChanges(values) {
    const { height } = values;

    const payload = {
      id: element.id,
      updatedElement: {
        ...element,
        extraAttributes: {
          ...element.extraAttributes,
          height,
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
          <div className="h-full w-full">
            <form
              // onBlur={form.handleSubmit(applyChanges)}
              className="flex h-full flex-col gap-5 text-text/90"
              onSubmit={form.handleSubmit(applyChanges)}
            >
              <p className="mb-2 text-center text-text">
                بین دو بلوک فاصله ایجاد کنید
              </p>
              <PageFieldValueSlider
                form={form}
                max={250}
                fieldName="height"
                label="ارتفاع"
              />

              {/* Mobile drawaer button */}
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
                  className="mt-auto hidden h-12 w-full cursor-pointer items-center justify-center rounded-md bg-green-500 p-2 text-white duration-200 hover:bg-green-600 sm:right-0 md:flex"
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
