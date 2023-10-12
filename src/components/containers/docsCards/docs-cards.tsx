'use client'
import Card from "@components/Card";
import GetComponent from "@components/create-components/edit-document/get-component";
import useGetLocalDocs from "src/hooks/useGetLocalDocs";
import { DocumentJSON } from "src/models/document.model";

export default function DocsCards({
  docs,
  search,
}: {
  docs?: {}[];
  search?: string;
}) {
  const savedDocs = [...useGetLocalDocs(10), ...useGetLocalDocs(10), ...useGetLocalDocs(10), ...useGetLocalDocs(10), ...useGetLocalDocs(10), ...useGetLocalDocs(10), ...useGetLocalDocs(10)];
  return (
    <>
      {savedDocs?.map((doc, i) => {
        const document = doc as DocumentJSON;
        if (
          search &&
          !document.file.title.toLowerCase().includes(search.toLowerCase())
        )
          return;
        return (
          <Card
            key={`doc-card-${i}`}
            interactive
            href={`docs/edit/${document?.file?.externalId}`}
            className="relative max-w-[8rem] w-4/12 sm:w-32 aspect-[4/5] text-xs overflow-hidden"
          >
            <div className="absolute top-0 left-0 flex flex-col justify-end w-full h-full p-2 hover:bg-slate-100 z-20 hover:first:opacity-100 first:opacity-0 transition-all duration-150">
              <span className="font-semibold text-base">
                {document.file.title}
              </span>
            </div>
            <div className="absolute w-full h-full text-[4px] top-0 left-0 scale-[101%]">
              <GetComponent
                attrs={{
                  options: document?.file?.content?.options,
                  title: document?.file?.title,
                }}
                name={"document"}
                folder="documents"
              />
            </div>
          </Card>
        );
      })}
    </>
  );
}