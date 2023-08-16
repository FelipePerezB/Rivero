import React, { ReactNode, useEffect, useState } from "react";
import Layout from "src/layout/Layout";
import styles from "@styles/Community.module.css";
import Recomendations from "@components/Recomendations";
import GetDoc from "src/getDoc/GetDoc";
import ConfigButton from "@components/ConfigButton";
import { faComment, faMessage } from "@fortawesome/free-solid-svg-icons";

export default function Docs() {
  const [filter, setFilter] = useState("all");
  const questions = [
    {
      title: "¿Cual es el lado opuesto de la luna?",
      doc: "Sistema de ecuaciones",
    },
    {
      title: "¿Cual es el lado opuesto de la luna?",
      doc: "Sistema de ecuaciones",
    },
    {
      title: "¿Cual es el lado opuesto de la luna?",
      doc: "Sistema de ecuaciones",
    },
  ];

  const docs = [
    {
      title: "Sistema de ecuaciones",
      doc: "AAAAAA",
    },
    {
      title: "¿Cual es el lado opuesto de la luna?",
      doc: "Sistema de ecuaciones",
    },
    {
      title: "¿Cual es el lado opuesto de la luna?",
      doc: "Sistema de ecuaciones",
    },
  ];

  const data = {
    id: "7",
    name: "Sistema de ecuaciones",
    subtitle: "AAAAA",
    component: {
      type: "doc",
      options: {
        id: "CID812919622",
        children: [
          {
            type: "page",
            options: {
              id: "CID812819282",
              children: [
                {
                  type: "docInfo",
                  options: {
                    id: "CID812889282",
                    title: "SISTEMA DE ECUACIONES",
                    subtitle: "EJE: ALGEBRA",
                  },
                },
              ],
            },
          },
        ],
      },
    },
  };
  const data2 = {
    id: "7",
    name: "Productos notables",
    subtitle: "AAAAA",
    component: {
      type: "doc",
      options: {
        id: "CID812919622",
        children: [
          {
            type: "page",
            options: {
              id: "CID812819282",
              children: [
                {
                  type: "docInfo",
                  options: {
                    id: "CID812889282",
                    title: "PRODUCTOS NOTABLESS",
                    subtitle: "EJE: ALGEBRA",
                  },
                },
              ],
            },
          },
        ],
      },
    },
  };

  const posts = [
    {
      type: "doc",
      options: {
        title: "Sistema de ecuaciones",
        content: data,
      },
    },
    {
      type: "doc",
      options: {
        title: "Productos notables",
        content: data2,
      },
    },
    {
      type: "blog",
      options: {
        title: "Novedades",
        tag: "Rivero",
      },
    },
    {
      type: "blog",
      options: {
        title: "Novedades",
        tag: "Rivero",
      },
    },
    {
      type: "question",
      options: {
        title: "Cuando yo la vi",
        tag: "AAAAA",
        alternatives: "AAA, AHihq, qwhui, huquih",
      },
    },
  ] as {
    type: "doc" | "post" | "question";
    options: any;
  }[];

  const nodes = {
    blog: (options: any) => <BlogPost {...options} />,
    doc: (options: any) => <DocPost {...options} />,
    question: (options: any) => <QuestionPost {...options} />,
  } as any;

  const [filteredPosts, setFilteredPosts] = useState(posts);
  useEffect(() => {
    const newPosts =
      filter !== "all" ? posts.filter(({ type }) => type === filter) : posts;
    setFilteredPosts(newPosts);
  }, [filter]);

  return (
    <Layout>
      <div>AAA</div>
      {/* <Recomendations
        setState={setFilter}
        filters={[
          {
            text: "Todos",
            value: "all",
          },
          {
            text: "Preguntas",
            value: "question",
          },
          {
            text: "Apuntes",
            value: "doc",
          },
          {
            text: "Blogs",
            value: "blog",
          },
        ]}
      >
        {filteredPosts.map(
          ({ options, type }: { options: any; type: string }, i) => (
            <div key={"post-" + i}>{nodes[type](options)}</div>
          )
        )}
      </Recomendations>
      <ConfigButton callback={() => {}} icon={faComment} modalOptions={[]} /> */}
    </Layout>
  );
}

const Post = ({
  title,
  tag,
  author,
  date,
  children,
}: {
  title: string;
  tag?: string;
  author: string;
  date: string;
  children?: ReactNode;
}) => (
  <article className={styles["question-card"]}>
    <div className={styles["question-info"]}>
      <h3 className={styles.title}>{title}</h3>
      {tag && <span className={styles.doc}>{tag}</span>}
    </div>
    {children}
    <div className={styles["user-info"]}>
      <span>{author}</span>
      <span>-</span>
      <span>{date}</span>
    </div>
  </article>
);

const DocPost = ({ title, content }: { title: string; content: any }) => (
  <Post
    key={title + "-post"}
    author="Felipe Pérez"
    date="12 / 7"
    tag="Algebra"
    title={title}
  >
    <div className={styles["commnunity-document"]}>
      <div>
        <GetDoc {...content} />
      </div>
    </div>
  </Post>
);

const BlogPost = ({ title, data }: { title: string; data: any }) => (
  <Post
    key={title + "-post"}
    author="Felipe Pérez"
    date="12 / 7"
    tag="Rivero"
    title={"Novedades"}
  >
    <div className={styles.image}>
      <img src="https://uddventures.udd.cl/hubfs/bjapi-uddventures.jpg" />
    </div>
  </Post>
);

const QuestionPost = ({
  title,
  tag,
  alternatives,
}: {
  title: string;
  tag: any;
  alternatives: string;
}) => (
  <Post
    key={title + "-post"}
    author="Felipe Pérez"
    date="12 / 7"
    title={title}
    tag={tag}
  >
    <div className={styles.content}>
      <ol className={styles["question__alternatives"]}>
        {alternatives.split(",").map((alternative: string, i: number) => {
          const letter = {
            0: "A",
            1: "B",
            2: "C",
            3: "D",
            4: "E",
          } as any;
          return (
            <li className={styles.alternative} key={alternative + i}>
              <span className={styles.letter}>{`${letter[i]}) `}</span>
              <span>{alternative}</span>
            </li>
          );
        })}
      </ol>
    </div>
  </Post>
);
