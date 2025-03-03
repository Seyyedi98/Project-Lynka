"use server";

import prisma from "@/lib/client";

export async function updateElementClicked({ uri, elementId }) {
  const page = await prisma.page.findUnique({
    where: {
      uri,
    },
  });

  if (!page) return { error: "Page not found!" };
  let data = JSON.parse(page.content);
  const hero = data[0];

  let content;
  let elementFound = false;
  content = data[1].map((element) => {
    if (element.id === elementId) {
      element.extraAttributes.clicked = element.extraAttributes.clicked + 1;
      elementFound = true;
    }
    return element;
  });

  if (!elementFound) {
    return { error: "Element not found!" };
  }

  await prisma.page.update({
    where: {
      uri,
    },
    data: {
      content: JSON.stringify([hero, content]),
    },
  });
}
