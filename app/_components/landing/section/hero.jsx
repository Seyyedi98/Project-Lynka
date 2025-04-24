import { FiArrowRight, FiLink, FiSmile, FiZap } from "react-icons/fi";
import { LoginButton } from "../../auth/login-button";

const LandingPageHero = () => {
  return (
    <section className="bg-white py-20 pt-32">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-8">
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-right">
            <h1 className="text-4xl font-bold leading-tight text-gray-900 md:text-5xl lg:text-6xl">
              <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                لینک‌های هوشمند
              </span>{" "}
              برای کسب‌وکار شما
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 md:text-xl">
              تمام لینک‌های مهم خود را در یک صفحه مدرن و بهینه جمع‌آوری کنید و
              تجربه‌ای حرفه‌ای برای مخاطبان خود ایجاد نمایید
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
              <LoginButton asChild>
                <button className="flex items-center gap-2 rounded-full bg-blue-600 px-8 py-3.5 text-lg font-semibold text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-blue-700 hover:shadow-blue-500/30">
                  <FiZap className="shrink-0" />
                  شروع رایگان
                </button>
              </LoginButton>
              <button className="flex items-center gap-2 rounded-full border border-gray-300 bg-white px-8 py-3.5 text-lg font-semibold text-gray-800 transition-all hover:border-blue-400 hover:text-blue-600">
                <FiSmile className="shrink-0" />
                مشاهده دمو
              </button>
            </div>

            <div className="mt-12 flex flex-wrap items-center justify-center gap-4 text-sm lg:justify-start">
              <div className="flex items-center gap-3 rounded-full bg-gray-50 px-4 py-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((item) => (
                    <div
                      key={item}
                      className="h-8 w-8 rounded-full border-2 border-white bg-gray-200"
                    />
                  ))}
                </div>
                <span className="text-gray-600">+100 کسب‌وکار فعال</span>
              </div>

              <div className="flex items-center gap-2 rounded-full bg-gray-50 px-4 py-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100">
                  <svg
                    className="h-3 w-3 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="text-gray-600">راه‌حل مورد اعتماد</span>
              </div>
            </div>
          </div>

          {/* Preview Card */}
          <div className="flex-1">
            <div className="relative mx-auto max-w-md">
              <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl">
                <div className="flex h-12 items-center border-b border-gray-200 px-4">
                  <div className="flex gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  </div>
                </div>
                <div className="flex h-48 items-center justify-center bg-gray-50">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 text-3xl text-blue-500">
                    👔
                  </div>
                </div>
                <div className="space-y-3 p-6">
                  {[
                    "وبسایت رسمی",
                    "شبکه‌های اجتماعی",
                    "محصولات و خدمات",
                    "تماس با ما",
                  ].map((link, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-3 transition-all hover:border-blue-300 hover:shadow-sm"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-500">
                        <FiLink size={16} />
                      </div>
                      <span className="text-sm font-medium text-gray-800">
                        {link}
                      </span>
                      <FiArrowRight className="mr-auto text-gray-400" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingPageHero;
