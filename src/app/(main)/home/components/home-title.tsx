import { currentUser } from "@clerk/nextjs";
import SectionTitle from "@components/common/titles/section-title/section-title";
import React from "react";

export default async function HomeTitle() {
  const user = await currentUser();
  const title = `¡Hola, ${user?.firstName}!`;
  return <SectionTitle title={title} subTitle="Revisa tu perfil y progreso" />;
}
