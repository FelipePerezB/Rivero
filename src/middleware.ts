import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/contact", "/api(.)*", "/documents/edit(.)*"],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
