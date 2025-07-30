import { cn } from "@/lib/utils";

const TextFieldDefault = ({
  title,
  textColor,
  font,
  bgColor,
  borderColor,
  borderRadius,
  lineHeight,
  textAlign,
}) => {
  return (
    <div
      className={cn(
        `w-full text-wrap rounded-md px-3 py-2`,
        borderColor && "border-2",
      )}
      style={{
        backgroundColor: bgColor,
        borderRadius: borderRadius,
        borderColor: borderColor,
      }}
    >
      <p
        style={{
          textIndent: "12px",
          color: textColor,
          fontFamily: font,
          textAlign: textAlign,

          lineHeight: lineHeight,
          whiteSpace: "pre-wrap", // Recognise \n for line break
        }}
      >
        {title || "برای ویرایش متن کلیک کنید"}
      </p>
    </div>
  );
};

export default TextFieldDefault;
