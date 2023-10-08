import SubjectsCards, {
  SubjectWithTopic,
} from "@components/containers/subjectsCards/SubjectsCards";
import ItemsBox from "../components/items-box/items-box";
import DocsCards from "@components/containers/docsCards/docs-cards";
import api from "../utils/api";

export default async function DocumentsPage() {
  const { subjects } = (await api("subjects")) as {
    subjects: SubjectWithTopic[];
  };
  return (
    <>
      <h2 className={"text-2xl font-bold pb-0.5"}>Asignaturas</h2>
      <ItemsBox>
        <SubjectsCards subjects={subjects} />
      </ItemsBox>
      <h2 className={"text-2xl font-bold pb-0.5 pt-1"}>Mis documentos</h2>
      <ItemsBox size="sm">
        <DocsCards />
      </ItemsBox>
    </>
  );
}
