import { authMiddleware } from "@clerk/nextjs";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/nextjs/middleware for more information about configuring your middleware
export default authMiddleware({
  // publicRoutes:['/'],
  ignoredRoutes: ["/", "/docs/edit/2", "/docs/view/6"],
});

export const config = {
  matcher: ["/"],
  // matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};

// -2x + y  = 3
// y = 3x + 3