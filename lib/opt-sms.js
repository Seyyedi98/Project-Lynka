"use server";

async function SendSms(phoneNumber, token) {
  const raw = JSON.stringify({
    mobile: phoneNumber,
    templateId: process.env.SMS_TEMPLATE_ID,
    parameters: [
      {
        name: "token",
        value: token,
      },
    ],
  });

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "text/plain",
      "x-api-key": process.env.SMS_API_KEY,
    },
    body: raw,
    redirect: "follow",
  };

  try {
    const response = await fetch(
      "https://api.sms.ir/v1/send/verify",
      requestOptions,
    );
    const result = await response.text();

    console.log(response);

    if (!response.ok) {
      throw new Error(result || "Failed to send SMS");
    }

    return result;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
}

export default SendSms;
