import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { api } from "src/getDoc/utils/api";
import GetWebNode from "src/schemas/web";

export default function Document() {
  const router = useRouter();
  const { query } = router;
  const [config, setConfig] = useState<
    | {
        component: any;
      }
    | undefined
  >(undefined);
  useEffect(() => {
    const { title, topic, id } = query;
    const getData = async () => {
      let content;
      try {
        throw new Error("AAA");
        const res = await api.get(`docs/${query.id}`);
        content = res.data.content;
      } catch (error) {
        const stringifyData = localStorage.getItem(`doc-${id}`);
        if (stringifyData) {
          content = JSON.parse(stringifyData);
        }
      }

      content &&
        setConfig({
          ...config,
          component: content,
        });
    };
    query.id && getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.id]);

  const content = {
    type: "doc",
    options: {
      id: "CID71632832",
      children: [
        {
          type: "page",
          options: {
            id: "CID63726726",
            children: [
              {
                type: "docInfo",
                options: {
                  id: "CID812889282",
                  title: "SISTEMA DE ECUACIONES",
                  subtitle: "EJE: ALGEBRA",
                },
              },
              {
                type: "div",
                options: {
                  id: "CID812839282",
                  children: [
                    {
                      type: "exercises",
                      options: {
                        id: "CID570859070",
                        children: [
                          {
                            type: "question",
                            options: {
                              id: "CID294958634",
                              question:
                                "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit quod a, incidunt rem expedita quisquam.",
                              alternatives:
                                "Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet.,Lorem ipsum dolor sit amet.,Lorem ipsum dolor sit amet.",
                              child: [],
                            },
                          },
                        ],
                        startsIn: "1",
                        isAnEvaluation: false,
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
      ],
    },
  };

  // return <GetWebNode component={content}/>;
  if (config?.component) return <GetWebNode {...config} />;
  // return <Edit nodes={webNodes} saveDoc={() => {}} doc={content} />;
}
