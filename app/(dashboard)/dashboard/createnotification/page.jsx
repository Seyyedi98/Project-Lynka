import { createNotification } from "@/actions/notifications";
import React from "react";

const page = async () => {
  const userId = "cm7wy4msn0000q80k58wgkqg3";
  await createNotification(userId, {
    type: "system",
    title: "New message",
    body: "You have received a new message",
    actionUrl: "/messages",
    actionText: "view ideas",
  });

  return <div>page</div>;
};

export default page;
