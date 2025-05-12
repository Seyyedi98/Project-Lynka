"use server";

import prisma from "@/lib/client";

export async function submitForm({ uri, title, formData, formId }) {
  try {
    if (!uri || typeof formData !== "object" || formData === null) {
      throw new Error("Invalid submission data");
    }

    const page = await prisma.page.findUnique({
      where: { uri },
      select: { content: true },
    });

    if (!page) {
      throw new Error("Page not found");
    }

    const submission = await prisma.formSubmission.create({
      data: {
        pageUri: uri,
        FormOccupiedTitle12: title,
        formName: formId,
        formData: formData || {},
      },
    });

    return { success: true, submission };
  } catch (error) {
    console.error("Form submission error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Submission failed",
    };
  }
}

export async function getSubmittedForms({
  uri,
  limit = 15,
  cursor,
  formTitleFilter = null,
}) {
  try {
    const submissions = await prisma.formSubmission.findMany({
      where: {
        pageUri: uri,
        ...(formTitleFilter && { formName: formTitleFilter }),
      },
      take: limit + 1,
      ...(cursor && { cursor: { id: cursor } }),
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        formData: true,
        formName: true,
        createdAt: true,
        FormOccupiedTitle12: true,
      },
    });

    const hasMore = submissions.length > limit;
    const items = hasMore ? submissions.slice(0, -1) : submissions;

    return {
      success: true,
      data: items.map((item) => ({
        id: item.id,
        ...item.formData,
        formName: item.formName,
        createdAt: item.createdAt,
        FormOccupiedTitle12: item.FormOccupiedTitle12,
      })),
      nextCursor: hasMore ? items[items.length - 1].id : null,
    };
  } catch (error) {
    console.error("Form submission error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to get data",
      data: [],
      nextCursor: null,
    };
  }
}
