"use client";

import { submitForm } from "@/actions/form/page-formfield";
import { cn } from "@/lib/utils";
import { loadFont } from "@/utils/loadFont";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const toPersianNumbers = (num) => {
  const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
  return num.toString().replace(/\d/g, (d) => persianDigits[d]);
};

const FormFieldWindows95 = (props) => {
  const {
    isPremium,
    fields = [],
    uri,
    title,
    elementId,
    successMessage,
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

  const formId = `${uri}-${title}-${elementId}`;

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
      <div className="win95-window w-full p-4">
        <div className="win95-dialog p-4">
          <h3 className="win95-title mb-2 text-lg font-medium">
            با تشکر از شما!
          </h3>
          <p className="win95-text">
            {successMessage || "فرم شما با موفقیت ثبت شد."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full">
      {!isPremium && (
        <div className="win95-error-box absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform p-4 text-center">
          برای استفاده از این بلوک، اشتراک ویژه خود را تمدید کنید
        </div>
      )}
      <form
        ref={formRef}
        onSubmit={handleSubmit(onSubmit)}
        className={cn(
          `win95-window w-full text-wrap p-1`,
          !isPremium && "opacity-70",
        )}
      >
        <div className="win95-title-bar p-2">
          <div className="win95-title-text text-center text-lg">{title}</div>
        </div>
        <div className="win95-client-area p-4">
          {fields.length === 0 && (
            <div className="win95-placeholder grid h-40 w-full place-content-center">
              افزودن فرم
            </div>
          )}

          {fields.map((field, index) => {
            const fieldLabel = field?.label || `field_${index}`;
            const fieldName = fieldLabel;
            const placeholder = field?.placeholder || "";
            const isRequired = Boolean(field?.required);

            const fieldProps = register(fieldName, {
              required: isRequired ? "این فیلد الزامی است" : false,
            });

            if (field?.type === "text") {
              return (
                <div key={fieldName} className="win95-field-group mb-4">
                  <label className="win95-label mb-1 block text-sm">
                    {fieldLabel}
                  </label>
                  <input
                    {...fieldProps}
                    max={200}
                    placeholder={placeholder}
                    className="win95-input w-full px-2 py-1"
                  />
                  {formState.errors[fieldName] && (
                    <p className="win95-error mt-1 text-sm">
                      {formState.errors[fieldName].message}
                    </p>
                  )}
                </div>
              );
            }

            if (field?.type === "number") {
              return (
                <div key={fieldName} className="win95-field-group mb-4">
                  <label className="win95-label mb-1 block text-sm">
                    {fieldLabel}
                  </label>
                  <input
                    {...fieldProps}
                    type="number"
                    placeholder={placeholder}
                    className="win95-input w-full px-2 py-1"
                  />
                  {formState.errors[fieldName] && (
                    <p className="win95-error mt-1 text-sm">
                      {formState.errors[fieldName].message}
                    </p>
                  )}
                </div>
              );
            }

            if (field?.type === "textarea") {
              return (
                <div key={fieldName} className="win95-field-group mb-4">
                  <label className="win95-label mb-1 block text-sm">
                    {fieldLabel}
                  </label>
                  <textarea
                    {...fieldProps}
                    max={999}
                    placeholder={placeholder}
                    className="win95-textarea w-full px-2 py-1"
                    rows={4}
                  />
                  {formState.errors[fieldName] && (
                    <p className="win95-error mt-1 text-sm">
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
              <div className="win95-field-group mb-4">
                <label className="win95-label mb-1 block text-sm">
                  {`${mathQuestion.persianA} + ${mathQuestion.persianB} = ؟`}
                </label>
                <input
                  {...register("mathAnswer", {
                    required: "لطفاً پاسخ را وارد کنید",
                    validate: (value) => {
                      if (isNaN(value))
                        return "لطفا اعداد را به صورت انگلیسی وارد کنید";
                      return true;
                    },
                  })}
                  className="win95-input w-full px-2 py-1"
                />
                {formState.errors.mathAnswer && (
                  <p className="win95-error mt-1 text-sm">
                    {formState.errors.mathAnswer.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={formState.isSubmitting}
                className="win95-button mt-4 w-full py-2"
              >
                {formState.isSubmitting ? "در حال ارسال..." : "ارسال فرم"}
              </button>
            </>
          )}
        </div>
      </form>

      <style jsx>{`
        .win95-window {
          background: #c0c0c0;
          border: 2px solid;
          border-color: #dfdfdf #808080 #808080 #dfdfdf;
          box-shadow: 1px 1px 0px 0px #000000;
        }

        .win95-title-bar {
          background: linear-gradient(90deg, #000080, #1084d0);
          color: white;
          font-weight: bold;
        }

        .win95-client-area {
          background: #c0c0c0;
        }

        .win95-input,
        .win95-textarea {
          background: white;
          border: 2px solid;
          border-color: #808080 #dfdfdf #dfdfdf #808080;
          outline: none;
        }

        .win95-input:focus,
        .win95-textarea:focus {
          border-color: #000080;
        }

        .win95-button {
          background: #c0c0c0;
          border: 2px solid;
          border-color: #dfdfdf #808080 #808080 #dfdfdf;
          font-weight: bold;
          position: relative;
        }

        .win95-button:active {
          border-color: #808080 #dfdfdf #dfdfdf #808080;
        }

        .win95-button:disabled {
          color: #808080;
        }

        .win95-error-box {
          background: #c0c0c0;
          border: 2px solid;
          border-color: #808080 #dfdfdf #dfdfdf #808080;
          padding: 8px;
          color: #000;
          font-weight: bold;
        }

        .win95-placeholder {
          background: #c0c0c0;
          border: 2px dashed #808080;
          color: #808080;
        }

        .win95-error {
          color: #c00;
        }

        .win95-dialog {
          background: #c0c0c0;
          border: 2px solid;
          border-color: #dfdfdf #808080 #808080 #dfdfdf;
        }
      `}</style>
    </div>
  );
};

export default FormFieldWindows95;
