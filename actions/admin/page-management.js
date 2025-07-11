"use server";

import { currentUser } from "@/lib/auth/get-user";

export async function removePageByUri(uri) {
  const user = await currentUser();
  if (!user || user.id !== process.env.ADMIN_ID || user.role !== "ADMIN") {
    return;
  }

  try {
    await prisma.page.delete({
      where: {
        uri,
        owner: user.id,
      },
    });
  } catch {
    return { error: "Error in deleting Page" };
  }
}
