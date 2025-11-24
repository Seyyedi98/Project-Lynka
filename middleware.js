import authConfig from "./auth.config";
import NextAuth from "next-auth";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "@/routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  // Define routes that should exclude (page)/[uri]
  const isExcludedRoute =
    nextUrl.pathname.startsWith("/dashboard") ||
    nextUrl.pathname.startsWith("/workspace") ||
    nextUrl.pathname.startsWith("/succeed");

  // Allow blog routes (/blog and /blog/[id])
  const isBlogRoute = nextUrl.pathname.startsWith("/blog");

  // Exclude specific API routes from authentication
  const isPublicApiRoute = nextUrl.pathname.startsWith(
    "/api/subscriptionExpireAlert",
  );

  // Ensure (page)/[uri] only renders when no other specific routes match
  const isDynamicRoute =
    (/^\/[a-zA-Z0-9_-]+$/.test(nextUrl.pathname) && !isExcludedRoute) ||
    isBlogRoute; // Prevent matching for /dashboard & /workspace

  if (isDynamicRoute) {
    return null; // Allow (page)/[uri] when it's the only match
  }

  if (isApiAuthRoute || isPublicApiRoute) {
    return null;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return null;
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/auth/login", nextUrl));
  }

  return null;
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
