"use client";

import { cn } from "@/lib/utils";
import { loadFont } from "@/utils/loadFont";
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { Accordion } from "rsuite";

const FaqFieldToon = (props) => {
  const {
    title,
    isPremium,
    isLive,
    textColor = "#382b22",
    bgColor = "#fff0f0",
    borderRadius = "0.75em",
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
      {!isPremium && (
        <div
          className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform p-2 text-center"
          style={{
            backgroundColor: "#fff0f0",
            border: "2px solid #b18597",
            borderRadius: "0.75em",
            color: "#382b22",
            fontWeight: "600",
            padding: "1.25em 2em",
            position: "relative",
            transformStyle: "preserve-3d",
          }}
        >
          <div
            style={{
              position: "absolute",
              content: "",
              width: "100%",
              height: "100%",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "#f9c4d2",
              borderRadius: "inherit",
              transform: "translate3d(0, 0.75em, -1em)",
              zIndex: -1,
            }}
          />
          برای استفاده از این بلوک، اشتراک ویژه خود را تمدید کنید
        </div>
      )}
      <div className={cn(`w-full text-wrap py-2`, !isPremium && "opacity-70")}>
        <div
          style={{
            fontFamily: textFont ? `var(${textFont})` : "inherit",
            color: textColor,
            backgroundColor: bgColor,
            padding: "1.25em 2em",
            border: "2px solid #b18597",
            borderRadius: borderRadius,
            transformStyle: "preserve-3d",
            position: "relative",
            fontWeight: "600",
            textTransform: "uppercase",
            textAlign: "center",
            marginBottom: "1em",
          }}
        >
          <div
            style={{
              position: "absolute",
              content: "",
              width: "100%",
              height: "100%",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "#f9c4d2",
              borderRadius: "inherit",
              transform: "translate3d(0, 0.75em, -1em)",
              transition:
                "transform 150ms cubic-bezier(0, 0, 0.58, 1), box-shadow 150ms cubic-bezier(0, 0, 0.58, 1)",
              zIndex: -1,
            }}
          />
          {title}
        </div>
        {questions.length > 0 ? (
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
                  header={
                    <div
                      style={{
                        padding: "1em",
                        backgroundColor: bgColor,
                        border: "2px solid #b18597",
                        borderRadius: borderRadius,
                        marginBottom: "0.5em",
                        position: "relative",
                        transformStyle: "preserve-3d",
                        fontWeight: "600",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          content: "",
                          width: "100%",
                          height: "100%",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: "#f9c4d2",
                          borderRadius: "inherit",
                          transform: "translate3d(0, 0.5em, -1em)",
                          transition:
                            "transform 150ms cubic-bezier(0, 0, 0.58, 1)",
                          zIndex: -1,
                        }}
                      />
                      {question.question}
                    </div>
                  }
                  eventKey={index}
                  style={{
                    border: "none",
                  }}
                >
                  <div
                    style={{
                      padding: "1em",
                      backgroundColor: "#ffffff",
                      border: "2px solid #b18597",
                      borderRadius: borderRadius,
                      margin: "0.5em 0",
                      position: "relative",
                      transformStyle: "preserve-3d",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        content: "",
                        width: "100%",
                        height: "100%",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: "#f9c4d2",
                        borderRadius: "inherit",
                        transform: "translate3d(0, 0.5em, -1em)",
                        zIndex: -1,
                      }}
                    />
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
              backgroundColor: bgColor,
              border: "2px solid #b18597",
              borderRadius: borderRadius,
              color: textColor,
              position: "relative",
              transformStyle: "preserve-3d",
            }}
          >
            <div
              style={{
                position: "absolute",
                content: "",
                width: "100%",
                height: "100%",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "#f9c4d2",
                borderRadius: "inherit",
                transform: "translate3d(0, 0.5em, -1em)",
                zIndex: -1,
              }}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                position: "relative",
                zIndex: 1,
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

export default FaqFieldToon;
