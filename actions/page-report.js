"use server";

import prisma from "@/lib/client";
import { getUserDataByUri } from "./user/userData";

export async function submitReport(data) {
  const { uri, reportText } = data;
  console.log(reportText);

  await prisma.pageReports.create({
    data: { uri, reportText },
  });
}

export async function getSubmitData() {
  const userData = await getUserDataByUri(uri);
}
