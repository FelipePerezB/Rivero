import { RemoveSubjectDocument } from "src/gql/graphql";
import { client } from "src/service/client";

const removeSubject = async (id: number) =>
  await client.mutate({
    mutation: RemoveSubjectDocument,
    variables: {
      removeSubjectId: id,
    },
  });

export default removeSubject;
