"use server";
import prisma from "@/lib/client";

export async function trackClick(props) {
  const { pageUri, elementId, elementName } = props;

  try {
    await prisma.linkView.create({
      data: {
        pageUri,
        elementId,
        elementName,
      },
    });
  } catch (error) {
    console.error("Error tracking click:", error);
  }
}

export async function getLinkAnalytics(pageUri) {
  try {
    const analytics = await prisma.linkView.findMany({
      where: {
        pageUri,
      },
      orderBy: {
        clickedAt: "desc",
      },
    });
    return analytics;
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return [];
  }
}

export async function getPageAnalytics(uri) {
  const pageAnalytics = prisma.linkView.findMany({
    where: { pageUri: uri },
  });

  return pageAnalytics;
}
