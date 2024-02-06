import { currentUser } from "@clerk/nextjs";
import SectionTitle from "@components/common/titles/section-title/section-title";
import SectionTitleSkeleton from "@components/common/titles/section-title/section-title-skeleton";
import Section from "@components/containers/section";
import LargeSkeleton from "@components/layout/loading-skeleton/large-skeleton/large-skeleton";
import SmallSkeleton from "@components/layout/loading-skeleton/small-skeleton";
import Options from "@components/navigation/options/options";
import { Role, Score, User } from "@prisma/client";
import React, { Suspense } from "react";
import api from "src/utils/api";

async function Mark({
  group,
  user,
  evaluation,
}: {
  group: string;
  evaluation: string;
  user: string;
}) {
  const { data: score } = (await api(`scores/user/${user}/${evaluation}`, {}, [
    `scores/groups/${group}`,
  ])) as { data: Score };
  const mark = score?.score;
  return (
    mark && (
      <>
        <span className="text-3xl sm:text-5xl text-blue-500 font-semibold">
          {mark}
        </span>
        <span className="text-sm sm:text-base font-light text-blue-500">
          ptje.
        </span>
      </>
    )
  );
}

async function UsersInfo({
  group,
  evaluation,
  user: userId,
}: {
  group: string;
  evaluation: string;
  user: string;
}) {
  const user = await currentUser();
  const role = user?.publicMetadata?.role;

  const { data: users } = (await api(`groups/students/${group}`, {}, [
    `groups/${group}`,
  ])) as {
    data: User[];
  };

  const userData = users.find(({ id }) => id === Number(userId));
  return (
    <>
      <article className="flex justify-between items-center">
        <SectionTitle
          title={`${userData?.name} ${userData?.lastname ?? ""}`}
          subTitle={userData?.email ?? ""}
        />
        <div className="flex w-20 sm:w-40 gap-1 items-end justify-center sm:p-4 p-0 h-9 sm:h-20">
          <Suspense fallback={<SmallSkeleton />}>
            <Mark {...{ evaluation, user: userId, group }} />
          </Suspense>
        </div>
      </article>
      {role && role !== Role.STUDENT ? (
        <Options
          option={userId}
          options={users.map(({ lastname, name, id }) => ({
            key: id,
            title: `${name} ${lastname ?? ""}`,
          }))}
        />
      ) : (
        <div className="h-11">
          Consulta con tu profesor si crees que alguna alternativa no concuerda
        </div>
      )}
    </>
  );
}

export default async function UsersInfoWithSuspense({
  group,
  evaluation,
  user,
}: {
  group: string;
  evaluation: string;
  user: string;
}) {
  return (
    <Suspense
      fallback={
        <div className="h-28 flex flex-col gap-sm sm:h-32">
          <SectionTitleSkeleton />
          <LargeSkeleton />
        </div>
      }
    >
      <UsersInfo {...{ group, evaluation, user }} />
    </Suspense>
  );
}
