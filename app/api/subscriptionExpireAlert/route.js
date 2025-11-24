import prisma from "@/lib/client";
import SendSms from "@/lib/sms";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    // Authentication check
    const apiKey = request.headers.get("x-api-key");

    if (!apiKey || apiKey !== process.env.CRON_API_KEY) {
      return NextResponse.json(
        {
          message: "Unauthorized",
          error: "Invalid or missing API key",
        },
        { status: 401 },
      );
    }

    // Get current time
    const currentTime = new Date();

    // Get all users with subscriptionExpire - UPDATED to include phone and name
    const users = await prisma.user.findMany({
      where: {
        subscriptionExpire: {
          not: null,
        },
      },
      select: {
        id: true,
        subscriptionExpire: true,
        phoneNumber: true,
        email: true,
      },
    });

    // Filter users with less than 3 days and more than 0 days remaining
    const usersToNotify = users.filter((user) => {
      const expireDate = new Date(user.subscriptionExpire);
      const timeDiff = expireDate.getTime() - currentTime.getTime();
      const daysRemaining = timeDiff / (1000 * 3600 * 24); // Convert ms to days
      return daysRemaining > 0 && daysRemaining <= 3;
    });

    // console.log(`Found ${usersToNotify.length} users to notify`);

    // Prepare and send SMS to each user
    const smsPromises = usersToNotify.map(async (user) => {
      const expireDate = new Date(user.subscriptionExpire);
      const timeDiff = expireDate.getTime() - currentTime.getTime();
      const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24)); // Round up to nearest day

      const message = `کاربر عزیز، ${daysRemaining} روز تا پایان اشتراک لینکا مونده. برای تمدید اشتراک کلیک کن:\nlynka.ir/dashboard/pricing`;

      if (user.phoneNumber) {
        try {
          await SendSms(user.phoneNumber, message);
          console.log(`SMS sent to ${user.phoneNumber}`);

          return {
            success: true,
            userId: user.id,
            phoneNumber: user.phoneNumber,
          };
        } catch (error) {
          console.error(`Failed to send SMS to ${user.phoneNumber}:`, error);
          return {
            success: false,
            userId: user.id,
            phoneNumber: user.phoneNumber,
            error: error.message,
          };
        }
      }

      // if (!user.phoneNumber && user.email) {
      //   try {
      //     // await SendEmail(user.phoneNumber, message);
      //     console.log(`SMS sent to ${user.email}`);

      //     return {
      //       success: true,
      //       userId: user.id,
      //       email: user.email,
      //     };
      //   } catch (error) {
      //     console.error(`Failed to send SMS to ${user.email}:`, error);
      //     return {
      //       success: false,
      //       userId: user.id,
      //       email: user.email,
      //       error: error.message,
      //     };
      //   }
      // }
    });

    // Wait for all SMS to be sent
    const results = await Promise.all(smsPromises);

    const successful = results.filter((r) => r.success).length;
    const failed = results.filter((r) => !r.success).length;

    return NextResponse.json({
      message: `SMS notification process completed. Successful: ${successful}, Failed: ${failed}`,
      details: results,
    });
  } catch (error) {
    console.error("Error in subscription notification handler:", error);
    return NextResponse.json(
      {
        message: "Internal server error",
        error: error.message,
      },
      { status: 500 },
    );
  }
}
