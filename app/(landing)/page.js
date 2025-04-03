"use client";

import { Button } from "@/components/ui/button";
import { LoginButton } from "../_components/auth/login-button";
import {
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
} from "react-icons/fi";

export default function Page() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "hsl(var(--background))",
        fontFamily: "var(--font-yekan)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <header
        style={{
          padding: "1rem",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "hsla(var(--background)/0.9)",
          backdropFilter: "blur(10px)",
        }}
      >
        <div
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            color: "hsl(var(--primary))",
          }}
        >
          لینک‌بای
        </div>
        <LoginButton asChild>
          <Button
            style={{
              backgroundColor: "hsl(var(--primary))",
              color: "white",
              padding: "0.5rem 1.5rem",
              borderRadius: "0.5rem",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <FiZap /> شروع کنید
          </Button>
        </LoginButton>
      </header>

      {/* Hero Section */}
      <section
        style={{
          padding: "8rem 1rem 5rem",
          position: "relative",
          background:
            "linear-gradient(135deg, hsla(var(--primary)/0.1), hsla(var(--secondary)/0.1))",
        }}
      >
        {/* Kawaii Stickers */}
        <div
          style={{
            position: "absolute",
            top: "100px",
            left: "5%",
            fontSize: "2.5rem",
            color: "#fbbf24",
            animation: "float 4s ease-in-out infinite",
          }}
        >
          <FiStar />
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "80px",
            right: "10%",
            fontSize: "3rem",
            color: "#f472b6",
            animation: "float 5s ease-in-out infinite 0.5s",
          }}
        >
          <FiHeart />
        </div>

        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "3rem",
          }}
        >
          <div
            style={{
              textAlign: "center",
              maxWidth: "800px",
            }}
          >
            <h1
              style={{
                fontSize: "3rem",
                fontWeight: "bold",
                color: "hsl(var(--text))",
                marginBottom: "1.5rem",
                lineHeight: "1.2",
              }}
            >
              صفحه لینک{" "}
              <span style={{ color: "hsl(var(--primary))" }}>جذاب</span> خودت رو
              بساز!
            </h1>

            <p
              style={{
                fontSize: "1.5rem",
                color: "hsl(var(--textLight))",
                marginBottom: "2rem",
                opacity: "0.9",
              }}
            >
              همه لینک‌های مهم خود را در یک صفحه زیبا جمع کنید و با استیکرهای
              بامزه شخصی‌سازی کنید
            </p>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "1rem",
                flexWrap: "wrap",
              }}
            >
              <LoginButton asChild>
                <Button
                  style={{
                    backgroundColor: "hsl(var(--primary))",
                    color: "white",
                    padding: "1rem 2rem",
                    fontSize: "1.125rem",
                    fontWeight: "bold",
                    borderRadius: "0.5rem",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    transition: "all 0.2s",
                    minWidth: "200px",
                  }}
                >
                  <FiZap /> شروع رایگان
                </Button>
              </LoginButton>

              <Button
                style={{
                  backgroundColor: "transparent",
                  color: "hsl(var(--primary))",
                  padding: "1rem 2rem",
                  fontSize: "1.125rem",
                  fontWeight: "bold",
                  borderRadius: "0.5rem",
                  border: "2px solid hsl(var(--primary))",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  transition: "all 0.2s",
                  minWidth: "200px",
                }}
              >
                <FiSmile /> نمونه صفحات
              </Button>
            </div>
          </div>

          {/* Preview Card */}
          <div
            style={{
              width: "100%",
              maxWidth: "420px",
              backgroundColor: "white",
              borderRadius: "1.5rem",
              overflow: "hidden",
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
              border: "2px solid hsl(var(--primary)/0.2)",
              position: "relative",
            }}
          >
            <div
              style={{
                height: "220px",
                background:
                  "linear-gradient(45deg, hsl(var(--primary)), hsl(var(--secondary)))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
            >
              <div
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  backdropFilter: "blur(5px)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "2.5rem",
                  color: "white",
                }}
              >
                👩‍🎨
              </div>
              <div
                style={{
                  position: "absolute",
                  bottom: "1rem",
                  right: "1rem",
                  color: "white",
                  fontSize: "2rem",
                }}
              >
                <FiHeart />
              </div>
            </div>

            <div style={{ padding: "1.5rem" }}>
              {[
                "اینستاگرام من",
                "فروشگاه آنلاین",
                "آخرین ویدیوها",
                "حمایت مالی",
              ].map((link, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    padding: "1rem 1.5rem",
                    backgroundColor:
                      index % 2 === 0 ? "hsl(var(--muted))" : "white",
                    borderRadius: "0.75rem",
                    marginBottom: "0.75rem",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    border: "1px solid hsl(var(--border)/0.1)",
                  }}
                >
                  {index % 3 === 0 ? (
                    <FiHeart
                      style={{
                        color: "hsl(var(--primary))",
                        fontSize: "1.5rem",
                      }}
                    />
                  ) : index % 3 === 1 ? (
                    <FiStar
                      style={{
                        color: "hsl(var(--primary))",
                        fontSize: "1.5rem",
                      }}
                    />
                  ) : (
                    <FiSmile
                      style={{
                        color: "hsl(var(--primary))",
                        fontSize: "1.5rem",
                      }}
                    />
                  )}
                  <span
                    style={{
                      color: "hsl(var(--text))",
                      fontSize: "1.1rem",
                    }}
                  >
                    {link}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        style={{
          padding: "4rem 1rem",
          backgroundColor: "hsl(var(--secondaryBg))",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "2rem",
            textAlign: "center",
          }}
        >
          {[
            { number: "۱۰۰٬۰۰۰+", label: "کاربر فعال" },
            { number: "۵۰۰٬۰۰۰+", label: "لینک ایجاد شده" },
            { number: "۹۹٪", label: "رضایت کاربران" },
            { number: "۲۴/۷", label: "پشتیبانی" },
          ].map((stat, index) => (
            <div
              key={index}
              style={{
                padding: "1.5rem",
                borderRadius: "1rem",
                backgroundColor: "hsl(var(--card))",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div
                style={{
                  fontSize: "2.5rem",
                  fontWeight: "bold",
                  color: "hsl(var(--primary))",
                  marginBottom: "0.5rem",
                }}
              >
                {stat.number}
              </div>
              <div
                style={{
                  fontSize: "1.1rem",
                  color: "hsl(var(--textLight))",
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section
        style={{
          padding: "6rem 1rem",
          position: "relative",
        }}
      >
        {/* Kawaii Sticker */}
        <div
          style={{
            position: "absolute",
            top: "100px",
            right: "10%",
            fontSize: "3rem",
            color: "#f472b6",
            animation: "float 6s ease-in-out infinite 1s",
          }}
        >
          <FiHeart />
        </div>

        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              textAlign: "center",
              marginBottom: "4rem",
            }}
          >
            <h2
              style={{
                fontSize: "2.5rem",
                fontWeight: "bold",
                color: "hsl(var(--text))",
                marginBottom: "1rem",
              }}
            >
              امکانات <span style={{ color: "hsl(var(--primary))" }}>ویژه</span>
            </h2>
            <p
              style={{
                fontSize: "1.25rem",
                color: "hsl(var(--textLight))",
                maxWidth: "700px",
                margin: "0 auto",
              }}
            >
              هر چیزی که برای ساخت صفحه لینک زیبا نیاز دارید
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "2rem",
            }}
          >
            {[
              {
                icon: <FiLink style={{ fontSize: "2rem" }} />,
                title: "لینک‌های نامحدود",
                desc: "هر تعداد لینک که نیاز دارید بدون محدودیت اضافه کنید",
                color: "hsl(var(--primary))",
              },
              {
                icon: <FiImage style={{ fontSize: "2rem" }} />,
                title: "استیکرهای جذاب",
                desc: "صدها استیکر بامزه برای تزیین صفحه لینک شما",
                color: "#f472b6",
              },
              {
                icon: <FiTrendingUp style={{ fontSize: "2rem" }} />,
                title: "آمار دقیق",
                desc: "مشاهده تعداد کلیک‌ها و بازدیدهای هر لینک",
                color: "hsl(var(--secondary))",
              },
              {
                icon: <FiUsers style={{ fontSize: "2rem" }} />,
                title: "پروفایل سفارشی",
                desc: "شخصی‌سازی کامل ظاهر پروفایل شما",
                color: "#8b5cf6",
              },
              {
                icon: <FiAward style={{ fontSize: "2rem" }} />,
                title: "طرح‌های ویژه",
                desc: "طرح‌های حرفه‌ای برای کاربران خاص",
                color: "#f59e0b",
              },
              {
                icon: <FiShoppingBag style={{ fontSize: "2rem" }} />,
                title: "فروشگاه آنلاین",
                desc: "لینک مستقیم به محصولات و خدمات شما",
                color: "#10b981",
              },
            ].map((feature, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: "hsl(var(--card))",
                  padding: "2rem",
                  borderRadius: "1rem",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  borderTop: `4px solid ${feature.color}`,
                  transition: "transform 0.3s",
                  ":hover": {
                    transform: "translateY(-5px)",
                  },
                }}
              >
                <div
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "1rem",
                    backgroundColor: `${feature.color}20`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: feature.color,
                    marginBottom: "1.5rem",
                  }}
                >
                  {feature.icon}
                </div>
                <h3
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    color: "hsl(var(--text))",
                    marginBottom: "0.75rem",
                  }}
                >
                  {feature.title}
                </h3>
                <p
                  style={{
                    color: "hsl(var(--textLight))",
                    lineHeight: "1.6",
                  }}
                >
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section
        style={{
          padding: "6rem 1rem",
          backgroundColor: "hsl(var(--secondaryBg))",
          position: "relative",
        }}
      >
        {/* Kawaii Sticker */}
        <div
          style={{
            position: "absolute",
            bottom: "100px",
            left: "10%",
            fontSize: "3rem",
            color: "#fbbf24",
            animation: "float 5s ease-in-out infinite 0.5s",
          }}
        >
          <FiStar />
        </div>

        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              textAlign: "center",
              marginBottom: "4rem",
            }}
          >
            <h2
              style={{
                fontSize: "2.5rem",
                fontWeight: "bold",
                color: "hsl(var(--text))",
                marginBottom: "1rem",
              }}
            >
              نظرات{" "}
              <span style={{ color: "hsl(var(--primary))" }}>کاربران</span>
            </h2>
            <p
              style={{
                fontSize: "1.25rem",
                color: "hsl(var(--textLight))",
                maxWidth: "700px",
                margin: "0 auto",
              }}
            >
              ببینید کاربران ما چه می‌گویند
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "2rem",
            }}
          >
            {[
              {
                name: "سارا محمدی",
                role: "طراح گرافیک",
                text: "صفحه لینک من واقعا عالی شده! همه لینک‌های مهمم در یک جا جمع شده و طراحی جذاب خیلی با سلیقه من سازگاره.",
                avatar: "👩‍🎨",
              },
              {
                name: "علی رضایی",
                role: "توسعه دهنده",
                text: "بهترین سرویسی که برای لینک‌های اینستاگرامم استفاده کردم. آمار دقیق و طراحی حرفه‌ای داره.",
                avatar: "👨‍💻",
              },
              {
                name: "نازنین کریمی",
                role: "بلاگر",
                text: "دکمه‌های بامزه و استیکرهای جذاب واقعا صفحه من رو خاص کرده. مشترکام خیلی پسندیدن!",
                avatar: "👩‍💻",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: "hsl(var(--card))",
                  padding: "2rem",
                  borderRadius: "1rem",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "-20px",
                    right: "20px",
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    backgroundColor: "hsl(var(--primary))",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "2rem",
                  }}
                >
                  {testimonial.avatar}
                </div>
                <p
                  style={{
                    color: "hsl(var(--text))",
                    fontStyle: "italic",
                    lineHeight: "1.8",
                    marginBottom: "1.5rem",
                  }}
                >
                  {testimonial.text}
                </p>
                <div>
                  <h4
                    style={{
                      fontWeight: "bold",
                      color: "hsl(var(--text))",
                      marginBottom: "0.25rem",
                    }}
                  >
                    {testimonial.name}
                  </h4>
                  <p
                    style={{
                      color: "hsl(var(--textLight))",
                      fontSize: "0.9rem",
                    }}
                  >
                    {testimonial.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        style={{
          padding: "8rem 1rem",
          background:
            "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))",
          textAlign: "center",
          color: "white",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Kawaii Stickers */}
        <div
          style={{
            position: "absolute",
            top: "50px",
            left: "50px",
            fontSize: "4rem",
            color: "rgba(255, 255, 255, 0.2)",
            animation: "float 6s ease-in-out infinite",
          }}
        >
          <FiStar />
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "50px",
            right: "50px",
            fontSize: "4rem",
            color: "rgba(255, 255, 255, 0.2)",
            animation: "float 7s ease-in-out infinite 1s",
          }}
        >
          <FiHeart />
        </div>

        <div
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
          }}
        >
          <h2
            style={{
              fontSize: "2.5rem",
              fontWeight: "bold",
              marginBottom: "1.5rem",
            }}
          >
            آماده ساخت صفحه لینک خود هستید؟
          </h2>
          <p
            style={{
              fontSize: "1.25rem",
              marginBottom: "2.5rem",
              opacity: "0.9",
            }}
          >
            همین حالا شروع کنید و در کمتر از ۲ دقیقه صفحه لینک زیبای خود را
            بسازید
          </p>

          <LoginButton asChild>
            <Button
              style={{
                backgroundColor: "white",
                color: "hsl(var(--primary))",
                padding: "1rem 2.5rem",
                fontSize: "1.25rem",
                fontWeight: "bold",
                borderRadius: "0.75rem",
                border: "none",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.75rem",
                transition: "all 0.2s",
                ":hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
                },
              }}
            >
              <FiZap style={{ fontSize: "1.5rem" }} /> شروع رایگان
            </Button>
          </LoginButton>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          padding: "3rem 1rem",
          backgroundColor: "hsl(var(--secondaryBg))",
          textAlign: "center",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: "hsl(var(--primary))",
              marginBottom: "1.5rem",
            }}
          >
            لینک‌بای
          </div>
          <p
            style={{
              color: "hsl(var(--textLight))",
              marginBottom: "2rem",
              maxWidth: "600px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            همه لینک‌های مهم شما در یک صفحه زیبا
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "1.5rem",
              marginBottom: "2rem",
            }}
          >
            <a
              href="#"
              style={{
                color: "hsl(var(--textLight))",
                transition: "all 0.2s",
                ":hover": {
                  color: "hsl(var(--primary))",
                },
              }}
            >
              قوانین
            </a>
            <a
              href="#"
              style={{
                color: "hsl(var(--textLight))",
                transition: "all 0.2s",
                ":hover": {
                  color: "hsl(var(--primary))",
                },
              }}
            >
              حریم خصوصی
            </a>
            <a
              href="#"
              style={{
                color: "hsl(var(--textLight))",
                transition: "all 0.2s",
                ":hover": {
                  color: "hsl(var(--primary))",
                },
              }}
            >
              تماس با ما
            </a>
          </div>
          <div
            style={{
              color: "hsl(var(--textLight))",
              fontSize: "0.9rem",
            }}
          >
            © {new Date().getFullYear()} لینک‌بای. تمام حقوق محفوظ است.
          </div>
        </div>
      </footer>

      {/* Global Styles */}
      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        @media (min-width: 768px) {
          section:first-child > div {
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            text-align: right;
          }

          section:first-child > div > div:first-child {
            width: 50%;
            max-width: none;
            text-align: right;
            padding-right: 2rem;
          }
        }
      `}</style>
    </div>
  );
}
