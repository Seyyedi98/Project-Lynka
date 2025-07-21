"use server";

import { currentUser } from "@/lib/auth/get-user";
import prisma from "@/lib/client";

export async function createBlogPost(formData) {
  const user = await currentUser();
  if (!user || user.id !== process.env.ADMIN_ID || user.role !== "ADMIN") {
    return;
  }

  try {
    await prisma.blog.create({
      data: {
        title: formData.title,
        description: formData.description || null,
        images: formData.images,
        postData: formData.postData,
        view: 0,
      },
    });
    return { success: "Post created successfully" };
  } catch (error) {
    return { error: "Failed to create post" };
  }
}

export async function getPaginatedPosts(page = 1, perPage = 10) {
  const user = await currentUser();
  if (!user || user.id !== process.env.ADMIN_ID || user.role !== "ADMIN") {
    return;
  }
  const skip = (page - 1) * perPage;
  const [posts, total] = await Promise.all([
    prisma.blog.findMany({
      skip,
      take: perPage,
      orderBy: { createdAt: "desc" },
    }),
    prisma.blog.count(),
  ]);
  return { posts, totalPages: Math.ceil(total / perPage) };
}

export async function updateBlogPost(id, formData) {
  const user = await currentUser();
  if (!user || user.id !== process.env.ADMIN_ID || user.role !== "ADMIN") {
    return;
  }
  try {
    await prisma.blog.update({
      where: { id },
      data: {
        title: formData.title,
        description: formData.description || null,
        images: formData.images,
        postData: formData.postData,
      },
    });
    return { success: "Post updated successfully" };
  } catch (error) {
    return { error: "Failed to update post" };
  }
}

export async function deleteBlogPost(id) {
  const user = await currentUser();
  if (!user || user.id !== process.env.ADMIN_ID || user.role !== "ADMIN") {
    return;
  }
  try {
    await prisma.blog.delete({ where: { id } });
    return { success: "Post deleted successfully" };
  } catch (error) {
    return { error: "Failed to delete post" };
  }
}
