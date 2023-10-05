import { RemoveGroupDocument } from "src/gql/graphql";
import { client } from "src/service/client";

const removeGroup = async (id: number) =>
  await client.mutate({
    mutation: RemoveGroupDocument,
    variables: {
      removeGroupId: id,
    },
  });

export default removeGroup;
