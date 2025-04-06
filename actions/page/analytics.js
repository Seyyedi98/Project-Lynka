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

export async function getLinkAnalytics(pageUri, dateRange = "all") {
  try {
    const dateFilters = {
      today: new Date(new Date().setHours(0, 0, 0, 0)),
      lastweek: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      lastmonth: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      last3month: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
      last6month: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000),
      lastyear: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000),
      all: undefined,
    };

    const whereClause = {
      pageUri,
      ...(dateRange !== "all" && {
        clickedAt: {
          gte: dateFilters[dateRange],
        },
      }),
    };

    return await prisma.linkView.findMany({
      where: whereClause,
      orderBy: {
        clickedAt: "desc",
      },
    });
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
