import { auth } from "@clerk/nextjs";
import { SubjectWithTopic } from "@components/containers/subjectsCards/SubjectsCards";
import Table from "@components/table/Table";
import React from "react";
import { Toaster } from "react-hot-toast";
import EditableLabel from "src/app/documents/[subject]/[topic]/components/editable-label";
import api from "src/app/utils/api";
import capFirst from "src/utils/capFirst";

export default async function SubjectDashboard({
  params: { id },
}: {
  params: { id: string };
}) {
  console.log(id);
  const { data: subject } = (await api(`subjects/${id}`, {}, [
    "topics",
    `subjects/${id}`,
  ])) as {
    data: SubjectWithTopic;
  };

  const topics = subject.Topics;

  const { getToken } = auth();
  const token = await getToken();

  return (
    <>
      <EditableLabel
        tags={["subjects"]}
        endpoint={`subjects/${id}`}
        text={capFirst(subject?.name)}
        className="text-2xl text-semibold w-max"
        token={token}
      />
      <Table
        data={[["Álgebra"]]}
        head={{
          keys: [
            { name: "Nombre", key: "name" },
            { name: "", key: "" },
          ],
        }}
      />
      <Toaster />
    </>
  );
}
