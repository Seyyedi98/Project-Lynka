"use server";

async function SendSms(phoneNumber, message) {
  console.log(phoneNumber, message);

  // Convert all environment variables to strings
  const smsUsername = String(process.env.SMS_USERNAME || "");
  const smsApiKey = String(process.env.SMS_API_KEY || "");
  const smsLineNumber = String(process.env.SMS_LINE_NUMBER || "");

  const url = `https://api.sms.ir/v1/send?username=${smsUsername}&password=${smsApiKey}&mobile=${phoneNumber}&line=${smsLineNumber}&text=${encodeURIComponent(message)}`;

  const requestOptions = {
    method: "GET",
    headers: {
      Accept: "text/plain",
    },
    redirect: "follow",
  };

  try {
    const response = await fetch(url, requestOptions);
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
