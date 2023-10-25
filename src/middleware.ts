import { authMiddleware } from "@clerk/nextjs";
 
export default authMiddleware(
  {
    publicRoutes: ['/api/subjects', '/api/notes', '/api/topics', '/api/topics/(.*)', '/api/notes/(.*)', '/api/subtopics','/api/subjects/(.*)', '/api/organizations/(.*)', 'api/auth/invitation', "/api/auth/webhook"]
  }
);
 
export const config = {
      matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};