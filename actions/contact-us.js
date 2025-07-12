"use server";

import prisma from "@/lib/client";

export async function sendContactMessage({ userId, title, message }) {
  await prisma.contactUsMessages.create({
    data: { userId, title, message },
  });

  return { success: "Message sent!" };
}

export async function getContactMessages(page = 1, perPage = 12) {
  try {
    // Calculate offset for pagination
    const skip = (page - 1) * perPage;

    // Get messages with pagination
    const messages = await prisma.contactUsMessages.findMany({
      skip: skip,
      take: perPage,
      orderBy: {
        createdAt: "desc", // Show newest messages first
      },
    });

    // Get total count for pagination
    const totalCount = await prisma.contactUsMessages.count();
    const totalPages = Math.ceil(totalCount / perPage);

    return {
      messages,
      totalPages,
    };
  } catch (error) {
    console.error("Error fetching contact messages:", error);
    throw error;
  }
}

export async function deleteContactMessage(messageId) {
  try {
    await prisma.contactUsMessages.delete({
      where: { id: messageId },
    });
    return { success: true };
  } catch (error) {
    console.error("Error deleting message:", error);
    throw error;
  }
}
