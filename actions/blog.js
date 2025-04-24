"use server";

import prisma from "@/lib/client";

export async function createBlogPost(formData) {
  try {
    const newPot = await prisma.blog.create({
      data: {
        title: formData.title,
        description: formData.description || null,
        images: formData.images,
        postData: formData.postData,
        view: 0,
      },
    });

    return { success: "Post created" };
  } catch {
    return { error: "Cannot create post" };
  }
}

export async function getPopularPosts() {
  return await prisma.blog.findMany({
    take: 2,
    orderBy: {
      view: "desc",
    },
    select: {
      id: true,
      title: true,
      description: true,
      createdAt: true,
      view: true,
    },
  });
}

export async function getPaginatedPosts(page = 1, perPage = 10) {
  const skip = (page - 1) * perPage;

  const [posts, total] = await Promise.all([
    prisma.blog.findMany({
      skip,
      take: perPage,
      orderBy: {
        createdAt: "desc",
      },
    }),
    prisma.blog.count(),
  ]);

  return {
    posts,
    total,
    totalPages: Math.ceil(total / perPage),
    currentPage: page,
  };
}

export async function updateBlogPost(id, formData) {
  try {
    const updatedPost = await prisma.blog.update({
      where: { id },
      data: {
        title: formData.title,
        description: formData.description || null,
        images: formData.images,
        postData: formData.postData,
      },
    });

    return { success: true, post: updatedPost };
  } catch (error) {
    return { success: false, error: "Failed to update post" };
  }
}

export async function deleteBlogPost(id) {
  try {
    await prisma.blog.delete({
      where: { id },
    });

    revalidatePath("/blog");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to delete post" };
  }
}
