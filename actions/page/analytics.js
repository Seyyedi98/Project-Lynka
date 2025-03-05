"use server";
import prisma from "@/lib/client";

export async function getPageAnalytics({ uri }) {
  const pageAnalytics = prisma.linkView.findMany({
    where: { uri },
  });

  return pageAnalytics;
}
