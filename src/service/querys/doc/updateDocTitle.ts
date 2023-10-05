import { UpdateFileDocument } from "src/gql/graphql";
import { client } from "src/service/client";

const updateDocName = async (id: number, name: string) =>
  await client.mutate({
    mutation: UpdateFileDocument,
    variables: {
      updateFileId: id,
      updateFileInput: {
        title: {
          set: name,
        },
      },
    },
  });

export default updateDocName;
