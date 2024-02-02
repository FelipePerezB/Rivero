import { auth } from "@clerk/nextjs";
import StandardInput from "@components/form/StandardInput/StandardInput";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DocsCards from "@components/containers/docs-cards/docs-cards";
import ItemsBox from "@components/containers/items-box/items-box";
import FloatingBtn from "@components/common/buttons/floating-btn/floating-btn";
// import StandardInput from "src/app/components/inputs/standard";
import api from "src/utils/api";
import generateRandomId from "src/utils/generateRandomId";
import Section from "@components/containers/section";
import SectionTitle from "@components/common/titles/section-title/section-title";

export default async function EditFilesPage() {
  const { getToken } = auth();
  const token = await getToken();
  const { data: files } = (await api("users/notes", {
    headers: { Authorization: `Bearer ${token}` },
  })) as {
    data: any;
  };
  return (
    <>
      <Section>
        <div className="flex flex-col md:flex-row gap-md justify-between md:items-center md:justify-start sticky z-30 top-16">
        <SectionTitle
          title="Documentos"
          subTitle="Crea y modifica documentos "
        />
        <StandardInput
          name=""
          dataKey=""
          attrs={{ placeholder: "Buscar..." }}
          className="max-w-sm"
        />

        </div>
      </Section>
      <Section>
        <ItemsBox size="sm">
          <DocsCards />
        </ItemsBox>
      </Section>
      <FloatingBtn href={`edit/${generateRandomId(32)}`}>
        <FontAwesomeIcon className="h-8 w-8" icon={faPlus} />
      </FloatingBtn>
      {/* <h1 className="text-3xl font-bold">Documentos</h1> */}
    </>
  );
}
