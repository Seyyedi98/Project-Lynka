"use client";

import { cn } from "@/lib/utils";
import { loadFont } from "@/utils/loadFont";
import { useEffect, useState } from "react";
import { Accordion } from "rsuite";

const FaqFieldDefault = (props) => {
  const {
    title,
    isSilver,
    isLive,
    textColor,
    bgColor,
    borderRadius,
    font,
    questions,
  } = props;
  const [textFont, setTextFont] = useState(null);

  useEffect(() => {
    const fetchFont = async () => {
      try {
        const textFontVariable = await loadFont(font);
        setTextFont(textFontVariable);
      } catch (error) {
        console.error("Error loading font:", error);
      }
    };

    fetchFont();
  }, [textFont, font]);

  return (
    <div className="relative w-full">
      {!isSilver && (
        <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform rounded-md bg-red-500 p-2 text-center text-white">
          برای استفاده از این بلوک، اشتراک ویژه خود را تمدید کنید
        </div>
      )}
      <div
        className={cn(
          `w-full text-wrap rounded-md py-2`,
          !isSilver && "opacity-70",
        )}
      >
        <p
          style={{
            fontFamily: textFont ? `var(${textFont})` : "inherit",
            color: textColor,
          }}
          className="text-center text-text"
        >
          {title}
        </p>
        <Accordion
          style={{
            fontFamily: textFont ? `var(${textFont})` : "inherit",
            color: textColor,
          }}
          className={cn(``, !isLive && "pointer-events-none")}
        >
          {questions.map((question, index) => {
            return (
              <Accordion.Panel
                key={question.question}
                header={question.question}
                eventKey={index}
              >
                {question.answer}
              </Accordion.Panel>
            );
          })}
        </Accordion>
      </div>
    </div>
  );
};

export default FaqFieldDefault;
