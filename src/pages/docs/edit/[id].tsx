import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Edit from "src/getDoc/Edit";
import { api } from "src/getDoc/utils/api";
import { CreateDocDocument } from "src/gql/graphql";
import { pdfNodes } from "src/schemas";
import { client } from "src/service/client";

type props = { type: string; options: any };

export default function EditPage() {
  const router = useRouter();
  const { query } = router;
  const [config, setConfig] = useState({});
  useEffect(() => {
    const { title, topic } = query;
    const getData = async () => {
      let content;
      try {
        throw new Error("A");
        const res = await api.get(`docs/${query.id}`);
        content = res.data.content;
      } catch (error) {
        const stringifyData = localStorage.getItem(`doc-${query.id}`);
        if (stringifyData) {
          content = JSON.parse(stringifyData);
        }
      }
      content &&
        setConfig({
          ...config,
          doc: content,
        });
    };
    query.id && query.id !== "N" && getData();
    if (query.id === "N") {
      setConfig({
        ...config,
        options: {
          category: "EJE: " + topic,
          title,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.id]);

  const saveDoc = (doc: any) => {
    const { title, topic } = query as {
      title: string;
      topic: string;
    };
    if (query.id === "N") {
      const createDoc = async () => {
        localStorage.setItem(`${title}`, JSON.stringify(doc));
        try {
          const { data } = await client.mutate({
            mutation: CreateDocDocument,
            variables: {
              createDocInput: {
                topic: {
                  connect: {
                    name: topic,
                  },
                },
                type: "doc",
                title,
                content: doc,
                author: {
                  connect: {
                    id: 1,
                  },
                },
              },
            },
          });
          // if (data?.createDoc?.id) router.push(`/docs/edit/${data.createDoc.id}`);
        } catch (error) {
          console.error(error);
        }
      };
      createDoc();
    } else if (query.id) {
      const updateDoc = async () => {
        localStorage.setItem(`doc-${query.id}`, JSON.stringify(doc));
        try {
          const res = await api.put(`docs/${query.id}`, {
            content: doc,
          });
        } catch (error) {
          console.error(error);
        }
      };
      updateDoc();
    }
  };
  return <Edit nodes={pdfNodes} saveDoc={saveDoc} {...config} />;
}
