import { CreateSubtopicDocument } from "src/gql/graphql";
import { client } from "src/service/client";

const createSubtopic = async (
  name: string,
  subjectId: number,
  topicId: number
) =>
  await client.mutate({
    mutation: CreateSubtopicDocument,
    variables: {
      createSubtopicInput: {
        name,
        Subject: {
          connect: {
            id: subjectId,
          },
        },
        Topic: {
          connect: {
            id: topicId,
          },
        },
      },
    },
  });

export default createSubtopic;
