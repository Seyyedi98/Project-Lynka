export const getPageDataByUri = async (uri) => {
  const user = currentUser();
  if (!user) return;

  const page = await prisma.page.findUnique({
    where: {
      uri,
    },
  });

  if (!page) return { error: "You need to signed in to create Page" };
  if (page.owner !== user.id) return { error: "Unauthorized access" };

  return page;
};
