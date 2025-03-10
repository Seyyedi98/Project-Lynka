// app/actions/indexPage.js
"use server";
import { google } from "googleapis";

export async function submitToGoogleIndexing(url) {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/indexing"],
  });

  const indexing = google.indexing({ version: "v3", auth });

  try {
    await indexing.urlNotifications.publish({
      requestBody: {
        url,
        type: "URL_UPDATED",
      },
    });
    return { success: true, message: "URL submitted to Google Indexing API" };
  } catch (error) {
    return {
      success: false,
      error: "Error submitting URL to Google Indexing API",
    };
  }
}
