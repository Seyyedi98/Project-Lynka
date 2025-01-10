"use server";

import { currentUser } from "../auth/get-user";
import prisma from "../client";

export const getPageDataByUri = async (uri) => {
  const user = currentUser();
  if (!user) return;

  const page = await prisma.page.findUnique({
    where: {
      uri,
    },
  });

  if (!page) return { error: "You need to signed in to create Page" };
  if (page.owner !== user.id) return { error: "Unauthorized access" };

  return page;
};

export async function UpdatePageContent(uri, jsonContent) {
  const user = await currentUser();
  if (!user) {
    return { error: "User not found" };
  }

  return await prisma.page.update({
    where: {
      owner: user.id,
      uri,
    },
    data: {
      content: jsonContent,
    },
  });
}
