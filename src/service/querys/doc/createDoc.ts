import { CreateNoteDocument, Types, Privacity } from "src/gql/graphql";
import { client } from "src/service/client";
import generateRandomId from "src/utils/generateRandomId";

const createDoc = async (
  name: string,
  subtopicId: number,
  authorId: string
) =>
  await client.mutate({
    mutation: CreateNoteDocument,
    variables: {
      createNoteInput: {
        Subtopic: {
          connect: {
            id: subtopicId,
          },
        },
        type: Types.Document,
        File: {
          create: {
            title: name,
            Author: {
              connect: {
                externalId: authorId,
              },
            },
            content: "",
            externalId: generateRandomId(32),
            privacity: Privacity.Private,
          },
        },
      },
    },
  });

export default createDoc;
