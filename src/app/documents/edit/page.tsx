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
    {/* <h1 className="text-3xl font-bold">Documentos</h1> */}
      <StandardInput name="" dataKey="" attrs={{placeholder: "Buscar..."}}  className="sticky z-30 top-16 max-w-sm" />
      <ItemsBox size="sm">
        <DocsCards />
      </ItemsBox>
      <FloatingBtn href={`edit/${generateRandomId(32)}`}>
        <FontAwesomeIcon className="h-8 w-8" icon={faPlus} />
      </FloatingBtn>
    </>
  );
}
