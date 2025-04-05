"use client";

import { useState, useEffect } from "react";
import {
  FiMenu,
  FiX,
  FiLink,
  FiImage,
  FiMusic,
  FiYoutube,
  FiShoppingBag,
  FiHeart,
  FiStar,
  FiZap,
  FiSmile,
  FiAward,
  FiUsers,
  FiTrendingUp,
  FiArrowLeft,
  FiShield,
  FiSettings,
  FiClock,
  FiGlobe,
} from "react-icons/fi";

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (index) => {
    setActiveLink(index);
    setTimeout(() => setIsMenuOpen(false), 500);
  };

  return (
    <div className="font-yekan min-h-screen overflow-x-hidden bg-[hsl(var(--background))]">
      {/* Navigation */}
      <nav
        className={`fixed z-50 w-full transition-all duration-500 ${isScrolled ? "bg-white/80 py-2 shadow-sm backdrop-blur-md" : "bg-transparent py-4"}`}
      >
        <div className="container mx-auto flex items-center justify-between px-4">
          <div className="text-2xl font-bold text-[hsl(var(--primary))]">
            لینک‌پلاس
          </div>

          {/* Desktop Menu */}
          <div className="hidden items-center gap-8 md:flex">
            <a
              href="#features"
              className="text-[hsl(var(--text))] transition hover:text-[hsl(var(--primary))]"
            >
              امکانات
            </a>
            <a
              href="#business"
              className="text-[hsl(var(--text))] transition hover:text-[hsl(var(--primary))]"
            >
              برای کسب‌وکارها
            </a>
            <a
              href="#personal"
              className="text-[hsl(var(--text))] transition hover:text-[hsl(var(--primary))]"
            >
              برای افراد
            </a>
            <a
              href="#testimonials"
              className="text-[hsl(var(--text))] transition hover:text-[hsl(var(--primary))]"
            >
              نظرات کاربران
            </a>
            <LoginButton asChild>
              <button className="rounded-lg bg-[hsl(var(--primary))] px-6 py-2 text-white transition hover:bg-[hsl(var(--primary-hover))]">
                شروع کنید
              </button>
            </LoginButton>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="text-[hsl(var(--text))] md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="fixed inset-0 z-40 bg-white/95 px-6 pt-20 backdrop-blur-lg md:hidden">
            <div className="flex flex-col gap-6">
              {[
                { label: "امکانات", href: "#features" },
                { label: "برای کسب‌وکارها", href: "#business" },
                { label: "برای افراد", href: "#personal" },
                { label: "نظرات کاربران", href: "#testimonials" },
              ].map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className={`py-3 text-2xl font-medium transition-all duration-300 ${activeLink === index ? "translate-x-2 text-[hsl(var(--primary))]" : "text-[hsl(var(--text))]"}`}
                  onClick={() => handleLinkClick(index)}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {item.label}
                </a>
              ))}
              <LoginButton asChild>
                <button className="mt-8 rounded-lg bg-[hsl(var(--primary))] px-6 py-3 text-xl text-white">
                  شروع کنید
                </button>
              </LoginButton>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pb-20 pt-32 md:pb-28 md:pt-40">
        <div className="container mx-auto flex flex-col items-center gap-12 px-4 md:flex-row">
          {/* Text Content */}
          <div className="text-center md:w-1/2 md:text-right">
            <h1 className="mb-6 text-4xl font-bold leading-tight text-[hsl(var(--text))] md:text-5xl">
              صفحه لینک{" "}
              <span className="text-[hsl(var(--primary))]">حرفه‌ای</span> خود را
              بسازید
            </h1>
            <p className="mb-8 text-xl text-[hsl(var(--textLight))] opacity-90">
              تمام لینک‌های مهم خود را در یک صفحه زیبا و مدرن جمع‌آوری کنید و
              تجربه‌ای بی‌نظیر برای مخاطبان خود ایجاد کنید
            </p>
            <div className="flex justify-center gap-4 md:justify-start">
              <LoginButton asChild>
                <button className="flex items-center gap-2 rounded-lg bg-[hsl(var(--primary))] px-8 py-4 text-lg font-bold text-white hover:bg-[hsl(var(--primary-hover))]">
                  <FiZap /> شروع رایگان
                </button>
              </LoginButton>
              <button className="flex items-center gap-2 rounded-lg border-2 border-[hsl(var(--primary))] px-8 py-4 text-lg font-bold text-[hsl(var(--primary))]">
                <FiSmile /> دموی زنده
              </button>
            </div>
          </div>

          {/* Image Content */}
          <div className="flex justify-center md:w-1/2">
            <div className="relative w-full max-w-md">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--secondary))] opacity-20 blur-lg"></div>
              <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-white/80 shadow-xl backdrop-blur-sm">
                <div className="relative flex h-48 items-center justify-center bg-gradient-to-r from-[hsl(var(--primary)/0.3)] to-[hsl(var(--secondary)/0.3)]">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white/30 text-4xl text-white backdrop-blur-sm">
                    👔
                  </div>
                </div>
                <div className="space-y-3 p-6">
                  {[
                    "وبسایت رسمی",
                    "شبکه‌های اجتماعی",
                    "محصولات ما",
                    "تماس با ما",
                  ].map((link, index) => (
                    <div
                      key={index}
                      className="flex cursor-pointer items-center gap-3 rounded-lg border border-white/30 bg-white/50 p-4 backdrop-blur-sm transition-colors hover:bg-white/70"
                    >
                      <FiLink
                        className="text-[hsl(var(--primary))]"
                        size={20}
                      />
                      <span className="text-[hsl(var(--text))]">{link}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
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
              {
                icon: <FiShield size={32} />,
                title: "امنیت بالا",
                desc: "حفاظت از اطلاعات کاربران با استفاده از پروتکل‌های امنیتی پیشرفته.",
              },
              {
                icon: <FiSettings size={32} />,
                title: "تنظیمات پیشرفته",
                desc: "کنترل کامل بر روی ظاهر و عملکرد صفحه لینک خود.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="rounded-xl border border-white/30 bg-white/80 p-8 shadow-sm backdrop-blur-sm transition-all hover:shadow-md"
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
                  "پشتیبانی از پرداخت‌های آنلاین",
                  "پشتیبانی از چند زبان",
                  "زمان‌بندی انتشار لینک‌ها",
                ].map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-end gap-2"
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

      {/* Personal Section */}
      <section id="personal" className="bg-[hsl(var(--secondaryBg))] py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center gap-12 lg:flex-row">
            {/* Text Content */}
            <div className="text-center lg:w-1/2 lg:text-right">
              <h2 className="mb-6 text-3xl font-bold text-[hsl(var(--text))] md:text-4xl">
                صفحه لینک شخصی{" "}
                <span className="text-[hsl(var(--primary))]">منحصر به فرد</span>
              </h2>
              <p className="mb-8 text-xl text-[hsl(var(--textLight))]">
                برای هنرمندان، تولیدکنندگان محتوا، فریلنسرها و هر کسی که
                می‌خواهد حضور آنلاین حرفه‌ای داشته باشد.
              </p>
              <ul className="mb-8 space-y-4 text-right">
                {[
                  "نمایش آثار و نمونه کارها",
                  "لینک به شبکه‌های اجتماعی مختلف",
                  "فروش محصولات و خدمات شخصی",
                  "دریافت حمایت مالی از مخاطبان",
                  "نمایش رزومه و مهارت‌ها",
                  "برقراری ارتباط مستقیم با مخاطبان",
                  "نمایش پروژه‌های در حال انجام",
                  "امکان دریافت بازخورد از مخاطبان",
                ].map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-end gap-2"
                  >
                    <span className="h-2 w-2 rounded-full bg-[hsl(var(--primary))]"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Image Content */}
            <div className="flex justify-center lg:w-1/2">
              <div className="relative w-full max-w-lg">
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--secondary))] opacity-20 blur-lg"></div>
                <div className="relative rounded-2xl border border-white/20 bg-white/80 p-8 shadow-lg backdrop-blur-sm">
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      {
                        icon: (
                          <FiMusic
                            className="text-[hsl(var(--primary))]"
                            size={24}
                          />
                        ),
                        label: "آثار هنری",
                      },
                      {
                        icon: (
                          <FiYoutube
                            className="text-[hsl(var(--primary))]"
                            size={24}
                          />
                        ),
                        label: "کانال یوتیوب",
                      },
                      {
                        icon: (
                          <FiHeart
                            className="text-[hsl(var(--primary))]"
                            size={24}
                          />
                        ),
                        label: "حمایت مالی",
                      },
                      {
                        icon: (
                          <FiShoppingBag
                            className="text-[hsl(var(--primary))]"
                            size={24}
                          />
                        ),
                        label: "فروشگاه من",
                      },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex h-full flex-col items-center justify-center gap-2 rounded-lg border border-white/20 bg-[hsl(var(--secondaryBg))] p-4"
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
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="bg-white py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-[hsl(var(--text))] md:text-4xl">
            نظرات <span className="text-[hsl(var(--primary))]">مشتریان ما</span>
          </h2>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "شرکت نوآوران",
                role: "استارتاپ فناوری",
                text: "صفحه لینک ما تبدیل به ویترین دیجیتال کسب‌وکارمان شده است. مشتریان به راحتی به تمام بخش‌های مورد نظرشان دسترسی پیدا می‌کنند.",
                avatar: "🏢",
              },
              {
                name: "نازنین محمدی",
                role: "هنرمند دیجیتال",
                text: "بهترین راه برای نمایش آثارم به مشتریان بین‌المللی. طراحی زیبا و امکانات کامل دقیقاً همان چیزی بود که نیاز داشتم.",
                avatar: "🎨",
              },
              {
                name: "علی رضایی",
                role: "مشاور بازاریابی",
                text: "برای معرفی خدماتم به مشتریان جدید عالی است. آنالیتیکس پیشرفته به من کمک می‌کند بفهمم کدام لینک‌ها بیشترین بازدید را دارند.",
                avatar: "📊",
              },
              {
                name: "مریم حسینی",
                role: "طراح گرافیک",
                text: "استفاده از لینک‌پلاس باعث شده است که مشتریانم به راحتی به نمونه کارهایم دسترسی داشته باشند.",
                avatar: "🌟",
              },
              {
                name: "تیم استارتاپی",
                role: "استارتاپ فناوری",
                text: "لینک‌پلاس به ما کمک کرده است که خدماتمان را به صورت حرفه‌ای به مشتریان ارائه دهیم.",
                avatar: "🚀",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="rounded-xl border border-white/30 bg-[hsl(var(--secondaryBg))]/80 p-8 shadow-sm backdrop-blur-sm"
              >
                <div className="mb-4 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[hsl(var(--primary)/0.1)] text-2xl">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-bold text-[hsl(var(--text))]">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-[hsl(var(--textLight))]">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                <p className="text-[hsl(var(--text))]">{testimonial.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-[hsl(var(--primary)/0.8)] to-[hsl(var(--secondary)/0.8)] py-20 backdrop-blur-md">
        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto max-w-4xl rounded-3xl border border-white/30 bg-white/20 p-12 backdrop-blur-lg">
            <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
              آماده ساخت صفحه لینک خود هستید؟
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-xl text-white/90">
              همین حالا ثبت‌نام کنید و در کمتر از ۲ دقیقه صفحه لینک حرفه‌ای خود
              را بسازید
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <LoginButton asChild>
                <button className="rounded-lg bg-white px-8 py-4 text-lg font-bold text-[hsl(var(--primary))] transition-all hover:bg-gray-100">
                  شروع رایگان
                </button>
              </LoginButton>
              <button className="rounded-lg border-2 border-white bg-transparent px-8 py-4 text-lg font-bold text-white transition-all hover:bg-white/10">
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
                className="text-[hsl(var(--textLight))] transition hover:text-[hsl(var(--primary))]"
              >
                قوانین
              </a>
              <a
                href="#"
                className="text-[hsl(var(--textLight))] transition hover:text-[hsl(var(--primary))]"
              ></a>
              <a
                href="#"
                className="text-[hsl(var(--textLight))] transition hover:text-[hsl(var(--primary))]"
              >
                تماس با ما
              </a>
              <a
                href="#"
                className="text-[hsl(var(--textLight))] transition hover:text-[hsl(var(--primary))]"
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
