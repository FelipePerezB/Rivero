import { auth } from "@clerk/nextjs";
import { File } from "@prisma/client";
import React from "react";
import DynamicElement from "src/app/subjects/components/elements/files/dynamic-file";
import api from "src/utils/api";
import DownloadBtn from "../../components/download-btn";
import { Component } from "src/app/documents/edit/models/component";
import { IdLenght } from "src/models/document.model";
import FileContainer from "src/app/subjects/components/layout/file-container/file-container";
import Section from "src/app/subjects/components/elements/files/section";
import Title from "src/app/subjects/components/elements/files/title";
export default async function DownloadFilePage({
  params: { id },
}: {
  params: { id: string };
}) {
  const { getToken } = auth();
  const token = await getToken();
  const { data } = (await api("files/" + id, {
    headers: { Authorization: `Bearer ${token}` },
  })) as { data: File };
  const content = JSON.parse(data.content);
  const sections = content?.options?.children as Component[];
  const questions = sections
    ?.map(({ options }) =>
      options.children?.filter(({ type }) => type === "question")
    )
    .flat() as Component[];
  const answers = questions?.map(
    ({ options }) => options?.expectedAns
  ) as string[];
  return (
    <>
      <FileContainer>
        <Section>
          <Title options={{ size: "h1", text: "Respuestas " + data.name }} />
          <div className="flex flex-col border w-max ">
            {answers.map((ans, i) => (
              <div className="flex border-b" key={`ans-${i}`}>
                <span className="border-r px-2 py-0.5">N° {i + 1}</span>
                <span className="px-2 py-0.5">{ans}</span>
              </div>
            ))}
          </div>
        </Section>
      </FileContainer>
      {/* <DynamicElement attrs={{ ...content, ...data }} name={content.type} /> */}
      <DownloadBtn />
    </>
  );
}
