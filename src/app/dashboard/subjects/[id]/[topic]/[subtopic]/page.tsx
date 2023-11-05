import Button from "@components/Button";
import Table from "@components/table/Table";
import { File, Privacity, Subtopic, Topic, Types, Note } from "@prisma/client";
import Options from "src/app/components/options/options";
import api from "src/app/utils/api";
import capFirst from "src/utils/capFirst";
import CreateFileBtn from "./components/create-file-btn/create-file-btn";
import TableBtn from "@components/table/table-btn/table-btn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import DeleteBtn from "src/app/components/admin/delete-btn/delete-btn";
import ModifySubtopic from "../components/modify-subtopic/modify-subtopic";
import SearchModal from "src/app/components/modal/search-modal";
import UpdateForm from "src/app/components/admin/update-form/update-form";

interface SubtopicWithFile extends Subtopic {
  File: File[];
}
interface NoteWithFile extends Subtopic {
  File: File;
}

export default async function SubtopicPage({
  params: { topic: topicId, subtopic: subtopicId },
  searchParams,
}: {
  params: { id: string; topic: string; subtopic: string };
  searchParams: { [key: string]: string };
}) {
  const { data: topic } = (await api(`topics/${topicId}`, {}, [
    `topics/${topicId}`,
  ])) as {
    data: Topic;
  };
  const { data: subtopic } = (await api(`subtopics/${subtopicId}`, {}, [
    `subtopics/${subtopicId}`,
  ])) as { data: SubtopicWithFile };

  const { data: subtopics } = (await api(`subtopics?topic=${topicId}`, {}, [
    `subtopics/${subtopicId}`,
  ])) as { data: Subtopic[] };

  const { data: files } = (await api(
    `notes?subtopic=${subtopicId}&type=${Types.DOCUMENT}`,
    { cache: "no-store" }
  )) as { data: NoteWithFile[] };
  return (
    <>
      <h2 className="text-2xl text-semibold w-max">{capFirst(topic?.name)}</h2>
      <Options
        options={subtopics?.map(({ name, id }) => ({
          key: id,
          title: capFirst(name),
        }))}
        option={subtopicId}
      />
      <Table
        onClickHref={`/documents/edit/[id]`}
        data={files?.map(({ File: {name, externalId} }) => [
          externalId,
          capFirst(name),
          "Público",
        ])}
        head={{
          icons: [
            <CreateFileBtn key={"create-file-alert"} subtopicId={subtopicId} />,
            <TableBtn href="?modal=modify-subtopic" key={"edit-btn"}>
              <FontAwesomeIcon className="h-2.5 w-2.5" icon={faPen} />
            </TableBtn>,
          ],
          title: capFirst(subtopic?.name),
          keys: [
            { name: "Id", key: "id" },
            { name: "Nombre", key: "name" },
            { name: "Privacidad", key: "privacity" },
          ],
        }}
      />
      <SearchModal
        id="modify-subtopic"
        title="Modificar subtópico"
        searchParams={searchParams}
      >
        <UpdateForm
          endpoint={`subtopics/${searchParams?.id}`}
          id={String(searchParams?.id)}
          name={searchParams?.name}
          privacity={Privacity.PRIVATE}
          secondaryBtn={
            <DeleteBtn endpoint={`subtopics/${searchParams?.id}`} size="md" />
          }
        />
      </SearchModal>
    </>
  );
}
