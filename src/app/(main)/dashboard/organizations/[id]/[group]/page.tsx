import api from "src/utils/api";
import { Group, Organization, Role, Subject, User } from "@prisma/client";
import dynamic from "next/dynamic";
import Section from "@components/containers/section";
import SectionTitle from "@components/common/titles/section-title";
import SmallTitle from "@components/common/titles/small-title";
import Options from "@components/navigation/options/options";
import Card from "@components/cards/Card";
// import { Item } from "src/app/(main)/home/page";
import ItemsBox from "@components/containers/items-box/items-box";
import capFirst from "src/utils/capFirst";
import Table from "@components/dashboard/table/Table";
import DeleteBtn from "@components/admin/delete-btn/delete-btn";
import SearchModal from "@components/modal/search-modal";
import RemoveGroupBtn from "./components/remove-group-btn";
import UpdateUserForm from "./components/forms/update-user-form";
import UpdateSearchModal from "@components/admin/update-form/update-search-modal";
import InviteForm from "./components/forms/Invite";
import Link from "next/link";
import getAvg from "src/utils/maths/getAvg";
import BarsChart from "@components/dashboard/charts/bars/bars";
import { ReactNode, Suspense } from "react";
import Item from "@components/dashboard/item";
import ScoresChart from "./components/scores-chart";
import StatsCard from "@components/cards/stats-card";
import Button from "@components/common/buttons/button/button";

interface GroupWithusers extends Group {
  Users: User[];
}

export default async function AllGroupsOrganizationPage({
  params: { id: organizationId, group },
  searchParams,
}: {
  searchParams: { [key: string]: string };
  params: { [key: string]: string };
}) {
  const endpoint = `organizations/${organizationId}`;
  const { data: organization } = (await api(endpoint, {}, [endpoint])) as {
    data: Organization;
  };

  const OrgForm = dynamic(() => import("../org-form"));
  const { data: groups } = (await api(`groups/${organizationId}`, {}, [
    endpoint, `groups/${organizationId}`
  ])) as {
    data: GroupWithusers[];
  };

  const ENDPOINT = `groups/${organizationId}/${group}`;
  const groupData = groups.find(({ id }) => id === Number(group));
  // group !== "all"
  //   ? ((await api(ENDPOINT, {}, [TAG])) as {
  //       data?: GroupWithUsers;
  //     })
  //   : { data: undefined };

  const students = groupData
    ? groupData?.Users.filter(({ role }) => role === Role.STUDENT).length
    : groups
        .flatMap(({ Users }) => Users)
        .filter(({ role }) => role === Role.STUDENT)?.length;

  const teachers = groupData
    ? groupData?.Users.filter(({ role }) => role === Role.TEACHER).length
    : groups
        .flatMap(({ Users }) => Users)
        .filter(({ role }) => role === Role.TEACHER)?.length;

  const { subjects } = (await api(`subjects`, {}, ["subjects"])) as {
    subjects: Subject[];
  };

  const { data: scores } = (await api(
    `scores/${organization}?group=${group !== "all" ? group : ""}`,
    {
      cache: "no-store",
    },
    [`scores/organizations/${organization}`]
  )) as {
    data: {
      [subjectId: string]: {
        value: number;
        time: string;
      }[];
    };
  };

  const subjectsWithScores = subjects.map((subject) => ({
    ...subject,
    scores: scores[subject?.id],
  }));

  const flatArray = Object.values(scores).flat(2);

  const today = new Date().toISOString().split("T")[0];

  // Filtramos los objetos que tienen la misma fecha que la fecha actual
  const scoresOfToday = flatArray.filter((item) => item.time === today)?.length;

  return (
    <>
      <Section>
        <SectionTitle
          subTitle="Educación de calidad al sur de Chile"
          title={`${organization?.name}`}
        />
      </Section>
      <Section>
        <div className="w-full flex justify-between">
          <SmallTitle>Grupos</SmallTitle>
          <div className="flex gap-sm">
            {groupData?.id ? (
              <UpdateSearchModal
                data={{ ...groupData }}
                endpoint={ENDPOINT}
                label="grupo"
                searchParams={searchParams}
                secondaryBtn={
                  <DeleteBtn
                    size="md"
                    name={groupData?.name}
                    endpoint={ENDPOINT}
                  />
                }
              >
                <hr />
              </UpdateSearchModal>
            ) : (
              <OrgForm
                organization={organization}
                organizationId={organizationId}
                searchParams={searchParams}
              />
            )}
            <Button color="white" href={`${group}/invitations/pending`}>
              Invitaciones
            </Button>
          </div>
        </div>
        <Options
          option={group ?? "all"}
          options={[
            { key: "all", title: "Todos" },
            ...groups.map(({ name, id }) => ({ key: id, title: name })),
          ]}
        />
        <div className="flex w-full flex-col sm:flex-row h-max gap-md">
          <Card>
            <div className="flex flex-col min-w-[200px] h-48 sm:h-full">
              <SmallTitle>Evaluaciones revisadas</SmallTitle>
              <Suspense fallback={<p>LOading..</p>}>
                <ScoresChart scores={flatArray} />
              </Suspense>
            </div>
          </Card>
          <div className="flex flex-col gap-md h-full w-full md:max-w-[50%]">
            <StatsCard>
              <Item subtitle="Estudiantes" title={students} />
              <Item subtitle="Evaluaciones hoy" title={scoresOfToday} />
              <Item subtitle="Docentes" title={teachers} />
              {!group && <Item subtitle="Grupos" title={groups?.length} />}
            </StatsCard>

            <Card>
              <ItemsBox size="xs">
                {subjectsWithScores?.map(({ id, name, scores }) => (
                  <Link
                    className="w-max hover:bg-slate-100 p-1 hover:scale-95 transition-all duration-150 rounded-sm"
                    key={`evaluation-score-${id}-${organizationId}`}
                    href={`/subjects/${id}/evaluations/${organizationId}/all`}
                  >
                    <Item
                      subtitle={capFirst(name)}
                      title={
                        !!scores
                          ? getAvg(scores?.map(({ value }) => value))
                          : "---"
                      }
                    />
                  </Link>
                ))}
              </ItemsBox>
            </Card>
          </div>
        </div>
      </Section>
      {groupData?.id && (
        <>
          <GroupTable
            groupData={groupData}
            role={Role.STUDENT}
            name="Estudiantes"
          />
          <GroupTable
            groupData={groupData}
            role={Role.TEACHER}
            name="Docentes"
          />
        </>
      )}
      <SearchModal
        title="Actualizar usuario"
        id="update-user"
        searchParams={searchParams}
      >
        {searchParams?.email && (
          <RemoveGroupBtn group={group} email={searchParams?.email} />
        )}
        <UpdateUserForm
          email={searchParams?.email}
          name={searchParams?.name}
          lastname={searchParams?.lastname}
        />
      </SearchModal>
    </>
  );
}

interface GroupWithUsers extends Group {
  Users: User[];
}

function GroupTable({
  name,
  role: tableRole,
  groupData,
}: {
  name: string;
  role: Role;
  groupData: GroupWithUsers;
}) {
  const users = groupData?.Users?.filter(({ role }) => role === tableRole).map(
    ({ email, name, lastname }) => [
      capFirst(name),
      capFirst(lastname ?? ""),
      email,
    ]
  );
  return (
    <Table
      onClickHref="?modal=update-user&name=[name]&lastname=[lastname]&email=[email]"
      head={{
        title: capFirst(name),
        keys: [
          { name: "Nombre", key: "name" },
          { name: "Apellido", key: "lastname" },
          { name: "Correo", key: "email" },
        ],
      }}
      data={users}
    />
  );
}
