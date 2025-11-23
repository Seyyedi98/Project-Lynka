import { PLANS } from "@/data/prices";

export default function getSubscriptionDiscount(plan, duration) {
  const dicounts = {
    silver: PLANS.find((p) => p.id === plan),
  };
  const MonthlyDiscount = dicounts[plan].off_1;
  const threeMonths = dicounts[plan].off_3;
  const sixMonths = dicounts[plan].off_6;

  switch (duration) {
    case 1:
      return MonthlyDiscount;
    case 3:
      return threeMonths;
    case 6:
      return sixMonths;
    default:
      return MonthlyPrice * 0;
  }
}
