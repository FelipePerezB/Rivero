import { UpdateSubtopicDocument } from "src/gql/graphql";
import { client } from "src/service/client";

const updateSubtopicName = async (id: number, name: string) =>
  await client.mutate({
    mutation: UpdateSubtopicDocument,
    variables: {
      updateSubtopicId: id,
      updateSubtopicInput: {
        name: {
          set: name,
        },
      },
    },
  });

export default updateSubtopicName;
