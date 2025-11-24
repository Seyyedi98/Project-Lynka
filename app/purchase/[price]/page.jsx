"use server";

import PurchaseForm from "@/app/_components/common/form/purchase-form";
import { PLANS } from "@/data/prices";
import Link from "next/link";
import { startPurchase } from "@/actions/transactions/startPurchase";
import getSubscriptionPrice from "@/utils/getSubscriptionPrice";
import { ArrowLeft, Crown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const getPrice = (plan, duration) => {
  const prices = {
    silver: PLANS.find((p) => p.id === "silver"),
  };

  const months = parseInt(duration);
  if (isNaN(months)) throw new Error("مدت زمان معتبر نیست");
  if (!prices[plan]) throw new Error("پلن انتخاب شده معتبر نیست");
  return getSubscriptionPrice("silver", Number(duration));
};

export default async function Purchase({ searchParams }) {
  const { plan, duration } = await searchParams;

  if (!plan || !duration) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10 p-4">
        <Card className="w-full max-w-md border-border/50 bg-card shadow-2xl">
          <CardContent className="p-6 text-center">
            <div className="mb-4 text-5xl text-red-500">❌</div>
            <h2 className="mb-2 text-xl font-bold text-destructive">خطا</h2>
            <p className="mb-6 text-muted-foreground">
              پلن انتخاب شده معتبر نمی باشد
            </p>
            <Link href="/dashboard/pricing">
              <Button className="w-full bg-gradient-to-r from-primary to-secondary">
                بازگشت به صفحه تعرفه‌ها
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  try {
    const price = getPrice(plan, duration);
    const planInfo = PLANS.find((p) => p.id === plan);

    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/10 to-secondary/10 p-4">
        <div className="mx-auto max-w-md pt-8">
          <Card className="border-border/50 bg-card shadow-2xl">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Crown className="h-6 w-6 text-yellow-500" />
                  <CardTitle className="text-xl font-bold text-foreground">
                    اطلاعات پرداخت
                  </CardTitle>
                </div>
                <Link href="/dashboard/pricing">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
                  >
                    <span className="text-sm">بازگشت</span>
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Purchase Form */}
              <PurchaseForm
                plan={plan}
                duration={duration}
                price={price}
                handlePurchase={startPurchase}
              />

              {/* Security Notice */}
              <div className="text-center">
                <p className="text-xs text-muted-foreground">
                  🔒 پرداخت شما توسط درگاه امن زرین‌پال انجام می‌شود
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10 p-4">
        <Card className="w-full max-w-md border-border/50 bg-card shadow-2xl">
          <CardContent className="p-6 text-center">
            <div className="mb-4 text-5xl text-destructive">⚠️</div>
            <h2 className="mb-2 text-xl font-bold text-destructive">خطا</h2>
            <p className="mb-4 text-muted-foreground">{error.message}</p>
            <p className="mb-6 text-sm text-muted-foreground">پلن نامعتبر</p>
            <Link href="/dashboard/pricing">
              <Button className="w-full bg-gradient-to-r from-primary to-secondary">
                بازگشت به صفحه تعرفه‌ها
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }
}
