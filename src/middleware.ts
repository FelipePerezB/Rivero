import { authMiddleware } from "@clerk/nextjs";
 
export default authMiddleware(
  {
    ignoredRoutes: ['/api/subjects', '/api/topics', '/api/topics/(.*)', '/api/subjects/(.*)']
  }
);
 
export const config = {
      matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};