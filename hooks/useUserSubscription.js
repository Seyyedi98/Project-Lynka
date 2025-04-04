"use client";

import {
  getSubscriptionDataByUri,
  updatesubscriptionPlan,
} from "@/actions/auth/subscription";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export const useUserSubscription = () => {
  const session = useSession();
  if (!session) return;

  const subscriptionPlan = session.data?.user?.subscriptionPlan;
  const subscriptionExpire = session.data?.user?.subscriptionExpire;
  let isPremium;

  const todayDate = new Date();
  const expiresDate = new Date(subscriptionExpire);

  const subscriptionDaysLeft =
    expiresDate - todayDate > 0
      ? Math.ceil((expiresDate - todayDate) / (1000 * 60 * 60 * 24))
      : 0;

  // useEffect(() => {
  //   const updateTier = async () => {
  //     if (subscriptionDaysLeft === 0) {
  //       await updatesubscriptionPlan("bronze");
  //     }
  //   };
  //   updateTier();
  // }, [subscriptionDaysLeft]);

  if (subscriptionPlan === "silver" && subscriptionDaysLeft > 0) {
    isPremium = true;
  } 

  return { subscriptionPlan, subscriptionDaysLeft, isPremium };
};

export const useSubscriptionByUri = (uri) => {
  const [subscriptionData, setSubscriptionData] = useState({});
  const [isPremium, setisPremium] = useState(false);

  useEffect(() => {
    const getSubscriptionData = async () => {
      const { subscriptionPlan, subscriptionExpire } =
        await getSubscriptionDataByUri(uri);
      setSubscriptionData({ subscriptionPlan, subscriptionExpire });
    };
    if (uri) {
      getSubscriptionData();
    }
  }, [uri]);

  useEffect(() => {
    if (
      subscriptionData.subscriptionPlan &&
      subscriptionData.subscriptionExpire
    ) {
      const todayDate = new Date();
      const expiresDate = new Date(subscriptionData.subscriptionExpire);

      const subscriptionDaysLeft =
        expiresDate - todayDate > 0
          ? Math.ceil((expiresDate - todayDate) / (1000 * 60 * 60 * 24))
          : 0;

      if (
        subscriptionData.subscriptionPlan === "silver" &&
        subscriptionDaysLeft > 0
      ) {
        setisPremium(true);
      } else {
        setisPremium(false);
      }
    }
  }, [subscriptionData]);

  return { subscriptionData, setSubscriptionData, isPremium };
};
