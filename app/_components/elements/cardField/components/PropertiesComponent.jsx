"use client";

import Devider from "@/app/_components/common/shared/devider";
import { ElementThemeController } from "@/app/_components/controller/element-theme-controller";
import { fontsList } from "@/app/fonts/fonts";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { DesktopIcon } from "@radix-ui/react-icons";
import { Check, LoaderIcon } from "lucide-react";
import dynamic from "next/dynamic";
import { Suspense, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

const UploadButton = dynamic(
  () => import("@/app/_components/common/input/card-element-image-uploader"),
);

function PropertiesComponent({ elementInstance }) {
  const layoutOptions = [
    { id: "basic", label: "Option 1" },
    { id: "roundedImage", label: "Option 2" },
    { id: "wideFullImage", label: "Option 3" },
    { id: "highFullImage", label: "Option 3" },
  ];

  const element = elementInstance;
  const dispatch = useDispatch();

  const RenderElement =
    ElementThemeController[element.type][element.extraAttributes.theme][0];

  const form = useForm({
    // TODO: Create zod schema
    // resolver: zodResolver(),
    defaultValues: {
      title: element.extraAttributes.title || "",
      href: element.extraAttributes.href || "",
      font: element.extraAttributes.font || "",
      textColor: element.extraAttributes.textColor || "",
      bgColor: element.extraAttributes.bgColor || "",
      layout: element.extraAttributes.layout || "",
      image: "",
    },
  });

  useEffect(() => {
    form.reset(element.extraAttributes);
  }, [element, form]);

  function applyChanges(values) {
    const data = values;

    const payload = {
      id: element.id,
      updatedElement: {
        ...element,
        extraAttributes: {
          ...element.extraAttributes,
          ...data,
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
            <div className="flex h-full w-full items-center justify-center">
              <LoaderIcon />
            </div>
          }
        >
          <form
            // onBlur={form.handleSubmit(applyChanges)}
            className="flex flex-col gap-5 text-primary"
            onSubmit={form.handleSubmit(applyChanges)}
          >
            <Tabs dir="rtl" defaultValue="content" className="">
              <TabsList className="mb-2">
                <TabsTrigger value="content">محتوا</TabsTrigger>
                <TabsTrigger value="style">استایل</TabsTrigger>
              </TabsList>

              <TabsContent value="content" className="flex flex-col gap-4">
                {/* Title */}
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      {/* <FormLabel>عنوان</FormLabel> */}
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="عنوان"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.currentTarget.blur();
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Address */}
                <div className="relative flex gap-1">
                  <div className="w-full">
                    <FormField
                      control={form.control}
                      name="href"
                      render={({ field }) => (
                        <FormItem>
                          {/* <FormLabel>آدرس</FormLabel> */}

                          <div>
                            <FormControl>
                              <Input
                                dir="ltr"
                                {...field}
                                placeholder="http://url..."
                                onKeyDown={(e) => {
                                  // Prevent space key
                                  if (e.key === " ") {
                                    e.preventDefault();
                                  }
                                  // Handle Enter key
                                  if (e.key === "Enter") {
                                    e.currentTarget.blur();
                                  }
                                }}
                              />
                            </FormControl>
                          </div>
                          <FormDescription className="text-xs">
                            آدرس صفحه ای که می خواهید به آن هدایت شوید
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  {/* <div className="mb-1 flex items-end justify-end" dir="ltr">
              http://
            </div> */}
                </div>{" "}
              </TabsContent>

              <TabsContent value="style" className="flex flex-col gap-4">
                {/* Layout */}
                <FormField
                  control={form.control}
                  name="layout"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>طرح بندی</FormLabel>
                      <FormControl>
                        <div className="flex flex-col gap-4">
                          <RadioGroup
                            dir="rtl"
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="mt-2 flex items-center justify-between px-8"
                          >
                            {layoutOptions.map((option) => (
                              <FormItem
                                key={option.id}
                                className="flexitems-center space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <RadioGroupItem
                                    className="hidden"
                                    value={option.id}
                                  />
                                </FormControl>
                                <FormLabel
                                  className={`cursor-pointer font-normal text-iconLight ${
                                    field.value === option.id
                                      ? "text-muted-foreground"
                                      : ""
                                  }`}
                                >
                                  <div>
                                    <DesktopIcon className="h-7 w-7" />
                                  </div>
                                </FormLabel>
                              </FormItem>
                            ))}
                          </RadioGroup>

                          <div className="pointer-events-none mt-2 scale-90">
                            <RenderElement
                              {...element.extraAttributes}
                              layout={field.value}
                            />
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* <Suspense
                fallback={
                  <div className="flex h-full w-full items-center justify-center">
                    <LoaderIcon />
                  </div>
                }
              > */}
                <div className="mt-2">
                  <UploadButton form={form} element={element} />

                  <p className="text-xs text-textLight">
                    پس از انتخاب فایل، دکمه بارگزاری را بزنید
                  </p>
                </div>
                {/* </Suspense> */}

                <Devider className="mt-4 opacity-50" />

                {/* Font */}
                <FormField
                  control={form.control}
                  name="font"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>فونت</FormLabel>
                      <FormControl>
                        <Select
                          {...field}
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          dir="rtl"
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="فونت" />
                          </SelectTrigger>

                          <SelectContent>
                            {fontsList.map(({ fontName, fontValue }, index) => (
                              <SelectItem
                                className="hover:cursor-pointer"
                                key={`${index}-${fontName}`}
                                value={fontValue}
                              >
                                <p style={{ fontFamily: fontValue }}>
                                  {fontName}
                                </p>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Text Color */}
                <FormField
                  control={form.control}
                  name="textColor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>رنگ نوشته</FormLabel>
                      <FormControl>
                        <Input {...field} type="color" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Background Color */}
                <FormField
                  control={form.control}
                  name="bgColor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>رنگ بلوک</FormLabel>
                      <FormControl>
                        <Input {...field} type="color" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
