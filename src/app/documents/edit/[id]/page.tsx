"use client";
import { Privacity } from "@prisma/client";
import React, { useRef, useState } from "react";
import EditWraper, { ComponentObj } from "src/app/components/edit-wraper/edit-wraper";
import { hydrateJSON } from "src/utils/create-doc/hydrate.JSON";
import Document from "@components/create-components/components/documents/document";
const getDefaultFile = (id: string) => {
  return {
    file: {
      externalId: id,
      title: "Nuevo documento",
      privacity: Privacity.PRIVATE,
      content: {
        type: "document",
        options: {
          children: [
            {
              type: "page",
              options: {
                number: 1,
                children: [
                  {
                    type: "title",
                    options: {
                      text: "Título 1",
                      size: "h1",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 2",
                      size: "h2",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 1",
                      size: "h1",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 2",
                      size: "h2",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 1",
                      size: "h1",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 2",
                      size: "h2",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 1",
                      size: "h1",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 2",
                      size: "h2",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 1",
                      size: "h1",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 2",
                      size: "h2",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 1",
                      size: "h1",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 2",
                      size: "h2",
                    },
                  },
                ],
              },
            },
            {
              type: "page",
              options: {
                number: 1,
                children: [
                  {
                    type: "title",
                    options: {
                      text: "Título 1",
                      size: "h1",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 2",
                      size: "h2",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 1",
                      size: "h1",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 2",
                      size: "h2",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 1",
                      size: "h1",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 2",
                      size: "h2",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 1",
                      size: "h1",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 2",
                      size: "h2",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 1",
                      size: "h1",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 2",
                      size: "h2",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 1",
                      size: "h1",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 2",
                      size: "h2",
                    },
                  },
                ],
              },
            },
            {
              type: "page",
              options: {
                number: 1,
                children: [
                  {
                    type: "title",
                    options: {
                      text: "Título 1",
                      size: "h1",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 2",
                      size: "h2",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 1",
                      size: "h1",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 2",
                      size: "h2",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 1",
                      size: "h1",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 2",
                      size: "h2",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 1",
                      size: "h1",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 2",
                      size: "h2",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 1",
                      size: "h1",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 2",
                      size: "h2",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 1",
                      size: "h1",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 2",
                      size: "h2",
                    },
                  },
                ],
              },
            },
            {
              type: "page",
              options: {
                number: 1,
                children: [
                  {
                    type: "title",
                    options: {
                      text: "Título 1",
                      size: "h1",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 2",
                      size: "h2",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 1",
                      size: "h1",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 2",
                      size: "h2",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 1",
                      size: "h1",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 2",
                      size: "h2",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 1",
                      size: "h1",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 2",
                      size: "h2",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 1",
                      size: "h1",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 2",
                      size: "h2",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 1",
                      size: "h1",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 2",
                      size: "h2",
                    },
                  },
                ],
              },
            },
            {
              type: "page",
              options: {
                number: 1,
                children: [
                  {
                    type: "title",
                    options: {
                      text: "Título 1",
                      size: "h1",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 2",
                      size: "h2",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 1",
                      size: "h1",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 2",
                      size: "h2",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 1",
                      size: "h1",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 2",
                      size: "h2",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 1",
                      size: "h1",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 2",
                      size: "h2",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 1",
                      size: "h1",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 2",
                      size: "h2",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 1",
                      size: "h1",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 2",
                      size: "h2",
                    },
                  },
                ],
              },
            },
            {
              type: "page",
              options: {
                number: 1,
                children: [
                  {
                    type: "title",
                    options: {
                      text: "Título 1",
                      size: "h1",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 2",
                      size: "h2",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 1",
                      size: "h1",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 2",
                      size: "h2",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 1",
                      size: "h1",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 2",
                      size: "h2",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 1",
                      size: "h1",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 2",
                      size: "h2",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 1",
                      size: "h1",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 2",
                      size: "h2",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 1",
                      size: "h1",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 2",
                      size: "h2",
                    },
                  },
                ],
              },
            },
            {
              type: "page",
              options: {
                number: 1,
                children: [
                  {
                    type: "title",
                    options: {
                      text: "Título 1",
                      size: "h1",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 2",
                      size: "h2",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 1",
                      size: "h1",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 2",
                      size: "h2",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 1",
                      size: "h1",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 2",
                      size: "h2",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 1",
                      size: "h1",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 2",
                      size: "h2",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 1",
                      size: "h1",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 2",
                      size: "h2",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 1",
                      size: "h1",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 2",
                      size: "h2",
                    },
                  },
                ],
              },
            },
            {
              type: "page",
              options: {
                number: 1,
                children: [
                  {
                    type: "title",
                    options: {
                      text: "Título 1",
                      size: "h1",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 2",
                      size: "h2",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 1",
                      size: "h1",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 2",
                      size: "h2",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 1",
                      size: "h1",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 2",
                      size: "h2",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 1",
                      size: "h1",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 2",
                      size: "h2",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 1",
                      size: "h1",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 2",
                      size: "h2",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 1",
                      size: "h1",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 2",
                      size: "h2",
                    },
                  },
                ],
              },
            },
            {
              type: "page",
              options: {
                number: 1,
                children: [
                  {
                    type: "title",
                    options: {
                      text: "Título 1",
                      size: "h1",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 2",
                      size: "h2",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 1",
                      size: "h1",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 2",
                      size: "h2",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 1",
                      size: "h1",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 2",
                      size: "h2",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 1",
                      size: "h1",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 2",
                      size: "h2",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 1",
                      size: "h1",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 2",
                      size: "h2",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 1",
                      size: "h1",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 2",
                      size: "h2",
                    },
                  },
                ],
              },
            },
            {
              type: "page",
              options: {
                number: 1,
                children: [
                  {
                    type: "title",
                    options: {
                      text: "Título 1",
                      size: "h1",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 2",
                      size: "h2",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 1",
                      size: "h1",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 2",
                      size: "h2",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 1",
                      size: "h1",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 2",
                      size: "h2",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 1",
                      size: "h1",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 2",
                      size: "h2",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 1",
                      size: "h1",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 2",
                      size: "h2",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 1",
                      size: "h1",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 2",
                      size: "h2",
                    },
                  },
                ],
              },
            },
            {
              type: "page",
              options: {
                number: 1,
                children: [
                  {
                    type: "title",
                    options: {
                      text: "Título 1",
                      size: "h1",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 2",
                      size: "h2",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 1",
                      size: "h1",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 2",
                      size: "h2",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 1",
                      size: "h1",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 2",
                      size: "h2",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 1",
                      size: "h1",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 2",
                      size: "h2",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 1",
                      size: "h1",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 2",
                      size: "h2",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 1",
                      size: "h1",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 2",
                      size: "h2",
                    },
                  },
                ],
              },
            },
            {
              type: "page",
              options: {
                number: 1,
                children: [
                  {
                    type: "title",
                    options: {
                      text: "Título 1",
                      size: "h1",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 2",
                      size: "h2",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 1",
                      size: "h1",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 2",
                      size: "h2",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 1",
                      size: "h1",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 2",
                      size: "h2",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 1",
                      size: "h1",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 2",
                      size: "h2",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 1",
                      size: "h1",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 2",
                      size: "h2",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 1",
                      size: "h1",
                    },
                  },
                  {
                    type: "title",
                    options: {
                      text: "Título 2",
                      size: "h2",
                    },
                  },
                ],
              },
            },
          ],
        },
      },
    },
  };
};

export default function EditFilePage({
  params,
  searchParams,
}: {
  params: {
    id: string;
  };
  searchParams: {
    sidebar: string;
  };
}) {
  const divRef = useRef<HTMLDivElement>(null);
  const defaultFile = getDefaultFile(params.id);
  const [document, setDocument] = useState<ComponentObj>(
    hydrateJSON(defaultFile.file.externalId, defaultFile.file.content)
  );
  
  return (
    <>
      <EditWraper
        fileRef={divRef}
        file={document}
        setFile={setDocument}
        id={params.id}
      />
      <div ref={divRef}>
        <Document
          type="document"
          id={document.id as string}
          options={{ ...document.options }}
          title={defaultFile.file.title}
        />
      </div>
    </>
  );
}
