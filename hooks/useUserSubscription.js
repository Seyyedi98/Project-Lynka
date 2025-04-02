"use client";

import {
  getSubscriptionDataByUri,
  updatesubscriptionPlan,
} from "@/actions/auth/subscription";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export const useUserSubscription = () => {
  const session = useSession();

  const subscriptionPlan = session.data?.user?.subscriptionPlan;
  const subscriptionExpire = session.data?.user?.subscriptionExpire;
  let isSilver;

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
    isSilver = true;
  } else {
    isSilver = false;
  }

  console.log("session:", session, "isSilver", isSilver);

  return { subscriptionPlan, subscriptionDaysLeft, isSilver };
};

export const useSubscriptionByUri = (uri) => {
  const [subscriptionData, setSubscriptionData] = useState({});
  const [isSilver, setIsSilver] = useState(false);

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
        setIsSilver(true);
      } else {
        setIsSilver(false);
      }
    }
  }, [subscriptionData]);

  return { subscriptionData, setSubscriptionData, isSilver };
};
