"use client";

import { cn } from "@/lib/utils";
import { loadFont } from "@/utils/loadFont";
import {
  QuestionMarkCircledIcon,
  ChevronDownIcon,
} from "@radix-ui/react-icons";
import { useEffect, useState } from "react";

const FaqFieldDefault = (props) => {
  const {
    title,
    isPremium,
    isLive,
    textColor = "#1f2937",
    bgColor = "#ffffff",
    borderRadius = "0.75rem",
    font,
    questions = [],
  } = props;
  const [textFont, setTextFont] = useState(null);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    const fetchFont = async () => {
      if (!font) return;

      try {
        const textFontVariable = await loadFont(font);
        setTextFont(textFontVariable);
      } catch (error) {
        console.error("Error loading font:", error);
      }
    };

    fetchFont();
  }, [font]);

  const toggleAccordion = (index) => {
    if (!isLive) return;
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="relative w-full">
      {!isPremium && (
        <div
          className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 transform p-4 text-center text-white shadow-lg"
          style={{
            backgroundColor: bgColor,
            borderRadius: borderRadius,
            border: "2px solid #dc2626",
          }}
        >
          <div
            className="px-4 py-3 backdrop-blur-sm"
            style={{
              backgroundColor: "rgba(220, 38, 38, 0.1)",
              borderRadius: `calc(${borderRadius} - 4px)`,
            }}
          >
            <p className="text-sm font-medium" style={{ color: textColor }}>
              برای استفاده از این بلوک، اشتراک ویژه خود را تمدید کنید
            </p>
          </div>
        </div>
      )}

      <div
        className={cn(
          `w-full text-wrap px-3 py-4 sm:px-4`,
          !isPremium && "opacity-70",
        )}
        style={{
          backgroundColor: bgColor,
          borderRadius: borderRadius,
          border: "1px solid #e5e7eb",
        }}
      >
        {/* Title Section */}
        <div className="mb-6 text-center">
          <div
            className="inline-block px-4 py-2"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.05)",
              borderRadius: borderRadius,
            }}
          >
            <p
              style={{
                fontFamily: textFont ? `var(${textFont})` : "inherit",
                color: textColor,
              }}
              className="text-lg font-bold sm:text-xl"
            >
              {title}
            </p>
          </div>
        </div>

        {/* FAQ Questions */}
        {questions.length > 0 ? (
          <div
            className="space-y-3"
            style={{
              fontFamily: textFont ? `var(${textFont})` : "inherit",
              color: textColor,
            }}
          >
            {questions.map((question, index) => (
              <div
                key={index}
                className="overflow-hidden transition-all duration-300 hover:shadow-sm"
                style={{ borderRadius: borderRadius }}
              >
                {/* Question Header */}
                <button
                  type="button"
                  onClick={() => toggleAccordion(index)}
                  disabled={!isLive}
                  className={cn(
                    "w-full text-left transition-all duration-300",
                    !isLive && "cursor-not-allowed",
                  )}
                  style={{
                    padding: "1rem 1.25rem",
                    backgroundColor:
                      openIndex === index
                        ? "rgba(0, 0, 0, 0.03)"
                        : "rgba(255, 255, 255, 0.8)",
                    borderRadius:
                      openIndex === index
                        ? `${borderRadius} ${borderRadius} 0 0`
                        : borderRadius,
                    border: "1px solid #e5e7eb",
                    borderBottom:
                      openIndex === index ? "none" : "1px solid #e5e7eb",
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{question.question}</span>
                    {isLive && (
                      <ChevronDownIcon
                        className={cn(
                          "h-5 w-5 transition-transform duration-300",
                          openIndex === index && "rotate-180",
                        )}
                        style={{ color: textColor }}
                      />
                    )}
                  </div>
                </button>

                {/* Answer Content */}
                <div
                  className={cn(
                    "overflow-hidden transition-all duration-300",
                    openIndex === index
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0",
                  )}
                >
                  <div
                    className="p-4"
                    style={{
                      backgroundColor: "rgba(0, 0, 0, 0.02)",
                      borderRadius: `0 0 ${borderRadius} ${borderRadius}`,
                      border: "1px solid #e5e7eb",
                      borderTop: "none",
                    }}
                  >
                    <div className="text-gray-600">{question.answer}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Empty State
          <div
            className="relative overflow-hidden"
            style={{
              borderRadius: borderRadius,
              border: "2px dashed #d1d5db",
              backgroundColor: "rgba(0, 0, 0, 0.02)",
            }}
          >
            <div className="animate-shimmer absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
            <div className="relative grid h-48 w-full place-content-center">
              <div className="flex flex-col items-center justify-center gap-3 text-center">
                <div
                  className="rounded-full p-4"
                  style={{
                    backgroundColor: "rgba(0, 0, 0, 0.05)",
                    borderRadius: borderRadius,
                  }}
                >
                  <QuestionMarkCircledIcon
                    className="h-10 w-10"
                    style={{ color: textColor }}
                  />
                </div>
                <div>
                  <p className="font-medium opacity-90">
                    هنوز پرسشی اضافه نشده
                  </p>
                  <p className="text-sm opacity-70">
                    برای افزودن پرسش جدید کلیک کنید
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default FaqFieldDefault;
