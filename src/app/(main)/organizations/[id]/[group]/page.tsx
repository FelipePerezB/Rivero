import api from "src/utils/api";
import { Group, Organization, Role, Subject, User } from "@prisma/client";
import dynamic from "next/dynamic";
import Section from "@components/containers/section";
import SectionTitle from "@components/common/titles/section-title/section-title";
import SmallTitle from "@components/common/titles/small-title";
import Options from "@components/navigation/options/options";
import Card from "@components/cards/Card";
import ItemsBox from "@components/containers/items-box/items-box";
import capFirst from "src/utils/capFirst";
import Table, { Row } from "@components/dashboard/table/Table";
import DeleteBtn from "@components/admin/delete-btn/delete-btn";
import UpdateSearchModal from "@components/admin/update-form/update-search-modal";
import Link from "next/link";
import getAvg from "src/utils/maths/getAvg";
import { ReactNode, Suspense } from "react";
import Item from "@components/dashboard/item";
import ScoresChart from "./components/scores-chart";
import StatsCard from "@components/cards/stats-card/stats-card";
import Button from "@components/common/buttons/button/button";
import RemoveUserWrapper from "../../components/remove-user-wrapper";
import formatScores, { ScoresWithGroup } from "src/utils/format/formatScores";
import OrganizationProtect from "@components/admin/protect/organization-protect";
import { auth } from "@clerk/nextjs";

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

  const { getToken } = auth();
  const token = await getToken();
  const { data: groups } = (await api(
    `groups/${organizationId}`,
    { cache: "no-store", 
    headers: { Authorization: `Bearer ${token}` } 
  },
    [endpoint, `groups/${organizationId}`]
  )) as {
    data: GroupWithusers[];
  };

  const ENDPOINT = `groups/${organizationId}/${group}`;
  const groupData = groups.find(({ id }) => id === Number(group));

  const students = groupData
    ? groupData?.Users?.filter(({ role }) => role === Role.STUDENT).length
    : groups
        .flatMap(({ Users }) => Users)
        .filter(({ role }) => role === Role.STUDENT)?.length;

  const teachers = groupData
    ? groupData?.Users?.filter(({ role }) => role === Role.TEACHER).length
    : groups
        .flatMap(({ Users }) => Users)
        .filter(({ role }) => role === Role.TEACHER)?.length;

  const { subjects } = (await api(`subjects`, {}, ["subjects"])) as {
    subjects: Subject[];
  };

  const { data: unFormatedScores } = (await api(
    `scores/${organizationId}/${group !== "all" ? `group/${group}` : ""}`,
    {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    },
    [`scores/organizations/${organization}`]
  )) as {
    data: ScoresWithGroup[];
  };
  const scores = formatScores(unFormatedScores);
  const subjectsWithScores = scores
    ? subjects.map((subject) => ({
        ...subject,
        scores: scores[subject?.id],
      }))
    : [];

  return (
    <OrganizationProtect organizationId={organizationId}>
      <Section>
        <SectionTitle
          subTitle="Educación de calidad al sur de Chile"
          title={`${organization?.name}`}
        />
      </Section>
      <Section>
        <div className="w-full flex justify-between">
          <SmallTitle>Grupos</SmallTitle>
          {groupData?.id ? (
            <div className="flex gap-sm">
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
              <Button color="white" href={`${group}/invitations/all`}>
                Invitaciones
              </Button>
            </div>
          ) : (
            <OrgForm
              organization={organization}
              organizationId={organizationId}
              searchParams={searchParams}
            />
          )}
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
                <ScoresChart scores={unFormatedScores} />
              </Suspense>
            </div>
          </Card>
          <div className="flex flex-col gap-md h-full w-full md:max-w-[50%]">
            <StatsCard>
              <Item subtitle="Estudiantes" title={students} />
              <Item subtitle="Puntajes" title={unFormatedScores?.length} />
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
    </OrganizationProtect>
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
    ({ email, name, lastname, externalId }) => [
      externalId,
      capFirst(name),
      capFirst(lastname ?? ""),
      email,
    ]
  );
  const RemoveUserWrapperWithGroup = ({
    children,
    row,
    className,
  }: {
    className: string;
    row: Row;
    children: ReactNode;
  }) => (
    <RemoveUserWrapper row={row} group={groupData?.id} className={className}>
      {children}
    </RemoveUserWrapper>
  );

  return (
    <Table
      OnClickWrapper={RemoveUserWrapperWithGroup}
      onClickHref="?modal=update-user&name=[name]&lastname=[lastname]&email=[email]"
      head={{
        title: capFirst(name),
        keys: [
          { name: "ID", key: "id", hidden: true },
          { name: "Nombre", key: "name" },
          { name: "Apellido", key: "lastname" },
          { name: "Correo", key: "email" },
        ],
      }}
      data={users}
    />
  );
}
