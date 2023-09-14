import { UpdateGradeDocument } from "src/gql/graphql";
import { client } from "src/service/client";

const updateGrade = async (id: number, name: string, schoolId: number) =>
  await client.mutate({
    mutation: UpdateGradeDocument,
    variables: {
      updateGradeId: id,
      updateGradeInput: {
        name: {
          set: name,
        },
        School: {
          connect: {
            id: schoolId,
          },
        },
      },
    },
  });

export default updateGrade;
