import Layout from "src/layout/Layout";
import React, { useState } from "react";
import styles from "@styles/Subjects.module.css";
import Link from "next/link";
import { client } from "src/service/client";
import {
  GetSubjectDocument,
  GetSubjectQuery,
  GetSubjectsPathsDocument,
} from "src/gql/graphql";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import Options from "@components/Options";
import Button from "@components/Button";
import capFirst from "src/utils/capFirst";
import { Context } from "@apollo/client";
import ProgressCard from "@components/cards/progressCard/ProgressCard";
import AccordionCard from "@components/cards/accordionCard/AccordionCard";
import NavigationCard from "@components/cards/navigationCard/NavigationCard";
import Buttons from "@components/button/buttons/Buttons";
import EditButton from "@components/button/editButton/EditButton";
import updateTopicName from "src/service/querys/topic/updateTopicName";
import updateSubtopicName from "src/service/querys/subtopic/updateSubtopicName";
import updateDocName from "src/service/querys/doc/updateDocTitle";
import removeTopic from "src/service/querys/topic/removeTopic";
import removeSubtopic from "src/service/querys/subtopic/removeSubtopic";
import removeDoc from "src/service/querys/doc/removeDoc";
import createTopic from "src/service/querys/topic/createTopic";
import createSubtopic from "src/service/querys/subtopic/createSubtopic";
import createDoc from "src/service/querys/doc/createDoc";
import { useUser } from "@clerk/nextjs";

export default function Docs({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { user } = useUser();
  const { id, color, name: subject, Topics: topics } = data?.subject || {};
  const [editMode, setEditMode] = useState(false);

  const options = topics
    ?.filter(({ Subtopics }) => Subtopics)
    ?.map(({ name }) => capFirst(name));
  const [option, setOption] = useState(options?.at(0));

  const {
    name: topic,
    _count,
    Subtopics,
    id: topicId,
  } = topics?.find(
    ({ name }) => name?.toLowerCase() === option?.toLowerCase()
  ) || {};
  const count = _count?.Docs;

  return (
    <Layout title={capFirst(subject)}>
      <NavigationCard href={`/evaluations/${id}`}>Evaluaciones</NavigationCard>
      <Options {...{ option, setOption, options }} />

      <ProgressCard {...{ color, count: count, subject, topic }}>
        <span>{topic && capFirst(topic)}</span>
        {topicId && (
          <EditButton
            childLabel="subtópico"
            onUpdate={(name) => updateTopicName(Number(topicId), name)}
            onRemove={() => removeTopic(Number(topicId))}
            onCreate={(name) =>
              createSubtopic(name, Number(id), Number(topicId))
            }
            {...{ editMode, size: "xs", value: topic, label: "topico" }}
          />
        )}
      </ProgressCard>

      {Subtopics?.map(({ Docs, name, id: subtpicId }) => (
        <AccordionCard
          key={name + "-subtopic"}
          head={
            <span className={styles.topic}>
              {capFirst(name)}
              {!!user?.id && (
                <EditButton
                  childLabel="documento"
                  onUpdate={(name) => updateSubtopicName(Number(id), name)}
                  onRemove={() => removeSubtopic(Number(id))}
                  onCreate={(name) =>
                    createDoc(
                      name,
                      Number(id),
                      Number(topicId),
                      Number(subtpicId),
                      user.id
                    )
                  }
                  {...{ editMode, label: "subtopico", value: name }}
                />
              )}
            </span>
          }
        >
          {Docs?.map(({ title, externalId, id }) => (
            <div className={styles.doc} key={title + externalId}>
              <Link href={`view/${externalId}`}>{title}</Link>

              <EditButton
                onUpdate={(name) => updateDocName(Number(id), name)}
                onRemove={() => removeDoc(Number(id))}
                {...{ editMode, label: "documento", value: title }}
              />
            </div>
          ))}
        </AccordionCard>
      ))}

      <Buttons>
        <Button style="small-active">Prácticar</Button>
        <Button onClick={() => setEditMode(!editMode)} style="small">
          {!editMode ? "Editar" : "Deshabilitar edición"}
        </Button>
      </Buttons>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data, error } = await client.query({
    query: GetSubjectsPathsDocument,
    fetchPolicy: "network-only",
  });
  if (!data?.subjects || error?.name) throw new Error("Failed to request");
  return {
    paths: data.subjects?.map((subject) => ({
      params: {
        path: subject?.id,
        subject: subject?.id,
      },
    })),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<{
  data: GetSubjectQuery;
}> = async (context: Context) => {
  const { subject: id } = context?.params;
  if (!id) throw new Error("Failed to request");
  const { data, error } = await client.query({
    query: GetSubjectDocument,
    variables: { subjectId: Number(id) },
    fetchPolicy: "network-only",
  });
  if (!data.subject.color || error?.name) throw new Error("Failed to request");
  return {
    props: { data },
    revalidate: 60 * 60 * 24,
  };
};
