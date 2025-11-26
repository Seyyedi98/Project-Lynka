import { auth } from "@/auth";
import { ThemeProvider } from "@/context/theme-provider";
import { StoreProvider } from "@/store/StoreProvider";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import { geistMono, geistSans } from "./fonts/fonts";
import "./globals.css";

export const metadata = {
  // title: "The Wild Oasis",
  title: {
    template: "لینکا | %s",
    default: "لینکا | ابزار ساخت صفحه شخصی",
  },
  description:
    "ایجاد صفحه شخصی برای سازماندهی لینک‌ها و معرفی بهتر هویت آنلاین؛ مناسب کاربران عادی تا حرفه‌ای‌ها.",
  favicon: "/favicon.ico",
};

export default async function RootLayout({ children }) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <StoreProvider>
        <html lang="fa" dir="rtl">
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
            <Toaster />
          </body>
        </html>
      </StoreProvider>
    </SessionProvider>
  );
}
