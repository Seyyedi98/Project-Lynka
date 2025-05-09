"use client";

import { submitForm } from "@/actions/form/page-formfield";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import { loadFont } from "@/utils/loadFont";
import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";

const toPersianNumbers = (num) => {
  const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
  return num.toString().replace(/\d/g, (d) => persianDigits[d]);
};

const FormFieldDefault = (props) => {
  const {
    isPremium,
    fields = [],
    uri,
    title,
    elementId,
    successMessage,
    textColor,
    bgColor,
    borderColor,
    fieldBorderRadius,
    cardBorderRadius,
    font,
    isLive,
  } = props;

  const { register, handleSubmit, formState, watch, setValue } = useForm();
  const [loadedFont, setLoadedFont] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [mathQuestion, setMathQuestion] = useState({ a: 0, b: 0, answer: 0 });
  const [formStartTime] = useState(Date.now());
  const formRef = useRef(null);

  // Generate math question
  const generateMathQuestion = () => {
    const a = Math.floor(Math.random() * 9) + 1;
    const b = Math.floor(Math.random() * 9) + 1;
    setMathQuestion({
      a,
      b,
      answer: a + b,
      persianA: toPersianNumbers(a),
      persianB: toPersianNumbers(b),
    });
    setValue("mathAnswer", "");
  };

  useEffect(() => {
    generateMathQuestion();
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
    if (!isPremium) return;

    // Time-based human verification (minimum 3 seconds)
    const submitTime = Date.now() - formStartTime;
    if (submitTime < 3000) {
      toast.success("لطفاً زمان بیشتری را برای پر کردن فرم صرف کنید");

      return;
    }

    // Math question verification
    if (parseInt(formData.mathAnswer) !== mathQuestion.answer) {
      toast.error("پاسخ شما نادرست است. لطفاً دوباره تلاش کنید");
      generateMathQuestion();
      return;
    }

    try {
      const { mathAnswer, ...submissionData } = formData;
      const result = await submitForm({
        uri,
        title,
        formId,
        formData: submissionData,
      });

      if (result.success) {
        toast.success("فرم با موفقیت ثبت شد");
        setIsSubmitted(true);
      } else {
        toast.error(result.error || "خطا در ارسال فرم");
      }
    } catch (error) {
      toast.error("خطا در ارسال فرم");
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
        className="w-full rounded-md p-6 text-center"
      >
        <h3 className="text-lg font-medium">با تشکر از شما!</h3>
        <p className="mt-2">{successMessage || "فرم شما با موفقیت ثبت شد."}</p>
      </div>
    );
  }

  return (
    <div className="relative w-full">
      {!isPremium && (
        <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform rounded-md bg-red-500 p-2 text-center text-white">
          برای استفاده از این بلوک، اشتراک ویژه خود را تمدید کنید
        </div>
      )}
      <form
        ref={formRef}
        onSubmit={handleSubmit(onSubmit)}
        className={cn(
          `w-full text-wrap rounded-md py-2`,
          !isPremium && "opacity-70",
        )}
      >
        <div style={{ color: textColor }} className="mb-2 text-center text-lg">
          {title}
        </div>
        <div
          style={{
            borderRadius: cardBorderRadius,
            backgroundColor: bgColor,
            color: textColor,
            fontFamily: loadedFont ? `var(${loadedFont})` : "inherit",
          }}
          className="h-full w-full p-4"
        >
          {fields.length === 0 && (
            <div className="grid h-40 w-full place-content-center rounded-lg border-2 border-dashed border-black text-black">
              افزودن فرم
            </div>
          )}
          {/* Your original form fields - completely preserved */}
          {fields.map((field, index) => {
            const fieldLabel = field?.label || `field_${index}`;
            // const fieldName = `field_${index}_${String(fieldLabel).replace(/\s+/g, "_")}`;
            const fieldName = fieldLabel;
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
                      borderColor: borderColor,
                    }}
                    {...fieldProps}
                    max={200}
                    placeholder={placeholder}
                    className="h-10 w-full rounded-md border bg-transparent px-2"
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
                      borderColor: borderColor,
                    }}
                    {...fieldProps}
                    type="number"
                    placeholder={placeholder}
                    className="h-10 w-full rounded-md border bg-transparent px-2"
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
                      borderColor: borderColor,
                    }}
                    {...fieldProps}
                    max={999}
                    placeholder={placeholder}
                    className="w-full rounded-md border bg-transparent px-2"
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

          {/* Math verification section */}
          {isPremium && isLive && (
            <>
              <div className="mb-4">
                <label className="mb-2 block text-sm font-medium">
                  {`${mathQuestion.persianA} + ${mathQuestion.persianB} = ؟`}
                </label>
                <input
                  style={{ borderColor: borderColor }}
                  {...register("mathAnswer", {
                    required: "لطفاً پاسخ را وارد کنید",
                    validate: (value) => {
                      if (isNaN(value))
                        return "لطفا اعداد را به صورت انگلیسی وارد کنید";
                      return true;
                    },
                  })}
                  className="h-10 w-full rounded-md border bg-transparent px-2"
                />
                {formState.errors.mathAnswer && (
                  <p className="mt-1 text-sm text-red-500">
                    {formState.errors.mathAnswer.message}
                  </p>
                )}
              </div>

              <Button
                style={{
                  fontFamily: loadedFont ? `var(${loadedFont})` : "inherit",
                }}
                type="submit"
                variant="default"
                disabled={formState.isSubmitting}
                className="mt-4 w-full border-none"
              >
                {formState.isSubmitting ? "در حال ارسال..." : "ارسال فرم"}
              </Button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default FormFieldDefault;
