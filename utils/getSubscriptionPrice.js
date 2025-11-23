import { PLANS } from "@/data/prices";

export default function getSubscriptionPrice(plan, duration) {
  const prices = {
    silver: PLANS.find((p) => p.id === plan),
  };
  const MonthlyPrice = prices[plan].price_1;
  const threeMonths = prices[plan].price_3;
  const sixMonths = prices[plan].price_6;

  switch (duration) {
    case 1:
      return MonthlyPrice;
    case 3:
      return threeMonths;
    case 6:
      return sixMonths;
    default:
      return MonthlyPrice * 999999999999;
  }
}
