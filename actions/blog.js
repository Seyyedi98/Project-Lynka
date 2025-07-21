"use server";

import prisma from "@/lib/client";

export async function getPaginatedPosts(page = 1, perPage = 10) {
  try {
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
      totalPages: Math.ceil(total / perPage),
    };
  } catch (error) {
    console.error("Database Error:", error);
    return { posts: [], totalPages: 1 };
  }
}

export async function getBlogPostById(id) {
  try {
    const post = await prisma.blog.findUnique({
      where: { id },
    });
    return post;
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return null;
  }
}
