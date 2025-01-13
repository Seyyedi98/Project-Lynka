"use server";

import { PageUriSchema } from "@/schemas";
import { currentUser } from "../auth/get-user";
import prisma from "../client";

export const checkPageAvailable = async (uri) => {
  const page = await prisma.page.findFirst({
    where: {
      uri,
    },
  });

  if (page) return false;
  return true;
};

export const newPageCreator = async (uri) => {
  const user = currentUser();
  if (!user) return { error: "شما به این بخش دسترسی ندارید" };

  const validationResult = PageUriSchema.safeParse(uri);

  if (validationResult) {
    const page = await prisma.page.create({
      data: {
        uri,
        owner: (await user).id,
        content: "[]",
      },
    });
    return page;
  }
  return { message: "error " };
};

export const getUserPages = async () => {
  const user = await currentUser();
  if (!user) return;

  const userId = user.id;

  const pages = await prisma.page.findMany({
    where: { owner: userId },
  });

  return pages;
};

export const getPageDataByUri = async (uri) => {
  const user = await currentUser();
  if (!user) return;

  const page = await prisma.page.findUnique({
    where: {
      uri,
    },
  });

  if (!page) return { error: "Page not found!" };
  if (page.owner !== user.id) return { error: "Unauthorized access" };

  return page;
};

export async function UpdatePageContent(uri, jsonContent) {
  const user = await currentUser();
  if (!user) {
    return { error: "You need to signed in to create Page" };
  }

  const page = await prisma.page.findUnique({
    where: {
      uri,
    },
  });
  if (page.owner !== user.id) return { error: "Unauthorized access" };

  await prisma.page.update({
    where: {
      owner: user.id,
      uri,
    },
    data: {
      content: jsonContent,
    },
  });

  return { success: "Page content has been updated" };
}
