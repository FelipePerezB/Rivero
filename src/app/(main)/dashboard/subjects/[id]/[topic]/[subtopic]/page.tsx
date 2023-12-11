import { File, Privacity, Subtopic, Topic, Types, Note } from "@prisma/client";
import api from "src/utils/api";
import CreateFileBtn from "./components/create-file-btn/create-file-btn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import DeleteBtn from "@components/admin/delete-btn/delete-btn";
import SearchModal from "@components/modal/search-modal";
import UpdateForm from "@components/admin/update-form/update-form";
import Table from "@components/dashboard/table/Table";
import TableBtn from "@components/dashboard/table/table-btn/table-btn";
import Options from "@components/navigation/options/options";
import capFirst from "src/utils/capFirst";

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
            <TableBtn href={`?modal=modify-subtopic&name=${subtopic?.name}&id=${subtopic?.id}`} key={"edit-btn"}>
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
