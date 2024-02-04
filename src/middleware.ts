import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/contact", "/api(.)*", "/documents/edit(.)*"],
  // ignoredRoutes: 
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
