import React from "react";
import {
  FiLayers,
  FiSmartphone,
  FiShield,
  FiPieChart,
  FiZap,
  FiGlobe,
  FiUsers,
  FiSettings,
  FiLock,
} from "react-icons/fi";

const LandingPageFeatures = () => {
  const features = [
    {
      icon: <FiLayers className="h-8 w-8" />,
      title: "امکانات",
      description: "با بیشتر از ۱۵ ابزار، صفحه‌تو هرجور که دوست داری بچین!",
    },
    {
      icon: <FiSmartphone className="h-8 w-8" />,
      title: "متن",
      description: "با یه ظاهر جذاب، نوشته‌هاتو به دل مخاطب بشون!",
    },
    {
      icon: <FiShield className="h-8 w-8" />,
      title: "لینک",
      description:
        "از محصول و تخفیف گرفته تا پیام‌رسان و شبکه اجتماعی، هر چی لینک داری اینجا بذار!",
    },
    {
      icon: <FiPieChart className="h-8 w-8" />,
      title: "صفحات",
      description:
        "اگه یه صفحه برات کمه، چندتا صفحه دیگه بساز و راحت به همدیگه وصلشون کن!",
    },
    {
      icon: <FiLock className="h-8 w-8" />,
      title: "لینک رمزدار",
      description: "روی لینکات رمز بذار و فقط افراد خاص بهش دسترسی داشته باشن!",
    },
    {
      icon: <FiGlobe className="h-8 w-8" />,
      title: "فرم",
      description:
        "یه فرم ساده یا حرفه‌ای بساز و اطلاعات موردنیازت رو از کاربرات جمع کن!",
    },
    {
      icon: <FiUsers className="h-8 w-8" />,
      title: "شبکه‌های اجتماعی",
      description:
        "با لینک‌های هوشمند، کاری کن کاربرات با یه کلیک شبکه‌های اجتماعیت رو پیدا کنن!",
    },
    {
      icon: <FiSettings className="h-8 w-8" />,
      title: "قرعه‌کشی",
      description: "با قرعه‌کشی‌های جذاب، مخاطبای بیشتری جذب کن!",
    },
  ];

  return (
    <section className="py-16" style={{ backgroundColor: "#f8fafc" }}>
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <div className="relative inline-block">
            <h2 className="text-text-title mb-4 text-4xl font-bold">
              ویژگی‌های منحصر به فرد
            </h2>
            <div className="bg-text-title mx-auto mt-6 h-1 w-1/2 rounded-full"></div>
          </div>
          <p className="mt-8 text-lg font-medium text-primary">
            تمام آنچه برای رشد کسب‌وکار آنلاین خود نیاز دارید
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4 lg:grid-cols-6">
          {/* First row - 3 blocks (2 cols each) */}
          {features.slice(0, 3).map((feature, index) => (
            <div
              key={index}
              className="col-span-2 flex flex-col items-center justify-center rounded-xl p-8 text-center shadow-sm transition-all hover:shadow-md"
              style={{ backgroundColor: "#ffffff" }}
            >
              <div
                className="mb-4 rounded-full p-4"
                style={{ backgroundColor: "#e0f2fe", color: "#0284c7" }}
              >
                {feature.icon}
              </div>
              <h3
                className="text-xl font-semibold"
                style={{ color: "#1e293b" }}
              >
                {feature.title}
              </h3>
              <p className="mt-2" style={{ color: "#64748b" }}>
                {feature.description}
              </p>
            </div>
          ))}

          {/* Second row - 2 blocks (3 cols each on lg) */}
          {features.slice(3, 5).map((feature, index) => (
            <div
              key={index + 3}
              className="col-span-2 flex flex-col items-center justify-center rounded-xl p-8 text-center shadow-sm transition-all hover:shadow-md lg:col-span-3"
              style={{ backgroundColor: "#ffffff" }}
            >
              <div
                className="mb-4 rounded-full p-4"
                style={{ backgroundColor: "#e0f2fe", color: "#0284c7" }}
              >
                {feature.icon}
              </div>
              <h3
                className="text-xl font-semibold"
                style={{ color: "#1e293b" }}
              >
                {feature.title}
              </h3>
              <p className="mt-2" style={{ color: "#64748b" }}>
                {feature.description}
              </p>
            </div>
          ))}

          {/* Third row - 3 blocks (2 cols each) */}
          {features.slice(5, 8).map((feature, index) => (
            <div
              key={index + 5}
              className="col-span-2 flex flex-col items-center justify-center rounded-xl p-8 text-center shadow-sm transition-all hover:shadow-md"
              style={{ backgroundColor: "#ffffff" }}
            >
              <div
                className="mb-4 rounded-full p-4"
                style={{ backgroundColor: "#e0f2fe", color: "#0284c7" }}
              >
                {feature.icon}
              </div>
              <h3
                className="text-xl font-semibold"
                style={{ color: "#1e293b" }}
              >
                {feature.title}
              </h3>
              <p className="mt-2" style={{ color: "#64748b" }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LandingPageFeatures;
