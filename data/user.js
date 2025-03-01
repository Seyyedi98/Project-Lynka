import prisma from "@/lib/client";

export const getUserByEmail = async (email) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) return false;
    return user;
  } catch {
    return { error: "Something went wrong" };
  }
};

export const getUserById = async (id) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) return false;
    return user;
  } catch {
    return { error: "Something went wrong" };
  }
};

export const getUserByPhoneNumber = async (phoneNumber) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        phoneNumber,
      },
    });
    if (!user) return false;
    return user;
  } catch {
    return { error: "Something went wrong" };
  }
};
