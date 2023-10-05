import Practice from "@components/create-components/components/practice/document";
import GetComponent from "@components/create-components/edit-document/get-component";
import React from "react";
import getFile from "src/app/utils/getFile";
import { DocumentJSON } from "src/models/document.model";

export default async function Page(props: {
  searchParams: { [key: string]: string };
  params: { id: string };
}) {
  console.log("AA");
  const { file } = (await getFile(props.params.id)) as DocumentJSON;
  return (
    <Practice
      type="document"
      id=""
      searchParams={props.searchParams}
      title={file.title}
      options={{ children: file.content.options.children as [] }}
    />
    // <GetComponent
    //   attrs={{
    //     ...file.content,
    //     title: file.title,
    //     searchParams: props.searchParams,
    //   }}
    //   name={"document"}
    //   folder="practice"
    // />
  );
}
