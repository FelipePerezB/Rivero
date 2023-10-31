import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  ignoredRoutes: "/documents/edit/h9BkppzJQ19UjW2Eyj7H5rz8RoLUBpxO",
  publicRoutes: [
    "/api/subjects",
    "/api/notes",
    "/api/auth/invitation/verify/(.*)",
    "/api/auth/invitation",
    "/api/topics",
    "/api/topics/(.*)",
    "/api/notes/(.*)",
    "/api/subtopics",
    "/api/subjects/(.*)",
    "/api/organizations/(.*)",
    "/api/auth/webhook",
  ],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
