import { currentUser } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/dist/types/server";
import Button from "@components/common/buttons/button/button";
import SectionTitle from "@components/common/titles/section-title";
import Title from "@components/common/titles/title";
import Section from "@components/containers/section";
import BackBtn from "@components/navigation/back-btn";
import { Role } from "@prisma/client";
import React, { ReactNode } from "react";

const ProtectFallback = ({
  message = "No cuentas con el rol necesario para acceder a esta página",
}: {
  message?: string;
}) => (
  <Section>
    <SectionTitle title="Acceso denegado" subTitle={message} />
    <div className="flex gap-sm">
      <Button href="/home">Volver al home</Button>
      <BackBtn color="white">Volver atrás</BackBtn>
    </div>
  </Section>
);

export default async function Protect({
  conditions,
  roles,
  children,
}: {
  conditions?: { condition: (user: User) => boolean; message?: string }[];
  roles: Role[];
  children: ReactNode;
}) {
  const user = await currentUser();
  if (!user?.id) return <ProtectFallback />;
  const role = user?.publicMetadata?.role as Role | undefined;
  if (conditions?.length)
    for (let i = 0; i < conditions?.length; i++) {
      const { condition, message } = conditions[i] ?? {};
      if (!condition(user)) return <ProtectFallback message={message} />;
    }

  return role && roles.includes(role) ? <>{children}</> : <ProtectFallback />;
}
