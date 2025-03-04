"use server";

import prisma from "@/lib/client";

export async function updateElementClicked({
  uri,
  elementId,
  title,
  userAgent,
}) {
  let updatedElementId = `${uri}-${elementId}`;
  let usersData = [];

  const linkData = await prisma.linkView.findUnique({
    where: { linkId: updatedElementId },
  });

  if (!linkData) {
    usersData = [userAgent];
    const JsonUserDate = JSON.stringify(usersData);
    // create new row
    await prisma.linkView.create({
      data: {
        linkId: updatedElementId,
        linkName: title,
        userAgent: JsonUserDate,
      },
    });
  } else {
    const prevAgentData = JSON.parse(linkData.userAgent);
    usersData = [...prevAgentData, userAgent];

    const JsonUserDate = JSON.stringify(usersData);
    // update existing row
    await prisma.linkView.update({
      where: {
        linkId: updatedElementId,
      },
      data: {
        views: {
          increment: 1,
        },
        userAgent: JsonUserDate,
      },
    });
  }
}
