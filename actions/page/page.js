"use server";

import Error from "@/app/error";
import { currentUser } from "@/lib/auth/get-user";
import prisma from "@/lib/client";
import { PageUriSchema } from "@/schemas";

export const getAllPages = async () => {
  const page = await prisma.page.findMany({
    select: {
      uri: true,
    },
  });
  return page;
};

export const checkPageAvailable = async (uri) => {
  try {
    const page = await prisma.page.findUnique({
      where: { uri },
    });

    return !page;
  } catch (error) {
    console.error("Error checking page availability:", error);
    throw new Error("Could not check page availability");
  }
};

export const newPageCreator = async (uri) => {
  const user = await currentUser();
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
  return { message: "error" };
};

export const deletePage = async (uri) => {
  try {
    const user = await currentUser();
    if (!user) return { error: "شما به این بخش دسترسی ندارید" };

    const targetPage = await prisma.page.findUnique({
      where: {
        uri,
      },
    });

    if (targetPage.owner !== user.id) return { error: "Unauthorized access" };

    await prisma.page.delete({
      where: {
        uri,
        owner: user.id,
      },
    });

    return { success: "صفحه پاک شد" };
  } catch (error) {
    console.error("Error deleting page:", error);
    return { error: "خطا در حذف صفحه" };
  }
};

export const getUserPages = async () => {
  const user = await currentUser();
  if (!user) return;

  const data = await prisma.user.findUnique({
    where: { id: user.id },
    include: { page: true },
  });

  if (!data) {
    console.error("Error getting user pages");
    return <Error />;
  }

  return data.page;
};

export const getUserPagesByUserId = async (userId) => {
  const data = await prisma.user.findUnique({
    where: { id: userId },
    include: { page: true },
  });

  return data.page;
};

export const getUserPageData = async () => {
  const user = await currentUser();
  if (!user) return;

  const data = await prisma.user.findUnique({
    where: { id: user.id },
    include: {
      page: {
        select: {
          uri: true,
          views: true,
        },
      },
    },
  });

  if (!data) {
    console.error("Error getting user pages");
    return <Error />;
  }

  return data.page;
};

// TODO: called frequently
// Get preview page data by URI (without user validation)
export const getPageDataByUri = async (uri) => {
  const page = await prisma.page.findUnique({
    where: {
      uri,
    },
  });

  if (!page) return { error: "Page not found!" };

  return page;
};

// TODO: called frequently
export const getWorkspacePageDataByUri = async (uri) => {
  const user = await currentUser();
  if (!user) return;

  const page = await prisma.page.findUnique({
    where: {
      uri,
    },
  });

  if (page && page.owner !== user.id) return { error: "Unauthorized access" };

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

export async function UpdatePageLoadingIcon(uri, loadingIcon) {
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
      loadingIcon,
    },
  });

  return { success: "Page theme has been updated" };
}

export async function getPageThemeByUri(uri) {
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

export async function UpdatePageMetaImage(uri, content) {
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

export async function setIsPageIndexed(uri) {
  const page = await prisma.page.findUnique({
    where: {
      uri,
    },
  });

  if (!page) return { error: "Page not found!" };

  await prisma.page.update({
    where: {
      uri,
    },
    data: {
      googleIndexed: true,
    },
  });

  return { success: "Page has been indexed" };
}
