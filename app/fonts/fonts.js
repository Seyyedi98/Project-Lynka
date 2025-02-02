import localFont from "next/font/local";

export const fontsList = [
  { fontName: "یکان", fontValue: "yekan" },
  { fontName: "پرستو", fontValue: "parastoo" },
  { fontName: "ساحل", fontValue: "sahel" },
  { fontName: "صمیم", fontValue: "samim" },
  { fontName: "شبنم", fontValue: "shabnam" },
  { fontName: "تنها", fontValue: "tanha" },
  { fontName: "وزیر", fontValue: "vazir" },

];

export const geistSans = localFont({
  src: "./GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
export const geistMono = localFont({
  src: "./GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const yekan = localFont({
  src: "./yekan/Yekan.woff",
  variable: "--font-Yekan",
  weight: "100 200 400 500 900",
});

export const parastoo = localFont({
  src: [
    {
      path: "./parastoo/Parastoo.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./parastoo/Parastoo-Bold.woff2",
      weight: "700",
      style: "bold",
    },
  ],
});

export const sahel = localFont({
  src: [
    {
      path: "./sahel/Sahel.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./sahel/Sahel-Bold.woff2",
      weight: "700",
      style: "bold",
    },
  ],
});

export const samim = localFont({
  src: [
    {
      path: "./samim/Samim.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./samim/Samim-Bold.woff2",
      weight: "700",
      style: "bold",
    },
  ],
});

export const shabnam = localFont({
  src: [
    {
      path: "./shabnam/Shabnam-Light.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./shabnam/Shabnam.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./shabnam/Shabnam-Bold.woff2",
      weight: "700",
      style: "bold",
    },
  ],
});

export const tanha = localFont({
  src: "./tanha/Tanha.woff2",
  variable: "--font-Yekan",
  weight: "100 200 400 500 900",
});

export const vazir = localFont({
  src: [
    {
      path: "./vazir/Vazir-Thin.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "./vazir/Vazir-Light.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./vazir/Vazir-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./vazir/Vazir-Bold.woff2",
      weight: "700",
      style: "bold",
    },
  ],
});
