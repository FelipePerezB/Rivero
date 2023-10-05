import { RemoveNoteDocument } from "src/gql/graphql";
import { client } from "src/service/client";

const removeDoc = async (id: number) =>
  await client.mutate({
    mutation: RemoveNoteDocument,
    variables: {
      removeNoteId: id,
    },
  });

export default removeDoc;
