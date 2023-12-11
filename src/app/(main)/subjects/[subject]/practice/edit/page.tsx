import React from "react";
import EditWraper from "src/app/documents/edit/components/edit-wraper";
import getPractice from "../components/get-practice";

export default async function EditPracticePage({
  params: { subject },
}: {
  params: { subject: string };
}) {
  const note = await getPractice({ subject });
  const content = JSON.parse(note?.File?.content ?? "{}");
  return (
    <>
      <EditWraper
        document={{
          ...note,
          // subjectId: subject,
            ...note?.File,
            content
          // },
        }}
        id={note?.File.externalId as string}
      />
    </>
  );
}
