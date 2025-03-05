"use server";

import prisma from "@/lib/client";

export async function updateElementClicked({
  uri,
  elementId,
  title,
  userAgent,
}) {
  const { device, os } = userAgent;
  let updatedElementId = `${uri}-${elementId}`;
  let usersData = {
    device: {},
    os: {},
  };

  const linkData = await prisma.linkView.findUnique({
    where: { linkId: updatedElementId },
  });

  if (!linkData) {
    if (usersData.device[device]) {
      usersData.device[device] += 1;
    } else {
      usersData.device[device] = 1;
    }

    if (usersData.os[os]) {
      usersData.os[os] += 1;
    } else {
      usersData.os[os] = 1;
    }

    const JsonUserDate = JSON.stringify(usersData);
    // // create new row
    await prisma.linkView.create({
      data: {
        linkName: title,
        linkId: updatedElementId,
        pageUri: uri,
        userAgent: JsonUserDate,
        elementId,
      },
    });
  } else {
    const prevAgentData = JSON.parse(linkData.userAgent);
    if (prevAgentData.device[device]) {
      prevAgentData.device[device] += 1;
    } else {
      prevAgentData.device[device] = 1;
    }

    if (prevAgentData.os[os]) {
      prevAgentData.os[os] += 1;
    } else {
      prevAgentData.os[os] = 1;
    }

    const newAgentData = JSON.stringify(prevAgentData);
    // update existing row
    await prisma.linkView.update({
      where: {
        linkId: updatedElementId,
      },
      data: {
        clicks: {
          increment: 1,
        },
        userAgent: newAgentData,
      },
    });
  }
}
