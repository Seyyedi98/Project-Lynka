import { getPreviewPageDataByUri } from "@/actions/page";

// ✅ Helper function to retry fetching if database connection fails
export default async function fetchWithRetry(uri, retries = 3, delay = 1000) {
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const page = await getPreviewPageDataByUri(uri);
      if (page) return page;
    } catch (error) {
      console.error(`Database fetch failed (attempt ${attempt + 1}):`, error);
      if (attempt < retries - 1)
        await new Promise((res) => setTimeout(res, delay)); // Wait before retrying
    }
  }
  return null; // Return null if all retries fail
}
