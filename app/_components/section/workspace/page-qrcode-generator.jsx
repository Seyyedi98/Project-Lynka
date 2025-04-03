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
import { Download, Sparkles } from "lucide-react";
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

const PageQrCodeGenerator = () => {
  const { uri } = useParams();
  const [eyesVariant, setEyesVariant] = useState("fluid");
  const [bodyVariant, setBodyVariant] = useState("fluid");
  const [eyesColor, setEyesColor] = useState("#FF9BB3"); // Soft pink
  const [bodyColor, setBodyColor] = useState("#8BD3E6"); // Minty blue
  const [bgColor, setBgColor] = useState("#F8F9FA"); // Light background
  const [displaySize, setDisplaySize] = useState(250);
  const value = `${process.env.NEXT_PUBLIC_WEBSITE_URL}${uri}`;
  const qrCodeRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      const maxSize = 300;
      const screenWidth = window.innerWidth;

      const calculatedSize = Math.min(
        screenWidth < 768 ? screenWidth * 0.8 : maxSize,
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
        })
        .catch((err) => {
          console.error(err);
          qrCodeRef.current.parentElement.style.transform = originalTransform;
        });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-secondary/10 p-6">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-2 text-3xl font-bold text-text">
          تولیدکننده QR code
          <Sparkles className="ml-2 mr-1 inline h-6 w-6 text-yellow-500" />
        </h1>
        <p className="text-textLight mb-8">
          QR code خود را با استایل‌ها و رنگ‌های مختلف شخصی سازی کنید
        </p>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <Card className="border-border/50 lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-xl text-text">
                تنظیمات سفارشی
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-text">
                  سبک چشم‌ها
                </Label>
                <Select value={eyesVariant} onValueChange={setEyesVariant}>
                  <SelectTrigger className="w-full border-border hover:border-primary/80">
                    <SelectValue placeholder="سبک چشم‌ها را انتخاب کنید" />
                  </SelectTrigger>
                  <SelectContent className="border-border bg-card">
                    {variantOptions.map((option) => (
                      <SelectItem
                        key={`eyes-${option}`}
                        value={option}
                        className="hover:bg-primary/10 focus:bg-primary/10"
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
                  <SelectTrigger className="w-full border-border hover:border-primary/80">
                    <SelectValue placeholder="سبک بدنه را انتخاب کنید" />
                  </SelectTrigger>
                  <SelectContent className="border-border bg-card">
                    {variantOptions.map((option) => (
                      <SelectItem
                        key={`body-${option}`}
                        value={option}
                        className="hover:bg-primary/10 focus:bg-primary/10"
                      >
                        {variantTranslations[option]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2 space-y-2">
                <Label className="text-sm font-medium text-text">
                  رنگ چشم‌ها
                </Label>
                <div className="flex items-center gap-3">
                  <Input
                    value={eyesColor}
                    onChange={(e) => setEyesColor(e.target.value)}
                    className="h-10 w-32 cursor-pointer rounded-xl border-border p-1 hover:border-primary/80"
                    type="color"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 space-y-2">
                <Label className="text-sm font-medium text-text">
                  رنگ بدنه
                </Label>
                <div className="flex items-center gap-3">
                  <Input
                    value={bodyColor}
                    onChange={(e) => setBodyColor(e.target.value)}
                    className="h-10 w-32 cursor-pointer rounded-xl border-border p-1 hover:border-primary/80"
                    type="color"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 space-y-2">
                <Label className="text-sm font-medium text-text">
                  رنگ پس‌زمینه
                </Label>
                <div className="flex items-center gap-3">
                  <Input
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="h-10 w-32 cursor-pointer rounded-xl border-border p-1 hover:border-primary/80"
                    type="color"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mb-8 lg:col-span-2">
            <Card className="h-full border-border/50">
              <CardHeader>
                <CardTitle className="text-xl text-text">
                  پیش‌نمایش QR code
                </CardTitle>
              </CardHeader>
              <CardContent className="mb-6 flex flex-col items-center justify-center p-8">
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
                    className="m-0 rounded-2xl p-0 shadow-md transition-all hover:shadow-lg"
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

                <Button
                  onClick={handleDownload}
                  className="text-text-foreground mt-8 w-full max-w-xs bg-gradient-to-r from-primary to-secondary py-6 text-lg font-medium shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] hover:from-primary/90 hover:to-secondary/90"
                  size="lg"
                >
                  دانلود QR code
                  <Download className="mr-2 h-5 w-5" />
                </Button>

                <div className="mt-4 text-center">
                  <p className="mb-2 text-sm text-muted-foreground">
                    آدرس مقصد:
                  </p>
                  <p className="text-textLight break-all font-mono text-sm">
                    {value}
                  </p>
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
