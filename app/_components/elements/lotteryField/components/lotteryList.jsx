import { getUserLotteries } from "@/actions/lottery/lottery";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckIcon, ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";

const LotteryList = ({ form }) => {
  const [loading, setLoading] = useState(true);
  const [lotteries, setLotteries] = useState([]);
  const [activeLotteryId, setActiveLotteryId] = useState(null);

  const fetchLotteries = async () => {
    try {
      setLoading(true);
      const data = await getUserLotteries();
      setLotteries(data);

      const activeLottery = activeLotteryId
        ? activeLotteryId
        : data.find((lottery) => lottery.isActive);
      if (activeLottery) {
        // setActiveLotteryId(activeLottery.id);
        // form.setValue("lotteryId", activeLottery.id);
      } else if (data.length > 0) {
        // Default to first lottery
        form.setValue("lotteryId", data[0].id);
      }

      setLoading(false);
    } catch (error) {
      console.error("خطا در دریافت قرعه کشی‌ها:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLotteries();
  }, []);

  const handleManageLottery = () => {
    window.open("/dashboard/lottery", "_blank");
  };

  if (loading) {
    return (
      <div className="rounded-lg p-4">
        <p className="text-white">در حال بارگذاری...</p>
      </div>
    );
  }

  if (lotteries.length === 0) {
    return (
      <div className="rounded-lg p-4">
        <p className="mb-2 text-white">
          هیچ قرعه کشی موجود نیست. برای شروع یک قرعه کشی جدید ایجاد کنید
        </p>
        <p
          onClick={handleManageLottery}
          className="mt-2 flex cursor-pointer justify-start gap-0 font-medium text-primary transition-all duration-300 hover:gap-1"
        >
          ایجاد قرعه کشی جدید
          <span>
            <ChevronLeft className="h-5 w-5 pt-1" />
          </span>
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="lotteryId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>انتخاب قرعه کشی</FormLabel>
            <Select
              onValueChange={(value) => {
                field.onChange(value);
                setActiveLotteryId(value);
              }}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="انتخاب قرعه کشی" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {lotteries.map((lottery) => (
                  <SelectItem key={lottery.id} value={lottery.id}>
                    <div className="flex items-center gap-2">
                      {lottery.name}

                      {lottery.endedAt && (
                        <span className="text-xs text-muted-foreground">
                          (پایان یافته)
                        </span>
                      )}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="rounded-lg p-4">
        {activeLotteryId && (
          <p className="mb-2 text-sm text-white">
            {activeLotteryId === form.watch("lotteryId") &&
            lotteries.find((l) => l.id === form.watch("lotteryId"))?.isActive
              ? "قرعه کشی انتخاب شده در حال حاضر فعال است"
              : "قرعه کشی انتخاب شده پایان یافته و لیست برندگان قرعه کشی به کاربران نمایش داده خواهد شد."}
          </p>
        )}

        <p
          onClick={handleManageLottery}
          className="mt-3 flex cursor-pointer justify-start gap-0 font-medium text-primary transition-all duration-300 hover:gap-1"
        >
          مدیریت قرعه کشی‌ها
          <span>
            <ChevronLeft className="h-5 w-5 pt-1" />
          </span>
        </p>
      </div>
    </div>
  );
};

export default LotteryList;
