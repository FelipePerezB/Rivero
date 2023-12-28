import { currentUser } from "@clerk/nextjs";

export default async function getUser() {
  let user;
  try {
    user = await currentUser();
  } catch (error) {
    console.log(error);
  }
  return user;
}
