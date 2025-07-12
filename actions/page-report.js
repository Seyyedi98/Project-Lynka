"use server";

import prisma from "@/lib/client";
import { revalidatePath } from "next/cache";

export async function submitReport(data) {
  const { uri, reportText } = data;
  console.log(reportText);

  await prisma.pageReports.create({
    data: { uri, reportText },
  });
}

export async function DeletePageReport(id) {
  try {
    await prisma.pageReports.delete({
      where: { id },
    });
    revalidatePath("reports");
    return { success: true };
  } catch (error) {
    console.error("Error fetching user reports:", error);
    return { success: false, error: error };
  }
}

export async function getPageReports(page = 1, perPage = 12) {
  try {
    const skip = (page - 1) * perPage;

    const reports = await prisma.pageReports.findMany({
      skip,
      take: perPage,
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        uri: true,
        createdAt: true,
        reportText: true,
      },
    });

    const totalCount = await prisma.pageReports.count();
    const totalPages = Math.ceil(totalCount / perPage);

    return {
      reports,
      totalPages,
    };
  } catch (error) {
    console.error("Error fetching user reports:", error);
  }
}
