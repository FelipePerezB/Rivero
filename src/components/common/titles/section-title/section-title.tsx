import React from "react";
import Title from "../title";
import SubTitle from "../subtitle";

export default function SectionTitle({ title, subTitle }: { title: string, subTitle: string }) {
  return (
    <div className="flex gap-0.5 flex-col">
      <Title>{title}</Title>
      <SubTitle>{subTitle}</SubTitle>
    </div>
  );
}
