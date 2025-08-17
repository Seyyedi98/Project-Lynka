import { cn } from "@/lib/utils";

const TextFieldTransparent = ({
  title,
  textColor,
  font,
  borderRadius,
  lineHeight,
  textAlign,
}) => {
  return (
    <div
      className={cn(`w-full text-wrap rounded-md px-3 py-2`)}
      style={{
        borderRadius: borderRadius,
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

export default TextFieldTransparent;
