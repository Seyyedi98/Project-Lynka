"use client";

import { redirect } from "next/navigation";
import LandingPageNavbar from "../_components/landing/navbar";
import LandingPageAudience from "../_components/landing/section/audience";
import EasyUseLandingPageSection from "../_components/landing/section/easyuse";
import LandingPageFeatures from "../_components/landing/section/grid-featured";
import LandingPageHero from "../_components/landing/section/hero";
import LivePageAllowsToSection from "../_components/landing/section/interactive-features";
import PricingSection from "../_components/landing/section/pricing";

export default function LandingPage() {
  return (
    <div className="font-yekan relative min-h-screen overflow-x-hidden bg-[hsl(var(--background))]">
      <LandingPageNavbar />

      <LandingPageHero />

      <LandingPageAudience />

      <LivePageAllowsToSection />

      <EasyUseLandingPageSection />

      <LandingPageFeatures />

      <PricingSection />
      {/* CTA Section */}
      <section className="bg-gradient-to-r from-[hsl(var(--primary)/0.8)] to-[hsl(var(--secondary)/0.8)] py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto max-w-4xl rounded-2xl border border-white/30 bg-white/20 p-12 backdrop-blur-lg">
            <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
              آماده ساخت صفحه لینک خود هستید؟
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-xl text-white/90">
              همین حالا ثبت‌نام کنید و در کمتر از ۲ دقیقه صفحه لینک حرفه‌ای خود
              را بسازید
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <button
                onClick={() => redirect("/auth/login")}
                className="rounded-full bg-white px-8 py-3 text-lg font-bold text-[hsl(var(--primary))] shadow-lg transition-all hover:bg-gray-100"
              >
                شروع رایگان
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="border-t border-white/20 bg-[hsl(var(--secondaryBg))]/80 py-12 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <div className="mb-6 text-2xl font-bold text-[hsl(var(--primary))] md:mb-0">
              لینکا
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              <a
                href="#"
                className="text-sm text-[hsl(var(--textLight))] transition hover:text-[hsl(var(--primary))]"
              >
                قوانین
              </a>
              <a
                href="#"
                className="text-sm text-[hsl(var(--textLight))] transition hover:text-[hsl(var(--primary))]"
              >
                تماس با ما
              </a>
              <a
                href="#"
                className="text-sm text-[hsl(var(--textLight))] transition hover:text-[hsl(var(--primary))]"
              >
                سوالات متداول
              </a>
            </div>
          </div>
          <div className="mt-8 text-center text-sm text-[hsl(var(--textLight))]">
            © {new Date().getFullYear()} لینکا. تمام حقوق محفوظ است.
          </div>
        </div>
      </footer>
    </div>
  );
}
