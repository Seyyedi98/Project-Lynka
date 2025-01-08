"use server";

import prisma from "./client";
import { currentUser } from "./get-user";

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
  if (!user) return;
  const page = await prisma.page.create({
    data: {
      uri,
      owner: (await user).id,
      content: "",
    },
  });

  return page;
};
