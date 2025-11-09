"use server";

const websiteUrl = process.env.NEXT_PUBLIC_WEBSITE_URL;
const apiKey = process.env.EMAIL_API_KEY;
const fromEmail = process.env.EMAIL_FROM_EMAIL;

async function sendEmail(to, subject, html) {
  const response = await fetch(
    "https://api.elasticemail.com/v4/emails/transactional",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: to,
        subject: subject,
        html: html,
        // isTransactional is not needed as we're using the transactional endpoint
      }),
    },
  );

  if (!response.ok) {
    throw new Error(response.message || "Failed to send email");
  }
  return response;
}

// async function sendEmail(to, subject, html) {
//   const formData = new URLSearchParams();
//   formData.append("apikey", apiKey);
//   formData.append("from", fromEmail);
//   formData.append("to", to);
//   formData.append("subject", subject);
//   formData.append("bodyHtml", html);
//   formData.append("isTransactional", "true");

//   const response = await fetch("https://api.elasticemail.com/v2/email/send", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded",
//     },
//     body: formData.toString(),
//   });

//   const data = await response.json();

//   if (!response.ok) {
//     throw new Error(data.error || "Failed to send email");
//   }

//   return data;
// }

// Verification after create a new account
export const sendVerificationEmail = async (email, token) => {
  const confirmLink = `${websiteUrl}auth/new-verification?token=${token}`;
  const html = `<div style="text-align: center; padding: 40px 20px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
  <div style="max-width: 500px; margin: 0 auto; background: white; border-radius: 15px; padding: 40px 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
    
    <!-- Icon -->
    <div style="font-size: 60px; margin-bottom: 20px;">📧</div>
    
    <!-- Title -->
    <h1 style="color: #333; margin-bottom: 20px; font-size: 24px;">تایید ایمیل شما</h1>
    
    <!-- Message -->
    <p style="color: #666; line-height: 1.6; margin-bottom: 30px; font-size: 16px;">
      برای فعال سازی حساب کاربری خود، لطفا روی دکمه زیر کلیک کنید
    </p>
    
    <!-- Button -->
    <a href="${confirmLink}" 
       style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
              color: white; padding: 15px 40px; text-decoration: none; border-radius: 50px; 
              font-weight: bold; font-size: 16px; box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
              transition: all 0.3s ease;">
      تایید ایمیل
    </a>
    
    <!-- Help Text -->
    <p style="color: #888; font-size: 14px; margin-top: 30px; line-height: 1.5;">
      اگر شما درخواست ایجاد کاربری نکرده اید، لطفا این ایمیل را نادیده بگیرید
    </p>
    
  </div>
  
  <!-- Footer -->
  <div style="margin-top: 20px; color: white; font-size: 12px;">
    این ایمیل به صورت خودکار ارسال شده است
  </div>
</div>`;

  await sendEmail(email, "Confirm your email", html);
};

// Password reser
export const sendPasswordResetEmail = async (email, token) => {
  const resetLink = `${websiteUrl}auth/new-password?token=${token}`;
  const html = `<div style="text-align: center; padding: 40px 20px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);">
  <div style="max-width: 500px; margin: 0 auto; background: white; border-radius: 15px; padding: 40px 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
    
    <!-- Icon -->
    <div style="font-size: 60px; margin-bottom: 20px;">🔒</div>
    
    <!-- Title -->
    <h1 style="color: #333; margin-bottom: 20px; font-size: 24px;">بازنشانی رمز عبور</h1>
    
    <!-- Message -->
    <p style="color: #666; line-height: 1.6; margin-bottom: 30px; font-size: 16px;">
      برای ایجاد رمز عبور جدید، لطفا روی دکمه زیر کلیک کنید. این لینک به مدت ۱ ساعت معتبر است.
    </p>
    
    <!-- Button -->
    <a href="${resetLink}" 
       style="display: inline-block; background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%); 
              color: white; padding: 15px 40px; text-decoration: none; border-radius: 50px; 
              font-weight: bold; font-size: 16px; box-shadow: 0 4px 15px rgba(255, 107, 107, 0.4);
              transition: all 0.3s ease;">
      بازنشانی رمز عبور
    </a>
    
    <!-- Warning -->
    <div style="background: #fff9e6; border-right: 4px solid #ffd700; padding: 15px; margin: 25px 0; border-radius: 5px; text-align: right;">
      <p style="color: #856404; margin: 0; font-size: 14px; line-height: 1.5;">
        ⚠️ اگر این درخواست توسط شما انجام نشده است، لطفا این ایمیل را نادیده بگیرید
      </p>
    </div>
    
  </div>
  
  <!-- Footer -->
  <div style="margin-top: 20px; color: white; font-size: 12px;">
    این ایمیل به صورت خودکار ارسال شده است
  </div>
</div>`;

  await sendEmail(email, "Reset your password", html);
};

// 2FA token
export const sendTwoFactorTokenEmail = async (email, token) => {
  const html = `<div style="text-align: center; padding: 40px 20px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
  <div style="max-width: 500px; margin: 0 auto; background: white; border-radius: 15px; padding: 40px 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
    
    <!-- Icon -->
    <div style="font-size: 60px; margin-bottom: 20px;">🔐</div>
    
    <!-- Title -->
    <h1 style="color: #333; margin-bottom: 20px; font-size: 24px;">کد تأیید دو مرحله‌ای</h1>
    
    <!-- Message -->
    <p style="color: #666; line-height: 1.6; margin-bottom: 10px; font-size: 16px;">
      برای تکمیل فرآیند ورود، کد زیر را وارد کنید:
    </p>
    
    <!-- Token Box -->
    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                color: white; padding: 20px; border-radius: 10px; margin: 25px 0; 
                font-family: 'Courier New', monospace; font-size: 32px; font-weight: bold; 
                letter-spacing: 8px; text-align: center; direction: ltr;">
      ${token}
    </div>
    
    <!-- Timer Info -->
    <p style="color: #e74c3c; font-size: 14px; margin-bottom: 20px;">
      ⏰ این کد به مدت ۵ دقیقه معتبر است
    </p>
    
    <!-- Security Warning -->
    <div style="background: #fff9e6; border-right: 4px solid #ffd700; padding: 15px; 
                margin: 20px 0; border-radius: 5px; text-align: right;">
      <p style="color: #856404; margin: 0; font-size: 14px; line-height: 1.5;">
        🔒 این کد را در اختیار دیگران قرار ندهید. هر کسی با داشتن این کد می تواند وارد اکانت کاربری شما شود.
      </p>
    </div>
    
  </div>
  
  <!-- Footer -->
  <div style="margin-top: 20px; color: white; font-size: 12px;">
    این ایمیل به صورت خودکار ارسال شده است
  </div>
</div>`;
  await sendEmail(email, "2FA Code", html);
};
