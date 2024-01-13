import api from "src/utils/api";
import { Group, Organization, User } from "@prisma/client";
import dynamic from "next/dynamic";
import Section from "@components/containers/section";
import SectionTitle from "@components/common/titles/section-title";
import SmallTitle from "@components/common/titles/small-title";
import Options from "@components/navigation/options/options";
import Card from "@components/cards/Card";
import BarsChart from "@components/dashboard/charts/bars";
import { Item } from "src/app/(main)/home/page";
import ItemsBox from "@components/containers/items-box/items-box";

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
  const { data: groups } = (await api(`groups/${organizationId}`, {})) as {
    data: GroupWithusers[];
  };

  console.log(group)

  return (
    <>
      <Section>
        <div className="w-full flex justify-between">
          <SectionTitle
            subTitle="Educación de calidad al sur de Chile"
            title={`${organization?.name}`}
          />
          <div className="flex gap-2.5">
            <OrgForm
              organization={organization}
              organizationId={organizationId}
              searchParams={searchParams}
            />
          </div>
        </div>
      </Section>
      <Section>
        <SmallTitle>Grupos</SmallTitle>
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
              <SmallTitle>Usuarios nuevos</SmallTitle>
              <BarsChart
                data={[
                  { label: "Lu", value: 10 },
                  { label: "Ma", value: 15 },
                  { label: "Mi", value: 18 },
                  { label: "Ju", value: 12 },
                  { label: "Vi", value: 10 },
                  { label: "Sa", value: 2 },
                  { label: "Do", value: 0 },
                ]}
              />
            </div>
          </Card>
          <div className="flex flex-col gap-md h-full w-full md:max-w-[50%]">
            <Card className="flex justify-between h-full">
              <Item subtitle="Estudiantes" title="40" />
              <Item subtitle="Docentes" title="7" />
              {!group && <Item subtitle="Grupos" title={groups?.length} />}
            </Card>
            <Card>
              <ItemsBox size="xs">
                <Item subtitle="Metamática" title="860" />
                <Item subtitle="Lenguaje" title="760" />
                <Item subtitle="Historia" title="900" />
                <Item subtitle="Historia" title="900" />
                <Item subtitle="Ciencias" title="820" />
              </ItemsBox>
            </Card>
          </div>
        </div>
      </Section>
    </>
  );
}
