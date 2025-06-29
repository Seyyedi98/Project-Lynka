"use client";

import { cn } from "@/lib/utils";
import { loadFont } from "@/utils/loadFont";
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { Accordion } from "rsuite";

const FaqFieldDefault = (props) => {
  const {
    title,
    isPremium,
    isLive,
    textColor = "#000000",
    bgColor = "#C0C0C0",
    borderRadius = "0px",
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

  const win95Colors = {
    lightBorder: "#FFFFFF",
    darkBorder: "#808080",
    darkerBorder: "#000000",
    highlight: "#DFDFDF",
    buttonFace: "#C0C0C0",
    buttonShadow: "#808080",
    buttonText: "#000000",
    windowBackground: "#C0C0C0",
    windowFrame: "#000000",
  };

  return (
    <div
      className="relative w-full"
      style={{
        fontFamily: textFont ? `var(${textFont})` : "MS Sans Serif, sans-serif",
        fontSize: "12px",
      }}
    >
      {!isPremium && (
        <div
          className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform p-2 text-center"
          style={{
            backgroundColor: win95Colors.buttonFace,
            border: "2px solid",
            borderColor: `${win95Colors.lightBorder} ${win95Colors.darkBorder}`,
            boxShadow: `1px 1px 0px 0px ${win95Colors.darkerBorder}`,
            color: win95Colors.buttonText,
            padding: "3px 12px",
            fontWeight: "bold",
          }}
        >
          برای استفاده از این بلوک، اشتراک ویژه خود را تمدید کنید
        </div>
      )}
      <div
        className={cn(`w-full text-wrap py-2`, !isPremium && "opacity-70")}
        style={{
          backgroundColor: win95Colors.windowBackground,
          padding: "8px",
        }}
      >
        <div
          style={{
            fontFamily: textFont
              ? `var(${textFont})`
              : "MS Sans Serif, sans-serif",
            color: win95Colors.buttonText,
            backgroundColor: win95Colors.buttonFace,
            padding: "4px 8px",
            border: "2px solid",
            borderColor: `${win95Colors.lightBorder} ${win95Colors.darkBorder}`,
            boxShadow: `1px 1px 0px 0px ${win95Colors.darkerBorder}`,
            borderRadius: borderRadius,
            marginBottom: "8px",
            fontWeight: "bold",
            fontSize: "13px",
          }}
          className="text-center"
        >
          {title}
        </div>
        {questions.length > 0 ? (
          <Accordion
            style={{
              fontFamily: textFont
                ? `var(${textFont})`
                : "MS Sans Serif, sans-serif",
              color: win95Colors.buttonText,
              backgroundColor: win95Colors.windowBackground,
              border: "2px solid",
              borderColor: `${win95Colors.darkBorder} ${win95Colors.lightBorder} ${win95Colors.lightBorder} ${win95Colors.darkBorder}`,
              borderRadius: borderRadius,
            }}
            className={cn(``, !isLive && "pointer-events-none")}
          >
            {questions.map((question, index) => {
              return (
                <Accordion.Panel
                  key={question.question}
                  header={
                    <div
                      style={{
                        padding: "4px 8px",
                        borderBottom: `1px solid ${win95Colors.darkBorder}`,
                        backgroundColor: win95Colors.buttonFace,
                        display: "flex",
                        alignItems: "center",
                        height: "32px",
                        fontWeight: "bold",
                        fontSize: "12px",
                        border: "1px solid",
                        borderColor: `${win95Colors.lightBorder} ${win95Colors.darkBorder}`,
                        margin: "2px",
                      }}
                    >
                      {question.question}
                    </div>
                  }
                  eventKey={index}
                  style={{
                    border: "none",
                    margin: "2px",
                  }}
                >
                  <div
                    style={{
                      padding: "8px",
                      backgroundColor: win95Colors.lightBorder,
                      border: "2px solid",
                      borderColor: `${win95Colors.darkBorder} ${win95Colors.lightBorder} ${win95Colors.lightBorder} ${win95Colors.darkBorder}`,
                      margin: "4px",
                      fontSize: "12px",
                      lineHeight: "1.4",
                    }}
                  >
                    {question.answer}
                  </div>
                </Accordion.Panel>
              );
            })}
          </Accordion>
        ) : (
          <div
            style={{
              height: "160px",
              width: "100%",
              display: "grid",
              placeContent: "center",
              backgroundColor: win95Colors.buttonFace,
              border: "2px solid",
              borderColor: `${win95Colors.lightBorder} ${win95Colors.darkBorder}`,
              boxShadow: `inset 1px 1px 0px 1px ${win95Colors.darkerBorder}`,
              borderRadius: borderRadius,
              color: win95Colors.buttonText,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                fontFamily: "MS Sans Serif, sans-serif",
                fontSize: "12px",
              }}
            >
              <QuestionMarkCircledIcon className="h-8 w-8" />
              افزودن
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FaqFieldDefault;
