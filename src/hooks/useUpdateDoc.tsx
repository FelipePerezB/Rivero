import { useMutation, useQuery } from "@apollo/client";
import { UpdateDocDocument } from "src/gql/graphql";

const useUpdateDoc = (id: number, newContent: string) => {
  const u = useMutation(UpdateDocDocument, {
    variables: {
      updateDocId: id,
      updateDocInput: {
        content: {
          set: newContent,
        },
      },
    },
    fetchPolicy: "network-only",
  });
};

export default useUpdateDoc;
