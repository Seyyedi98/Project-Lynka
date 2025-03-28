"use server";

import prisma from "@/lib/client";

export async function submitForm({ uri, formData, formId }) {
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
