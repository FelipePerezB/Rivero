import Card from "@components/cards/Card";
import SectionTitleSkeleton from "@components/common/titles/section-title/section-title-skeleton";
import SmallTitle from "@components/common/titles/small-title";
import ItemsBox from "@components/containers/items-box/items-box";
import Section from "@components/containers/section";
import LargeSkeleton from "@components/layout/loading-skeleton/large-skeleton/large-skeleton";
import SmallSkeleton from "@components/layout/loading-skeleton/small-skeleton";
import React from "react";

const QuestionCard = () => (
  <Card className="w-full flex flex-col justify-between h-32 pt-4">
    <SmallSkeleton />
    <LargeSkeleton />
  </Card>
);

export default function LoadingReport() {
  return (
    <>
      <Section>
        <div className="md:h-20 h-14">
          <SectionTitleSkeleton />
        </div>
      </Section>
      <Section>
        <SmallTitle>Preguntas</SmallTitle>
        <ItemsBox size="lg">
          <QuestionCard />
          <QuestionCard />
          <QuestionCard />
          <QuestionCard />
          <QuestionCard />
          <QuestionCard />
          <QuestionCard />
          <QuestionCard />
          <QuestionCard />
          <QuestionCard />
          <QuestionCard />
          <QuestionCard />
        </ItemsBox>
      </Section>
    </>
  );
}
