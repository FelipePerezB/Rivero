import { CreateTopicDocument } from "src/gql/graphql";
import { client } from "src/service/client";

const createTopic = async (name: string, subjectId: number) =>
  await client.mutate({
    mutation: CreateTopicDocument,
    variables: {
      createTopicInput: {
        name,
        Subject: {
          connect: {
            id: subjectId,
          },
        },
      },
    },
  });

export default createTopic;
