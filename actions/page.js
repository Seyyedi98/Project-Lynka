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

// TODO: remove this
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

export const getPageMetadata = async (uri) => {
  if (!uri) return { error: "Cannot get page data" };
  const metaData = await prisma.page.findUnique({
    where: {
      uri,
    },
    select: {
      metaTitle: true,
      metaDescription: true,
      favicon: true,
      metaImage: true,
    },
  });

  if (!metaData) return { error: "Page not found!" };

  return metaData;
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

export async function UpdatePageMetaTitle(uri, content) {
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
      metaTitle: content.title,
    },
  });

  return { success: "Page meta title has been updated" };
}

export async function UpdatePageMetaDescription(uri, content) {
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
      metaDescription: content.metaDescription,
    },
  });

  return { success: "Page meta title has been updated" };
}

export async function UpdatePageFavicon(uri, content) {
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
      favicon: content,
    },
  });

  return { success: "Page meta title has been updated" };
}

export async function UpdatePageImage(uri, content) {
  const user = await currentUser();
  if (!user) {
    return { error: "You need to signed in" };
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
      metaImage: content,
    },
  });

  return { success: "Page meta image has been updated" };
}
