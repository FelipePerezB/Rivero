import { CreateDocDocument, DocTypes, Privacity } from "src/gql/graphql";
import { client } from "src/service/client";
import generateRandomId from "src/utils/generateRandomId";

const createDoc = async (
  name: string,
  subjectId: number,
  topicId: number,
  subtopicId: number,
  authorId: string
) =>
  await client.mutate({
    mutation: CreateDocDocument,
    variables: {
      createDocInput: {
        title: name,
        Subject: {
          connect: {
            id: subjectId,
          },
        },
        Subtopic: {
          connect: {
            id: subtopicId,
          },
        },
        Topic: {
          connect: {
            id: topicId,
          },
        },
        Author: {
          connect: {
            externalId: authorId,
          },
        },
        content: "",
        externalId: generateRandomId(32),
        privacity: Privacity.Private,
        type: DocTypes.Notes,
      },
    },
  });

export default createDoc;
