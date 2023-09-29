import Layout from "src/layout/Layout";
import React, { useState } from "react";
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
import AccordionCard, {
  AccordionChild,
  AccordionHead,
} from "@components/cards/accordionCard/AccordionCard";
import NavigationCard from "@components/cards/navigationCard/NavigationCard";
import Buttons from "@components/button/buttons/Buttons";
import EditButton from "@components/button/editButton/EditButton";
import updateTopicName from "src/service/querys/topic/updateTopicName";
import updateSubtopicName from "src/service/querys/subtopic/updateSubtopicName";
import updateDocName from "src/service/querys/doc/updateDocTitle";
import removeTopic from "src/service/querys/topic/removeTopic";
import removeSubtopic from "src/service/querys/subtopic/removeSubtopic";
import removeDoc from "src/service/querys/doc/removeDoc";
import createSubtopic from "src/service/querys/subtopic/createSubtopic";
import createDoc from "src/service/querys/doc/createDoc";
import { useUser } from "@clerk/nextjs";

export default function Docs({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { user } = useUser();
  const role = user?.publicMetadata?.role as string | undefined;
  const [editMode, setEditMode] = useState(false);

  const subtopics = data?.topicAndSubtopic?.Subtopics;
  const { color, id, name: subject, Topics } = data?.subject || {};

  const options = Topics?.map(({ name }) => capFirst(name));
  const [option, setOption] = useState(options?.at(0));

  const { name: topic, id: topicId } =
    Topics?.find(({ name }) => name?.toLowerCase() === option?.toLowerCase()) ||
    {};

  return (
    <Layout title={capFirst(subject)}>
      <NavigationCard href={`/evaluations/${id}`}>Evaluaciones</NavigationCard>
      <Options {...{ option, setOption, options }} />
      <ProgressCard {...{ color, subject, topic }}>
        <div className="flex gap-2 items-center">
          <span>{topic && capFirst(topic)}</span>
          {topicId && (
            <EditButton
              childLabel="subtópico"
              onUpdate={(name) => updateTopicName(Number(topicId), name)}
              onRemove={() => removeTopic(Number(topicId))}
              onCreate={(name) =>
                createSubtopic(name, Number(id), Number(topicId))
              }
              {...{ editMode, value: topic, label: "topico" }}
            />
          )}
        </div>
      </ProgressCard>

      {subtopics?.map(({ name, id: subtpicId, Notes }) => (
        <AccordionCard
          key={name + "-subtopic"}
          head={
            <AccordionHead>
              {capFirst(name)}
              {/* {!!user?.id && (
                <EditButton
                  label="subtopico"
                  childLabel="documento"
                  onUpdate={(name) =>
                    updateSubtopicName(Number(subtpicId), name)
                  }
                  onRemove={() => removeSubtopic(Number(subtpicId))}
                  onCreate={(name) =>
                    createDoc(
                      name,
                      Number(id),
                      Number(topicId),
                      Number(subtpicId),
                      user.id
                    )
                  }
                  {...{ editMode, value: name }}
                />
              )} */}
            </AccordionHead>
          }
        >
          {Notes?.map(({ File, type }) => (
            <>
              {type === "DOCUMENT" && (
                <AccordionChild key={"accordion-child" + File?.title}>
                  <div className="flex justify-between items-center">
                    <Link href={`view/${File?.externalId}`}>{File?.title}</Link>
                    {/* {editMode && (
                      <EditButton
                        onUpdate={(name) => updateDocName(Number(id), name)}
                        onRemove={() => removeDoc(Number(id))}
                        {...{
                          editMode,
                          label: "documento",
                          value: File?.title,
                        }}
                      />
                    )} */}
                  </div>
                </AccordionChild>
              )}
            </>
          ))}
        </AccordionCard>
      ))}
      <Buttons>
        <Button>Prácticar</Button>
        {role === "ADMIN" && (
          <Button color="white" onClick={() => setEditMode(!editMode)}>
            {!editMode ? "Editar" : "Deshabilitar edición"}
          </Button>
        )}
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
    variables: { subjectId: Number(id), topicId: 1 },
    fetchPolicy: "network-only",
  });
  if (!data.subject.color || error?.name) throw new Error("Failed to request");
  return {
    props: { data },
    revalidate: 60 * 60 * 24,
  };
};
