"use client";

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
import { toast } from "@/hooks/use-toast";
import { Check } from "lucide-react";
import { Suspense, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import Devider from "@/app/_components/common/shared/devider";
import HeroWorkspaceUploader from "@/app/_components/common/input/workspace-hero-uploader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

              {/* Subtitle */}
              <FormField
                control={form.control}
                name="subtitle"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel>عنوان</FormLabel> */}
                    <FormControl>
                      <Input
                        className="rounded-full"
                        {...field}
                        placeholder="توضیحات"
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
            </TabsContent>

            <TabsContent value="style" className="flex flex-col gap-4">
              {/* Title Color */}
              <FormField
                control={form.control}
                name="titleColor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>رنگ</FormLabel>
                    <FormControl>
                      <Input {...field} type="color" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Title Font */}
              <FormField
                control={form.control}
                name="titleFont"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>فونت عنوان اصلی</FormLabel>
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
                          <Suspense fallback={<p>در حال بارگزاری...</p>}>
                            {fontsList.map(({ fontName, fontValue }, index) => (
                              <SelectItem
                                className="hover:cursor-pointer"
                                key={`${index}-${fontName}`}
                                value={fontValue}
                              >
                                <p style={{ fontFamily: fontValue }}>
                                  {fontName} - {element.extraAttributes.title}
                                </p>
                              </SelectItem>
                            ))}
                          </Suspense>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Subtitle Color */}
              <FormField
                control={form.control}
                name="subtitleColor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>رنگ</FormLabel>
                    <FormControl>
                      <Input {...field} type="color" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Subtitle Font */}
              <FormField
                control={form.control}
                name="subtitleFont"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>فونت عنوان دوم</FormLabel>
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
                          <Suspense fallback={<p>در حال بارگزاری...</p>}>
                            {fontsList.map(({ fontName, fontValue }, index) => (
                              <SelectItem
                                className="hover:cursor-pointer"
                                key={`${index}-${fontName}`}
                                value={fontValue}
                              >
                                <p style={{ fontFamily: fontValue }}>
                                  {fontName} -{" "}
                                  {element.extraAttributes.subtitle}
                                </p>
                              </SelectItem>
                            ))}
                          </Suspense>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </TabsContent>
          </Tabs>

          <div className="mt-2">
            <HeroWorkspaceUploader />
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
      </Form>
    </>
  );
}

export default PropertiesComponent;
