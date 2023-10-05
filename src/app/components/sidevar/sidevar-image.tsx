import { currentUser } from "@clerk/nextjs";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

export default async function SidevarImage() {
  return <></>
  // const user = await currentUser();
  // return user?.imageUrl ? (
  //   <Image priority width={50} height={50} src={user?.imageUrl} alt="profile" />
  // ) : (
  //   <FontAwesomeIcon size="lg" icon={faBars} />
  // );
}
