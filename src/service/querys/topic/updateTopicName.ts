import { UpdateTopicDocument } from "src/gql/graphql";
import { client } from "src/service/client";

const updateTopicName = async (id: number, name: string) =>
  await client.mutate({
    mutation: UpdateTopicDocument,
    variables: {
      updateTopicId: id,
      updateTopicInput: {
        name: {
          set: name,
        },
      },
    },
  });

export default updateTopicName;
