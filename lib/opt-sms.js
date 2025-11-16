"use server";

async function SendSms(phoneNumber, token) {
  // Convert all environment variables to strings
  const smsTemplateId = String(process.env.SMS_TEMPLATE_ID || "");
  const smsApiKey = String(process.env.SMS_API_KEY || "");

  const raw = JSON.stringify({
    mobile: phoneNumber,
    templateId: smsTemplateId,
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
      "x-api-key": smsApiKey,
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
