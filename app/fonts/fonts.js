import localFont from "next/font/local";

export const fontsList = [
  { fontName: "یکان", fontValue: "yekan" },
  { fontName: "پرستو", fontValue: "parastoo" },
  { fontName: "ساحل", fontValue: "sahel" },
  { fontName: "صمیم", fontValue: "samim" },
  { fontName: "شبنم", fontValue: "shabnam" },
  { fontName: "تنها", fontValue: "tanha" },
  { fontName: "وزیر", fontValue: "vazir" },
  { fontName: "افسون", fontValue: "afsoon" },
  { fontName: "عارف", fontValue: "aref" },
  { fontName: "مروارید", fontValue: "morvarid" },
  { fontName: "جریان", fontValue: "flow" },
];

export const geistSans = localFont({
  src: "./GeistVF.ttf",
  variable: "--font-geist-sans",
  weight: "100 900",
});
export const geistMono = localFont({
  src: "./GeistVF.ttf",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const yekan = localFont({
  src: "./yekan/Yekan.woff",
  variable: "--font-yekan",
  weight: "100 200 400 500 900",
});

export const parastoo = localFont({
  src: [
    {
      path: "./parastoo/Parastoo.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-parastoo",
});

export const sahel = localFont({
  src: [
    {
      path: "./sahel/Sahel.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-sahel",
});

export const samim = localFont({
  src: [
    {
      path: "./samim/Samim.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-samim",
});

export const shabnam = localFont({
  src: [
    {
      path: "./shabnam/Shabnam.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-shabnam",
});

export const tanha = localFont({
  src: "./tanha/Tanha.woff2",
  variable: "--font-tanha",
  weight: "100 200 400 500 900",
});

export const vazir = localFont({
  src: [
    {
      path: "./vazir/Vazir-Medium.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-vazir",
});

export const afsoon = localFont({
  src: [
    {
      path: "./afsoon/afsoon.woff",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-afsoon",
});

export const aref = localFont({
  src: [
    {
      path: "./aref/aref.woff",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-aref",
});

export const flow = localFont({
  src: [
    {
      path: "./flow/flow.woff",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-flow",
});

export const morvarid = localFont({
  src: [
    {
      path: "./morvarid/morvarid.woff",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-morvarid",
});
