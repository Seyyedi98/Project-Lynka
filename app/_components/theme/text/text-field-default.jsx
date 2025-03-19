import React from "react";

const TextFieldDefault = ({
  title,
  textColor,
  font,
  backgroundColor,
  borderColor,
  lineHeight,
  textAlign,
}) => {
  return (
    <div
      className="h-full w-full text-wrap rounded-md px-3 py-2"
      style={{ backgroundColor: backgroundColor }}
    >
      <p
        style={{
          textIndent: "12px",
          color: textColor,
          fontFamily: font,
          textAlign: textAlign,
          lineHeight: lineHeight,
        }}
      >
        {title || "برای ویرایش متن کلیک کنید"}
      </p>
    </div>
  );
};

export default TextFieldDefault;
