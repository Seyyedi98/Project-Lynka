"use server";

import prisma from "@/lib/client";

export async function createNotification(
  userId,
  { type, title, body, actionUrl, actionText },
) {
  try {
    console.log(actionText);
    return await prisma.notification.create({
      data: {
        userId,
        type,
        title,
        body,
        actionUrl,
        actionText,
      },
    });
  } catch (error) {
    console.error("Notification creation failed:", error);
    throw new Error("Failed to creaet notification");
  }
}

export async function markRead(notificationId) {
  try {
    return await prisma.notification.update({
      where: {
        id: notificationId,
      },
      data: {
        isRead: true,
        readAt: new Date(),
      },
    });
  } catch {
    error;
    console.error("Failed to mark as read:", error);
    throw new Error("Failed to update notification");
  }
}

export async function markAllRead(userId) {
  try {
    return await prisma.notification.updateMany({
      where: {
        userId,
        isRead: false,
      },
      data: {
        isRead: true,
        readAt: new Date(),
      },
    });
  } catch (error) {
    console.error("Failed to mark all as read:", error);
    throw new Error("Failed to update notifications");
  }
}

export async function getNotifications(userId, { limit = 10, cursor } = {}) {
  try {
    const notifications = await prisma.notification.findMany({
      where: { userId },
      take: limit + 1, // Check if there is more
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        type: true,
        title: true,
        body: true,
        isRead: true,
        createdAt: true,
        actionUrl: true,
        actionText: true,
      },
    });

    const hasMore = notifications.length > limit;
    const items = hasMore ? notifications.slice(0, -1) : notifications;

    return {
      notifications: items,
      nextCursor: hasMore ? items[items.length - 1].id : null,
    };
  } catch (error) {
    console.error("Failed to fetch notifications:", error);
    return { notifications: [], nextCursor: null };
  }
}
