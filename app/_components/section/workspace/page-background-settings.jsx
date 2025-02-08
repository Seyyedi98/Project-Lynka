import { useState } from "react";
import SquareButton from "../../common/button/square-button";
import { useDispatch, useSelector } from "react-redux";
import { cn } from "@/lib/utils";

const colors = [
  "#FFFFFF",
  "#F8F9FA",
  "#F1F1F1",
  "#E9ECEF",
  "#DEE2E6",
  "#D6D8DB",
  "#CED4DA",
  "#ADB5BD",
  "#6C757D",
  "#343A40",
  "#000000",
  "#FF5733",
  "#FFC300",
  "#DAF7A6",
  "#33FF57",
  "#57CFF7",
  "#3375FF",
  "#C833FF",
  "#FF33C7",
  "#FF8C33",
  "#FFB533",
  "#EAE5E5",
  "#F4E1D2",
  "#D8E2F1",
  "#B6E8F2",
  "#A5F3E9",
  "#D0F1CE",
  "#EAF8CE",
  "#FCEEDB",
  "#FFE2F1",
];

const gradient = [
  "linear-gradient(45deg, #801336, #C72C41)",
  "linear-gradient(135deg, #FF7EB3, #FF758C)",
  "linear-gradient(135deg, #FF9A8B, #FF6A88)",
  "linear-gradient(135deg, #FAD0C4, #FFD1FF)",
  "linear-gradient(135deg, #FFDEE9, #B5FFFC)",
  "linear-gradient(135deg, #A18CD1, #FBC2EB)",
  "linear-gradient(135deg, #8EC5FC, #E0C3FC)",
  "linear-gradient(135deg, #FDC830, #F37335)",
  "linear-gradient(135deg, #FC466B, #3F5EFB)",
  "linear-gradient(135deg, #FFC3A0, #FFAFBD)",
  "linear-gradient(135deg, #F3E7E9, #E3EEFF)",
  "linear-gradient(135deg, #F7971E, #FFD200)",
  "linear-gradient(135deg, #FC5C7D, #6A82FB)",
  "linear-gradient(135deg, #FF9A8B, #FF6A88, #FF99AC)",
  "linear-gradient(135deg, #FBAB7E, #F7CE68)",
  "linear-gradient(135deg, #C471ED, #F64F59)",
  "linear-gradient(135deg, #FF6FD8, #3813C2)",
  "linear-gradient(135deg, #00C9FF, #92FE9D)",
  "linear-gradient(135deg, #F4D03F, #16A085)",
  "linear-gradient(135deg, #EECDA3, #EF629F)",
  "linear-gradient(135deg, #F2D50F, #DA0641)",
  "radial-gradient(125% 125% at 50% 10%, #000 40%, #63e 100%)",
  "radial-gradient(circle, #ff9a9e, #fad0c4)",
  "radial-gradient(circle, #ff758c, #ff7eb3)",
  "radial-gradient(circle, #ff9966, #ff5e62)",
  "radial-gradient(circle at 30% 30%, #4158D0, #C850C0, #FFCC70)",
  "radial-gradient(circle at 70% 20%, #A18CD1, #FBC2EB)",
  "radial-gradient(circle at 50% 50%, #36D1DC, #5B86E5)",
  "radial-gradient(circle at 40% 60%, #FF512F, #DD2476)",
  "linear-gradient(to right, #ff7e5f, #feb47b)",
  "linear-gradient(135deg, #667eea, #764ba2)",
  "linear-gradient(to right, #00c6ff, #0072ff)",
  "linear-gradient(45deg, #ff6a00, #ee0979)",
  "linear-gradient(to right, #11998e, #38ef7d)",
  "linear-gradient(135deg, #fc4a1a, #f7b733)",
  "linear-gradient(to right, #373b44, #4286f4)",
  "conic-gradient(from 0deg, #ff7eb3, #ff758c, #ff7eb3)",
  "conic-gradient(from 180deg, #00dbde, #fc00ff)",
  "conic-gradient(from 90deg, #f79d00, #64f38c)",
  "conic-gradient(from 45deg, #ff9a9e, #fad0c4, #ffdde1)",
  "linear-gradient(135deg, #0F2027, #203A43, #2C5364)",
  "linear-gradient(135deg, #009FFF, #ec2F4B)",
  "linear-gradient(135deg, #1D4350, #A43931)",
  "linear-gradient(135deg, #a8c0ff, #3f2b96)",
  "linear-gradient(135deg, #f953c6, #b91d73)",
  "linear-gradient(135deg, #c31432, #240b36)",
  "linear-gradient(135deg, #FF512F, #DD2476)",
  "radial-gradient(circle at 50% 50%, #43cea2, #185a9d)",
  "radial-gradient(circle at 50% 50%, #e1eec3, #f05053)",
  "radial-gradient(circle at 50% 50%, #ff4b1f, #1fddff)",
  "radial-gradient(circle at 50% 50%, #d3cce3, #e9e4f0)",
  "radial-gradient(circle at 50% 50%, #fc4a1a, #f7b733)",
  "conic-gradient(from 0deg, #4facfe, #00f2fe)",
  "conic-gradient(from 45deg, #ff512f, #f09819)",
  "conic-gradient(from 180deg, #fc466b, #3f5efb)",
  "conic-gradient(from 270deg, #ff9a8b, #ff6a88, #ff99ac)",
  "conic-gradient(from 0deg, #16a085, #f4d03f)",
  "conic-gradient(from 90deg, #ff6a00, #ee0979)",
  "conic-gradient(from 180deg, #1e3c72, #2a5298)",
];

const PageBackgroundSettings = () => {
  const [category, setCategory] = useState("color");
  const theme = useSelector((store) => store.page.theme);

  const dispatch = useDispatch();

  const setPageBackground = function (velue) {
    const payload = { ...theme, backgroundValue: velue };
    dispatch({ type: "page/setTheme", payload });
  };

  return (
    <>
      <div className="mb-4 flex items-center justify-center gap-4 border-b-2 pb-4">
        <SquareButton state={category} action={setCategory} rule="color">
          رنگ
        </SquareButton>
        <SquareButton state={category} action={setCategory} rule="gradient">
          طیف رنگی
        </SquareButton>
        <SquareButton state={category} action={setCategory} rule="pattern">
          الگو
        </SquareButton>
        <SquareButton state={category} action={setCategory} rule="image">
          تصویر
        </SquareButton>
      </div>
      <div className="grid h-[60svh] w-full max-w-sm grid-cols-[repeat(auto-fit,minmax(80px,1fr))] gap-4 overflow-y-scroll [scrollbar-width:none] md:h-[80vh] md:max-h-full">
        {category === "color" &&
          colors.map((color) => {
            return (
              <div
                key={color}
                style={{ backgroundColor: color }}
                onClick={() => setPageBackground(color)}
                className={cn(
                  `h-20 w-20 cursor-pointer rounded-full border border-primary duration-200 hover:shadow-xl`,
                  theme.backgroundValue === color && "border-4",
                )}
              ></div>
            );
          })}

        {category === "gradient" &&
          gradient.map((color) => {
            return (
              <div
                key={color}
                style={{ background: color }}
                onClick={() => setPageBackground(color)}
                className={cn(
                  `h-20 w-20 cursor-pointer rounded-full border border-primary duration-200 [scrollbar-width:none] hover:shadow-xl`,
                  theme.backgroundValue === color && "border-4",
                )}
              ></div>
            );
          })}
      </div>
    </>
  );
};

export default PageBackgroundSettings;
