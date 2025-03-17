"use client";

import PageFieldValueSlider from "@/app/_components/section/workspace/page-value-slider";
import { Form } from "@/components/ui/form";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/hooks/use-toast";
import CryptoJS from "crypto-js";
import { Check } from "lucide-react";
import { Suspense, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

function PropertiesComponent({ elementInstance }) {
  const element = elementInstance;
  const dispatch = useDispatch();

  const hashPassword = (password) => {
    const hashedPassword = CryptoJS.SHA256(password).toString();
    return hashedPassword;
  };

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
            className="mt-20 flex flex-col gap-5 text-text/90"
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
