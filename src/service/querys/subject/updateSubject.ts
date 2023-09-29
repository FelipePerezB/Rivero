import {  UpdateSubjectDocument } from "src/gql/graphql";
import { client } from "src/service/client";

const updateSubject = async (id: number, name: string, color: string) =>
  await client.mutate({
    mutation: UpdateSubjectDocument,
    variables: {
      updateSubjectId: id,
      updateSubjectInput: {
        name: {
          set: name,
        },
        color: {
          set: color,
        },
      },
    },
  });

export default updateSubject;
