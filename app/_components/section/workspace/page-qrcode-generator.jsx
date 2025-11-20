import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { QrCode } from "react-qrcode-pretty";
import { Download, Sparkles, Copy, Check, RefreshCw } from "lucide-react";
import { toPng } from "html-to-image";

const variantOptions = [
  "standard",
  "rounded",
  "dots",
  "fluid",
  "reverse",
  "shower",
  "gravity",
  "morse",
];

const variantTranslations = {
  standard: "استاندارد",
  rounded: "گرد",
  dots: "نقطه‌ای",
  fluid: "سیال",
  reverse: "معکوس",
  shower: "بارانی",
  gravity: "گرانشی",
  morse: "مورس",
};

const presetThemes = [
  {
    name: "پیش‌فرض",
    eyesColor: "#6366F1",
    bodyColor: "#10B981",
    bgColor: "#F8FAFC",
  },
  {
    name: "تاریک",
    eyesColor: "#8B5CF6",
    bodyColor: "#06B6D4",
    bgColor: "#1F2937",
  },
  {
    name: "گرم",
    eyesColor: "#F59E0B",
    bodyColor: "#DC2626",
    bgColor: "#FEF3C7",
  },
  {
    name: "خنک",
    eyesColor: "#3B82F6",
    bodyColor: "#06B6D4",
    bgColor: "#ECFDF5",
  },
];

const PageQrCodeGenerator = ({ target }) => {
  const { uri } = useParams();
  const [eyesVariant, setEyesVariant] = useState("fluid");
  const [bodyVariant, setBodyVariant] = useState("fluid");
  const [eyesColor, setEyesColor] = useState("#6366F1");
  const [bodyColor, setBodyColor] = useState("#10B981");
  const [bgColor, setBgColor] = useState("#F8FAFC");
  const [displaySize, setDisplaySize] = useState(250);
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const value = `${process.env.NEXT_PUBLIC_WEBSITE_URL}${uri || target}`;
  const qrCodeRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      const maxSize = 350;
      const screenWidth = window.innerWidth;

      const calculatedSize = Math.min(
        screenWidth < 768 ? screenWidth * 0.7 : maxSize,
        maxSize,
      );

      setDisplaySize(Math.floor(calculatedSize));
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleDownload = () => {
    if (qrCodeRef.current) {
      setIsLoading(true);
      const originalTransform = qrCodeRef.current.parentElement.style.transform;
      qrCodeRef.current.parentElement.style.transform = "none";

      toPng(qrCodeRef.current, {
        cacheBust: true,
        backgroundColor: bgColor,
        quality: 1,
        width: 1080,
        height: 1080,
        style: {
          margin: "0",
          padding: "0",
        },
      })
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.download = "qrcode.png";
          link.href = dataUrl;
          link.click();
          qrCodeRef.current.parentElement.style.transform = originalTransform;
          setIsLoading(false);
        })
        .catch((err) => {
          console.error(err);
          qrCodeRef.current.parentElement.style.transform = originalTransform;
          setIsLoading(false);
        });
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  const applyPreset = (preset) => {
    setEyesColor(preset.eyesColor);
    setBodyColor(preset.bodyColor);
    setBgColor(preset.bgColor);
  };

  const resetToDefault = () => {
    setEyesVariant("fluid");
    setBodyVariant("fluid");
    setEyesColor("#6366F1");
    setBodyColor("#10B981");
    setBgColor("#F8FAFC");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-secondary/10 p-4 md:p-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold text-text md:text-4xl">
            تولیدکننده QR code
            <Sparkles className="ml-2 mr-1 inline h-6 w-6 text-yellow-500 md:h-8 md:w-8" />
          </h1>
          <p className="text-textLight mx-auto max-w-2xl text-sm md:text-base">
            QR code خود را با استایل‌ها و رنگ‌های مختلف شخصی‌سازی کنید
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Settings Panel */}
          <Card className="border-border/50 lg:col-span-1">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center justify-between text-lg text-text md:text-xl">
                <span>تنظیمات سفارشی</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetToDefault}
                  className="h-8 text-xs"
                >
                  <RefreshCw className="ml-1 h-3 w-3" />
                  بازنشانی
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Theme Presets */}
              <div className="space-y-3">
                <Label className="text-sm font-medium text-text">
                  تم‌های آماده
                </Label>
                <div className="grid grid-cols-2 gap-2">
                  {presetThemes.map((preset, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => applyPreset(preset)}
                      className="h-10 text-xs"
                      style={{
                        background: `linear-gradient(135deg, ${preset.bgColor} 0%, ${preset.bodyColor}20 100%)`,
                        borderColor: preset.bodyColor,
                      }}
                    >
                      {preset.name}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Variants */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-text">
                    سبک چشم‌ها
                  </Label>
                  <Select value={eyesVariant} onValueChange={setEyesVariant}>
                    <SelectTrigger className="w-full border-border text-sm hover:border-primary/80">
                      <SelectValue placeholder="سبک چشم‌ها را انتخاب کنید" />
                    </SelectTrigger>
                    <SelectContent className="max-h-60 border-border bg-card">
                      {variantOptions.map((option) => (
                        <SelectItem
                          key={`eyes-${option}`}
                          value={option}
                          className="text-sm hover:bg-primary/10"
                        >
                          {variantTranslations[option]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-text">
                    سبک بدنه
                  </Label>
                  <Select value={bodyVariant} onValueChange={setBodyVariant}>
                    <SelectTrigger className="w-full border-border text-sm hover:border-primary/80">
                      <SelectValue placeholder="سبک بدنه را انتخاب کنید" />
                    </SelectTrigger>
                    <SelectContent className="max-h-60 border-border bg-card">
                      {variantOptions.map((option) => (
                        <SelectItem
                          key={`body-${option}`}
                          value={option}
                          className="text-sm hover:bg-primary/10"
                        >
                          {variantTranslations[option]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Colors */}
              <div className="space-y-4">
                <Label className="text-sm font-medium text-text">رنگ‌ها</Label>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label className="text-xs text-text">چشم‌ها</Label>
                    <Input
                      value={eyesColor}
                      onChange={(e) => setEyesColor(e.target.value)}
                      className="h-10 w-full cursor-pointer rounded-lg border-border p-1 hover:border-primary/80"
                      type="color"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs text-text">بدنه</Label>
                    <Input
                      value={bodyColor}
                      onChange={(e) => setBodyColor(e.target.value)}
                      className="h-10 w-full cursor-pointer rounded-lg border-border p-1 hover:border-primary/80"
                      type="color"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs text-text">پس‌زمینه</Label>
                    <Input
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="h-10 w-full cursor-pointer rounded-lg border-border p-1 hover:border-primary/80"
                      type="color"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Preview Panel */}
          <div className="lg:col-span-2">
            <Card className="h-full border-border/50">
              <CardHeader>
                <CardTitle className="text-lg text-text md:text-xl">
                  پیش‌نمایش QR code
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center p-4 md:p-8">
                <div
                  style={{
                    width: `${displaySize}px`,
                    height: `${displaySize}px`,
                    transform: `scale(${displaySize / 1000})`,
                    transformOrigin: "center center",
                  }}
                  className="flex items-center justify-center"
                >
                  <div
                    ref={qrCodeRef}
                    className="hover:shadow-3xl m-0 rounded-2xl p-0 shadow-2xl transition-all duration-300"
                    style={{
                      backgroundColor: bgColor,
                      padding: "20px",
                    }}
                  >
                    <QrCode
                      value={value}
                      variant={{
                        eyes: eyesVariant,
                        body: bodyVariant,
                      }}
                      color={{
                        eyes: eyesColor,
                        body: bodyColor,
                      }}
                      padding={20}
                      margin={20}
                      bgColor={bgColor}
                      bgRounded
                      divider
                      size={1000}
                    />
                  </div>
                </div>

                <div className="mt-8 flex w-full max-w-md flex-col gap-4">
                  <Button
                    onClick={handleDownload}
                    disabled={isLoading}
                    className="text-text-foreground w-full bg-gradient-to-r from-primary to-secondary py-6 text-base font-medium shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] hover:from-primary/90 hover:to-secondary/90 disabled:opacity-50"
                    size="lg"
                  >
                    {isLoading ? (
                      <RefreshCw className="ml-2 h-5 w-5 animate-spin" />
                    ) : (
                      <Download className="ml-2 h-5 w-5" />
                    )}
                    دانلود QR code
                  </Button>

                  <div className="rounded-xl bg-card p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <p className="text-sm font-medium text-text">
                        آدرس مقصد:
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={copyToClipboard}
                        className="h-8 text-xs"
                      >
                        {isCopied ? (
                          <Check className="ml-1 h-3 w-3 text-green-500" />
                        ) : (
                          <Copy className="ml-1 h-3 w-3" />
                        )}
                        {isCopied ? "کپی شد!" : "کپی"}
                      </Button>
                    </div>
                    <p className="text-textLight break-all font-mono text-xs leading-relaxed">
                      {value}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageQrCodeGenerator;
