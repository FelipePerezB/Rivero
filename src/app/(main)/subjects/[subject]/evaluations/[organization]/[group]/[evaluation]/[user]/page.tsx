import Section from "@components/containers/section";
import React, { Suspense } from "react";
import UsersInfo from "./components/user-info";
import SectionTitleSkeleton from "@components/common/titles/section-title/section-title-skeleton";
import LargeSkeleton from "@components/layout/loading-skeleton/large-skeleton/large-skeleton";
import SendFileForm from "./components/btns";
import ScoresChart from "../../components/scores-chart";
import Card from "@components/cards/Card";
import ChartSkeleton from "@components/layout/loading-skeleton/chart-skeleton";
import UpdateAnswersForm from "./components/update-answers-form";

export default async function UserScore({
  params: { evaluation, group, organization, subject, user },
}: {
  params: { [key: string]: string };
}) {
  return (
    <>
      <Section>
        <div className="flex flex-col gap-sm">
          <UsersInfo {...{ group, user, evaluation }} />
        </div>
      </Section>
      <Section>
        <SendFileForm evaluation={evaluation} user={user} />
      </Section>
      <Section>
        <UpdateAnswersForm {...{ evaluation, user }} />
      </Section>
      <Section id="stats">
        <Card className="mt-4 h-80">
          <Suspense fallback={<ChartSkeleton />}>
            <ScoresChart
              organization={organization}
              group={group}
              subject={subject}
              user={user}
            />
          </Suspense>
        </Card>
      </Section>
    </>
  );
}
