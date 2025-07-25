const websiteUrl = process.env.NEXT_PUBLIC_WEBSITE_URL;
const apiKey = process.env.EMAIL_API_KEY;
const fromEmail = process.env.EMAIL_FROM_EMAIL;

async function sendEmail(to, subject, html) {
  const formData = new URLSearchParams();
  formData.append("apikey", apiKey);
  formData.append("from", fromEmail);
  formData.append("to", to);
  formData.append("subject", subject);
  formData.append("bodyHtml", html);
  formData.append("isTransactional", "true");

  const response = await fetch("https://api.elasticemail.com/v2/email/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formData.toString(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to send email");
  }

  return data;
}

export const sendVerificationEmail = async (email, token) => {
  const confirmLink = `${websiteUrl}auth/new-verification?token=${token}`;
  const html = `<p>Click <a href='${confirmLink}'>here</a> to confirm your email</p>`;

  await sendEmail(email, "Confirm your email", html);
};

export const sendPasswordResetEmail = async (email, token) => {
  const resetLink = `${websiteUrl}auth/new-password?token=${token}`;
  const html = `<p>Click <a href='${resetLink}'>here</a> to reset your password</p>`;

  await sendEmail(email, "Reset your password", html);
};

export const sendTwoFactorTokenEmail = async (email, token) => {
  const html = `<p>Your 2FA Code: ${token}</p>`;
  await sendEmail(email, "2FA Code", html);
};
