import { RemoveTopicDocument } from "src/gql/graphql";
import { client } from "src/service/client";

const removeTopic = async (id: number) =>
  await client.mutate({
    mutation: RemoveTopicDocument,
    variables: {
      removeTopicId: id,
    },
  });

export default removeTopic;
