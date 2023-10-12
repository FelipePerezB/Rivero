import { auth } from "@clerk/nextjs";
import DocsCards from "@components/containers/docsCards/docs-cards";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FloatingBtn from "src/app/components/floating-btn/floating-btn";
import StandardInput from "src/app/components/inputs/standard";
import ItemsBox from "src/app/components/items-box/items-box";
import Options from "src/app/components/options/options";
import api from "src/app/utils/api";
import generateRandomId from "src/utils/generateRandomId";

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
      <StandardInput className="sticky z-30 top-16" />
      <Options
        options={[
          {
            key: "all",
            title: "Todos",
          },
          {
            key: "notes",
            title: "Apuntes",
          },
          {
            key: "evaluations",
            title: "Evaluaciones",
          },
          {
            key: "practice",
            title: "Ejercitacion",
          },
        ]}
      />
      {/* <hr></hr> */}
      <ItemsBox size="sm">
        <DocsCards />
      </ItemsBox>
      <FloatingBtn href={`edit/${generateRandomId(32)}`} >
        <FontAwesomeIcon className="h-8 w-8" icon={faPlus}/>
      </FloatingBtn>
    </>
  );
}
