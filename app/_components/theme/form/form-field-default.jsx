"use client";

import { submitForm } from "@/actions/form/page-formfield";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { loadFont } from "@/utils/loadFont";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
} from "react-google-recaptcha-v3";

const FormWithCaptcha = (props) => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const {
    isSilver,
    fields = [],
    uri,
    elementId,
    successMessage,
    textColor,
    bgColor,
    fieldBorderRadius,
    cardBorderRadius,
    font,
    isLive,
  } = props;
  const { register, handleSubmit, formState, reset } = useForm();
  const [loadedFont, setLoadedFont] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    const fetchFont = async () => {
      try {
        const fontVariable = await loadFont(font);
        setLoadedFont(fontVariable);
      } catch (error) {
        console.error("Error loading font:", error);
      }
    };

    fetchFont();
  }, [font]);

  const formId = `${uri}-${elementId}`;

  const onSubmit = async (formData) => {
    if (!isSilver) return;
    if (!executeRecaptcha) {
      toast({
        description: "در حال بارگذاری reCAPTCHA... لطفا دوباره تلاش کنید",
        variant: "destructive",
      });
      return;
    }

    setIsVerifying(true);
    try {
      const token = await executeRecaptcha("form_submit");

      const result = await submitForm({
        uri,
        formId,
        formData: {
          ...formData,
          recaptchaToken: token,
        },
      });

      if (result.success) {
        toast({
          description: "فرم با موفقیت ثبت شد",
        });
        setIsSubmitted(true);
        reset();
      } else {
        toast({
          description: result.error || "خطا در ارسال فرم",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        description: "خطا در تایید reCAPTCHA",
        variant: "destructive",
      });
    } finally {
      setIsVerifying(false);
    }
  };

  if (isSubmitted) {
    return (
      <div
        style={{
          borderRadius: cardBorderRadius,
          backgroundColor: bgColor,
          color: textColor,
          fontFamily: loadedFont ? `var(${loadedFont})` : "inherit",
        }}
        className="w-full rounded-md bg-green-50 p-6 text-center"
      >
        <h3 className="text-lg font-medium text-green-800">با تشکر از شما!</h3>
        <p className="mt-2 text-green-700">
          {successMessage || "فرم شما با موفقیت ثبت شد."}
        </p>
      </div>
    );
  }

  return (
    <div className="relative w-full">
      {!isSilver && (
        <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform rounded-md bg-red-500 p-2 text-center text-white">
          برای استفاده از این بلوک، اشتراک ویژه خود را تمدید کنید
        </div>
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={cn(
          `w-full text-wrap rounded-md py-2`,
          !isSilver && "opacity-70",
        )}
      >
        <div
          style={{
            borderRadius: cardBorderRadius,
            backgroundColor: bgColor,
            color: textColor,
            fontFamily: loadedFont ? `var(${loadedFont})` : "inherit",
          }}
          className="h-full w-full p-4"
        >
          {fields.map((field, index) => {
            const fieldLabel = field?.label || `field_${index}`;
            const fieldName = `field_${index}_${String(fieldLabel).replace(/\s+/g, "_")}`;
            const placeholder = field?.placeholder || "";
            const isRequired = Boolean(field?.required);

            const fieldProps = register(fieldName, {
              required: isRequired ? "این فیلد الزامی است" : false,
            });

            if (field?.type === "text") {
              return (
                <div key={fieldName} className="mb-4">
                  <label
                    style={{
                      color: textColor,
                      fontFamily: loadedFont ? `var(${loadedFont})` : "inherit",
                    }}
                    className="mb-2 mr-1 block text-sm font-medium"
                  >
                    {fieldLabel}
                  </label>
                  <input
                    style={{
                      borderRadius: fieldBorderRadius,
                      fontFamily: loadedFont ? `var(${loadedFont})` : "inherit",
                    }}
                    {...fieldProps}
                    placeholder={placeholder}
                    className="h-10 w-full rounded-md border border-white bg-transparent px-2"
                  />
                  {formState.errors[fieldName] && (
                    <p className="mt-1 text-sm text-red-500">
                      {formState.errors[fieldName].message}
                    </p>
                  )}
                </div>
              );
            }

            if (field?.type === "number") {
              return (
                <div key={fieldName} className="mb-4">
                  <label
                    style={{
                      color: textColor,
                      fontFamily: loadedFont ? `var(${loadedFont})` : "inherit",
                    }}
                    className="mb-2 mr-1 block text-sm font-medium"
                  >
                    {fieldLabel}
                  </label>
                  <input
                    style={{
                      borderRadius: fieldBorderRadius,
                      fontFamily: loadedFont ? `var(${loadedFont})` : "inherit",
                    }}
                    {...fieldProps}
                    type="number"
                    placeholder={placeholder}
                    className="h-10 w-full rounded-md border border-white bg-transparent px-2"
                  />
                  {formState.errors[fieldName] && (
                    <p className="mt-1 text-sm text-red-500">
                      {formState.errors[fieldName].message}
                    </p>
                  )}
                </div>
              );
            }

            if (field?.type === "textarea") {
              return (
                <div key={fieldName} className="mb-4">
                  <label
                    style={{
                      color: textColor,
                      fontFamily: loadedFont ? `var(${loadedFont})` : "inherit",
                    }}
                    className="mb-2 mr-1 block text-sm font-medium"
                  >
                    {fieldLabel}
                  </label>
                  <Textarea
                    style={{
                      borderRadius: fieldBorderRadius,
                      fontFamily: loadedFont ? `var(${loadedFont})` : "inherit",
                    }}
                    {...fieldProps}
                    placeholder={placeholder}
                    className="w-full rounded-md border border-white bg-transparent px-2"
                  />
                  {formState.errors[fieldName] && (
                    <p className="mt-1 text-sm text-red-500">
                      {formState.errors[fieldName].message}
                    </p>
                  )}
                </div>
              );
            }

            return null;
          })}
          {isSilver && isLive && (
            <Button
              style={{
                fontFamily: loadedFont ? `var(${loadedFont})` : "inherit",
              }}
              type="submit"
              variant="default"
              disabled={formState.isSubmitting || isVerifying}
              className="mt-4 w-full border-none"
            >
              {formState.isSubmitting || isVerifying
                ? "در حال ارسال..."
                : "ارسال فرم"}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

const FormFieldDefault = (props) => {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
      scriptProps={{
        async: false,
        defer: false,
        appendTo: "head",
        nonce: undefined,
      }}
    >
      <FormWithCaptcha {...props} />
    </GoogleReCaptchaProvider>
  );
};

export default FormFieldDefault;
