"use server";

import { currentUser } from "@/lib/auth/get-user";
import prisma from "@/lib/client";
import { PageUriSchema } from "@/schemas";

export const checkPageAvailable = async (uri) => {
  const page = await prisma.page.findFirst({
    where: {
      uri,
    },
  });

  return !page;
};

export const newPageCreator = async (uri) => {
  const user = currentUser();
  if (!user) return { error: "شما به این بخش دسترسی ندارید" };

  const validationResult = PageUriSchema.safeParse(uri);

  if (validationResult) {
    const page = await prisma.page.create({
      data: {
        uri: uri.toLowerCase(),
        owner: (await user).id,
        content: "[[],[]]", // Create two empty arrays. First one for page content, second one for page header
      },
    });
    return page;
  }
  return { message: "error " };
};

export const getUserPages = async () => {
  const user = await currentUser();
  if (!user) return;

  const pages = await prisma.page.findMany({
    where: { owner: user.id },
  });

  return pages;
};

export const getUserPageDataByUri = async (uri) => {
  const user = await currentUser();
  if (!user) return { error: "Unauthorized access" };

  const page = await prisma.page.findUnique({
    where: {
      uri,
    },
  });

  if (!page) return { error: "Page not found!" };
  if (page.owner !== user.id) return { error: "Unauthorized access" };

  return page;
};

// Get preview page data by URI (without user validation)
export const getPreviewPageDataByUri = async (uri) => {
  const page = await prisma.page.findUnique({
    where: {
      uri,
    },
  });

  if (!page) return { error: "Page not found!" };

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

export async function UpdatePageTheme(uri, theme) {
  const user = await currentUser();
  if (!user) {
    return { error: "You need to signed in to create Page" };
  }

  const page = await prisma.page.findUnique({
    where: {
      uri,
    },
  });
  if (page?.owner !== user.id) return { error: "Unauthorized access" };

  await prisma.page.update({
    where: { uri },
    data: {
      theme,
    },
  });

  return { success: "Page theme has been updated" };
}

export async function getPageTheme(uri) {
  const page = await prisma.page.findUnique({
    where: {
      uri,
    },
  });
  if (!page) return { error: "Page not found!" };

  return page.theme;
}
