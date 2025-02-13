"use client";

import Devider from "@/app/_components/common/shared/devider";
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
import { toast } from "@/hooks/use-toast";
import { DesktopIcon } from "@radix-ui/react-icons";
import { Check } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

function PropertiesComponent({ elementInstance }) {
  const layoutOptions = [
    { id: "basic", label: "Option 1" },
    { id: "icon", label: "Option 2" },
    { id: "imageSm", label: "Option 3" },
    { id: "imageBg", label: "Option 3" },
  ];

  const element = elementInstance;
  const dispatch = useDispatch();

  const form = useForm({
    // TODO: Create zod schema
    // resolver: zodResolver(),
    defaultValues: {
      title: element.extraAttributes.title || "",
      href: element.extraAttributes.href || "",
      font: element.extraAttributes.font || "",
      textColor: element.extraAttributes.textColor || "",
      bgColor: element.extraAttributes.bgColor || "",
    },
  });

  useEffect(() => {
    form.reset(element.extraAttributes);
  }, [element, form]);

  function applyChanges(values) {
    const { title, href, font, textColor, bgColor } = values;

    const payload = {
      id: element.id,
      updatedElement: {
        ...element,
        extraAttributes: {
          ...element.extraAttributes,
          title,
          href,
          font,
          textColor,
          bgColor,
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
        <form
          // onBlur={form.handleSubmit(applyChanges)}
          className="flex flex-col gap-5 text-primary"
          onSubmit={form.handleSubmit(applyChanges)}
        >
          <h5 className="text-center text-xl text-primary">محتوا</h5>

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
          </div>

          <Devider className="mt-4 opacity-50" />
          <h5 className="my-1 text-center text-xl text-primary">استایل</h5>

          {/* Layout */}
          <FormField
            control={form.control}
            name="layout"
            render={({ field }) => (
              <FormItem>
                <FormLabel>طرح بندی</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex items-center justify-between px-8"
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
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
                          <p style={{ fontFamily: fontValue }}>{fontName}</p>
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
      </Form>
    </>
  );
}

export default PropertiesComponent;
