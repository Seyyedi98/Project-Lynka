"use server";

async function SendSms(phoneNumber, message) {
  console.log(phoneNumber, message);
  const url = `https://api.sms.ir/v1/send?username=${process.env.SMS_USERNAME}&password=${process.env.SMS_API_KEY}&mobile=${phoneNumber}&line=${process.env.SMS_LINE_NUMBER}&text=${encodeURIComponent(message)}`;

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
