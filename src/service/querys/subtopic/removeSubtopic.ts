import { RemoveSubtopicDocument } from "src/gql/graphql";
import { client } from "src/service/client";

const removeSubtopic = async (id: number) =>
  await client.mutate({
    mutation: RemoveSubtopicDocument,
    variables: {
      removeSubtopicId: id,
    },
  });

export default removeSubtopic;
