import { auth, currentUser, useAuth, useUser } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";

export default async function UserInfo() {
  const user = await currentUser();
  // try {
  //   user = await auth();
  // } catch (error) {
  //   console.error(error);
  // }
  const firstName = user?.firstName;
  const lastName = user?.lastName;
  const imageUrl = user?.imageUrl;
  const role = user?.publicMetadata?.role as string | undefined;
  const organization = user?.publicMetadata?.organizationId as
    | string
    | undefined;
  return (
    <>
      {imageUrl && (
        <Image
          width={100}
          height={100}
          alt="Perfil"
          className="w-10 h-10 rounded-full"
          src={imageUrl}
        />
      )}
      <div className="flex flex-col">
        <span className="text-lg">{`${firstName} ${lastName}`}</span>
        <span className="text-xs border w-max p-0.5 rounded font-bold">
          {role}
        </span>
      </div>
    </>
  );
}
