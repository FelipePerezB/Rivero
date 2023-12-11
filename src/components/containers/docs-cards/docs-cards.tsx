'use client'
import Card from "@components/cards/Card";
import { NoteWithComponent } from "src/app/documents/edit/models/component";
import DynamicElement from "src/app/(main)/subjects/components/elements/files/dynamic-file";
// import GetComponent from "@components/create-components/edit-document/get-component";
import useGetLocalDocs from "src/hooks/useGetLocalDocs";
import { DocumentJSON } from "src/models/document.model";

export default function DocsCards({
  docs,
  search,
}: {
  docs?: {}[];
  search?: string;
}) {
  const savedDocs = [...useGetLocalDocs(100)];
  return (
    <>
      {savedDocs?.map((doc, i) => {
        const document = doc as NoteWithComponent['file'];
        if (
          search && document?.name &&
          !document.name.toLowerCase().includes(search.toLowerCase())
        )
          return;
        return (
          <Card
            key={`doc-card-${i}`}
            interactive
            href={`edit/${document?.externalId}`}
            className="relative w-4/12 sm:w-32 aspect-[4/5] text-xs overflow-hidden"
          >
            <div className="absolute top-0 left-0 flex flex-col justify-end w-full h-full p-2 hover:bg-slate-100 z-20 hover:first:opacity-100 first:opacity-0 transition-all duration-150">
              <span className="font-semibold text-base">
                {document.name}
              </span>
            </div>
            <div className="absolute w-full text-[3px]/[5px] top-0 left-0 scale-[102%]">
              <DynamicElement
                attrs={{
                  options: document?.content?.options,
                  name: document?.name,
                }}
                name={"document"}
              />
            </div>
          </Card>
        );
      })}
    </>
  );
}
