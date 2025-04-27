"use client";

import {
  FiAward,
  FiImage,
  FiLink,
  FiShoppingBag,
  FiTrendingUp,
  FiUsers,
  FiYoutube,
} from "react-icons/fi";
import LandingPageNavbar from "../_components/landing/navbar";
import LandingPageAudience from "../_components/landing/section/audience";
import EasyUseLandingPageSection from "../_components/landing/section/easyuse";
import LandingPageHero from "../_components/landing/section/hero";
import LivePageAllowsToSection from "../_components/landing/section/interactive-features";

export default function LandingPage() {
  return (
    <div className="font-yekan relative min-h-screen overflow-x-hidden bg-[hsl(var(--background))]">
      <LandingPageNavbar />

      <LandingPageHero />

      {/* <LandingPageFeatures /> */}

      <LandingPageAudience />

      <LivePageAllowsToSection />

      <EasyUseLandingPageSection />

      <section
        id="features"
        className="relative bg-[hsl(var(--secondaryBg))] py-20"
      >
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-[hsl(var(--text))] md:text-4xl">
              امکانات{" "}
              <span className="text-[hsl(var(--primary))]">منحصر به فرد</span>
            </h2>
            <p className="mx-auto max-w-2xl text-xl text-[hsl(var(--textLight))]">
              هر آنچه برای ساخت صفحه لینک حرفه‌ای نیاز دارید
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: <FiTrendingUp size={32} />,
                title: "آنالیتیکس پیشرفته",
                desc: "آمار دقیق بازدید از هر لینک و رفتار کاربران را بررسی کنید",
              },
              {
                icon: <FiImage size={32} />,
                title: "تم‌های حرفه‌ای",
                desc: "ده‌ها تم زیبا و قابل تنظیم برای هر سلیقه‌ای",
              },
              {
                icon: <FiUsers size={32} />,
                title: "مدیریت تیمی",
                desc: "امکان همکاری چند نفر روی یک صفحه لینک",
              },
              {
                icon: <FiShoppingBag size={32} />,
                title: "یکپارچه‌سازی",
                desc: "اتصال به ابزارهای دیگر مانند گوگل آنالیتیکس",
              },
              {
                icon: <FiAward size={32} />,
                title: "سفارشی‌سازی پیشرفته",
                desc: "امکان تغییر هر جزئیات از رنگ تا فونت و چیدمان",
              },
              {
                icon: <FiLink size={32} />,
                title: "لینک‌های هوشمند",
                desc: "لینک‌های هوشمند با قابلیت زمان‌بندی و جغرافیا",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="rounded-2xl border border-white/30 bg-white/80 p-8 shadow-sm backdrop-blur-sm transition-all hover:shadow-md"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[hsl(var(--primary)/0.1)] text-[hsl(var(--primary))]">
                  {feature.icon}
                </div>
                <h3 className="mb-3 text-xl font-bold text-[hsl(var(--text))]">
                  {feature.title}
                </h3>
                <p className="text-[hsl(var(--textLight))]">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Business Section */}
      <section id="business" className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center gap-12 lg:flex-row">
            {/* Image Content */}
            <div className="flex justify-center lg:w-1/2">
              <div className="relative w-full max-w-lg">
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--secondary))] opacity-20 blur-lg"></div>
                <div className="relative rounded-2xl border border-white/20 bg-[hsl(var(--secondaryBg))]/80 p-8 shadow-lg backdrop-blur-sm">
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      {
                        icon: (
                          <FiLink
                            className="text-[hsl(var(--primary))]"
                            size={24}
                          />
                        ),
                        label: "وبسایت شرکت",
                      },
                      {
                        icon: (
                          <FiShoppingBag
                            className="text-[hsl(var(--primary))]"
                            size={24}
                          />
                        ),
                        label: "فروشگاه آنلاین",
                      },
                      {
                        icon: (
                          <FiUsers
                            className="text-[hsl(var(--primary))]"
                            size={24}
                          />
                        ),
                        label: "تیم ما",
                      },
                      {
                        icon: (
                          <FiYoutube
                            className="text-[hsl(var(--primary))]"
                            size={24}
                          />
                        ),
                        label: "ویدیوهای آموزشی",
                      },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex h-full flex-col items-center justify-center gap-2 rounded-lg border border-white/30 bg-white p-4"
                      >
                        {item.icon}
                        <span className="text-sm text-[hsl(var(--text))]">
                          {item.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Text Content */}
            <div className="text-center lg:w-1/2 lg:text-right">
              <h2 className="mb-6 text-3xl font-bold text-[hsl(var(--text))] md:text-4xl">
                راه‌حل ایده‌آل برای{" "}
                <span className="text-[hsl(var(--primary))]">کسب‌وکارها</span>
              </h2>
              <p className="mb-8 text-xl text-[hsl(var(--textLight))]">
                صفحه لینک اختصاصی کسب‌وکار شما می‌تواند به ابزاری قدرتمند برای
                جذب مشتریان و هدایت آن‌ها به نقاط مختلف کسب‌وکار شما تبدیل شود.
              </p>
              <ul className="mb-8 space-y-4 text-right">
                {[
                  "نمایش حرفه‌ای محصولات و خدمات",
                  "هدایت هوشمند مشتریان به نقاط مختلف",
                  "آنالیز رفتار مخاطبان و مشتریان",
                  "یکپارچه‌سازی با ابزارهای بازاریابی",
                  "مدیریت چند شعبه و نمایندگی",
                ].map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-end gap-2 text-[hsl(var(--text))]"
                  >
                    <span className="h-2 w-2 rounded-full bg-[hsl(var(--primary))]"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
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
              <LoginButton asChild>
                <button className="rounded-full bg-white px-8 py-3 text-lg font-bold text-[hsl(var(--primary))] shadow-lg transition-all hover:bg-gray-100">
                  شروع رایگان
                </button>
              </LoginButton>
              <button className="rounded-full border-2 border-white bg-transparent px-8 py-3 text-lg font-bold text-white transition-all hover:bg-white/10">
                مشاهده دمو
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
              لینک‌پلاس
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
            © {new Date().getFullYear()} لینک‌پلاس. تمام حقوق محفوظ است.
          </div>
        </div>
      </footer>
    </div>
  );
}

// Mock LoginButton component (replace with your actual implementation)
function LoginButton({ asChild, children }) {
  return children;
}
