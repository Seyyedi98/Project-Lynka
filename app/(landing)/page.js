"use client";

import { redirect } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import LandingPageNavbar from "../_components/landing/navbar";
import LandingPageAudience from "../_components/landing/section/audience";
import EasyUseLandingPageSection from "../_components/landing/section/easyuse";
import LandingPageFeatures from "../_components/landing/section/grid-featured";
import LandingPageHero from "../_components/landing/section/hero";
import LivePageAllowsToSection from "../_components/landing/section/interactive-features";
import PricingSection from "../_components/landing/section/pricing";
import Image from "next/image";
import Link from "next/link";
import TermsModal from "../_components/common/modal/terms-modal";
import ContactModal from "../_components/common/modal/contact-modal";
import FaqModal from "../_components/common/modal/faq-modal";
import { ArrowLeft, Check, Sparkles, Zap } from "lucide-react";

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
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 py-24">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-br from-white/10 to-white/5 p-12 backdrop-blur-xl"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-purple-500/10" />

            <div className="relative z-10">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                className="mb-6 text-3xl font-bold text-white md:text-4xl lg:text-5xl"
              >
                آماده ساخت صفحه{" "}
                <span className="bg-gradient-to-r from-amber-300 to-cyan-300 bg-clip-text text-transparent">
                  شخصی خود
                </span>{" "}
                هستید؟
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                viewport={{ once: true }}
                className="mx-auto mb-10 max-w-2xl text-lg leading-8 text-white/80 md:text-xl"
              >
                همین حالا ثبت نام کنید و در کمتر از ۲ دقیقه صفحه‌ی حرفه‌ای خود
                را بسازید
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                viewport={{ once: true }}
                className="flex flex-col items-center justify-center gap-4 sm:flex-row"
              >
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => redirect("/auth/login")}
                  className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 px-8 py-4 text-lg font-bold text-white shadow-2xl transition-all hover:shadow-amber-500/25"
                >
                  <span className="flex items-center gap-2">
                    شروع رایگان
                    <ArrowLeft className="h-5 w-5 transition-transform duration-500 group-hover:-translate-x-1" />
                  </span>

                  {/* Shine effect */}
                  <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-all group-hover:translate-x-full" />
                </motion.button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                viewport={{ once: true }}
                className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-white/60"
              >
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-400" />
                  <span>شروع رایگان</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-400" />
                  <span>راه اندازی سریع</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-400" />
                  <span>پشتیبانی ۲۴/۷</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-900 py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            {/* Brand */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center md:text-right"
            >
              <div className="mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-3xl font-bold text-transparent">
                لینکا
              </div>
              <p className="max-w-xs text-sm text-slate-300">
                پلتفرم ساخت صفحه شخصی حرفه‌ای برای همه
              </p>
            </motion.div>

            {/* Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="flex flex-wrap justify-center gap-8"
            >
              <div className="flex flex-col gap-4">
                <p className="text-sm font-medium text-white">پشتیبانی</p>
                <div className="flex flex-col gap-2">
                  <TermsModal
                    trigger={
                      <span className="cursor-pointer text-sm text-slate-300 transition-colors hover:text-white">
                        قوانین
                      </span>
                    }
                  />
                  <ContactModal
                    trigger={
                      <span className="cursor-pointer text-sm text-slate-300 transition-colors hover:text-white">
                        تماس با ما
                      </span>
                    }
                  />
                  <FaqModal
                    trigger={
                      <span className="cursor-pointer text-sm text-slate-300 transition-colors hover:text-white">
                        سوالات متداول
                      </span>
                    }
                  />
                </div>
              </div>
            </motion.div>
          </div>

          {/* E-Namad and Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-12 flex flex-col items-center justify-between gap-6 border-t border-slate-700 pt-8 md:flex-row"
          >
            {/* E-Namad */}
            <Link
              href="https://trustseal.enamad.ir/?id=605868&Code=3lF0KZtRnH1EnHWZ9ildmBWtPqvn6Vxf"
              target="_blank"
              referrerPolicy="origin"
              className="order-2 md:order-1"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="rounded-lg bg-slate-800 p-2 shadow-lg"
              >
                <img
                  src="https://trustseal.enamad.ir/logo.aspx?id=605868&Code=3lF0KZtRnH1EnHWZ9ildmBWtPqvn6Vxf"
                  alt="e-namad"
                  width={70}
                  height={50}
                  loading="lazy"
                  referrerPolicy="origin"
                  className="rounded"
                />
              </motion.div>
            </Link>

            {/* Copyright */}
            <div className="order-1 text-center text-sm text-slate-300 md:order-2">
              © {new Date().getFullYear()} لینکا. تمام حقوق محفوظ است.
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}
