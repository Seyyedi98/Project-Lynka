"use client";

import { cn } from "@/lib/utils";
import { loadFont } from "@/utils/loadFont";
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { Accordion } from "rsuite";

const FaqFieldWindows95 = (props) => {
  const {
    title,
    isPremium,
    isLive,
    textColor = "#000000",
    borderRadius = "0px",
    font,
    questions,
  } = props;
  const [loadedFont, setLoadedFont] = useState(null);

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

  const win95Colors = {
    lightBorder: "#FFFFFF",
    darkBorder: "#808080",
    darkerBorder: "#000000",
    buttonFace: "#C0C0C0",
    buttonText: "#000000",
    windowBackground: "#C0C0C0",
    titleBar: "#000080",
    titleBarGradient: "#1084d0",
  };

  return (
    <div
      className="relative w-full"
      style={{
        fontFamily: loadedFont
          ? `var(${loadedFont})`
          : "MS Sans Serif, sans-serif",
        fontSize: "12px",
      }}
    >
      {!isPremium && (
        <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform rounded-md bg-red-500 p-2 text-center text-white">
          برای استفاده از این بلوک، اشتراک ویژه خود را تمدید کنید
        </div>
      )}
      <div
        className={cn(`w-full text-wrap`, !isPremium && "opacity-70")}
        style={{
          backgroundColor: win95Colors.windowBackground,
          border: "2px solid",
          borderColor: `${win95Colors.darkBorder} ${win95Colors.lightBorder} ${win95Colors.lightBorder} ${win95Colors.darkBorder}`,
        }}
      >
        <div
          style={{
            background: `linear-gradient(90deg, ${win95Colors.titleBar}, ${win95Colors.titleBarGradient})`,
            color: "white",
            padding: "4px 8px",
            fontWeight: "bold",
            fontSize: "13px",
            borderBottom: `2px solid ${win95Colors.darkBorder}`,
            display: "flex",
            alignItems: "center",
          }}
          className="text-center"
        >
          {title}
        </div>

        <div style={{ padding: "8px" }}>
          {questions.length > 0 ? (
            <Accordion
              style={{
                fontFamily: loadedFont
                  ? `var(${loadedFont})`
                  : "MS Sans Serif, sans-serif",
                color: win95Colors.buttonText,
                backgroundColor: win95Colors.windowBackground,
                border: "2px solid",
                borderColor: `${win95Colors.darkBorder} ${win95Colors.lightBorder} ${win95Colors.lightBorder} ${win95Colors.darkBorder}`,
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
    </div>
  );
};

export default FaqFieldWindows95;
