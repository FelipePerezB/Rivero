import { UpdateGroupDocument } from "src/gql/graphql";
import { client } from "src/service/client";

const updateGrade = async (id: number, name: string, organizationId: number) =>
  await client.mutate({
    mutation: UpdateGroupDocument,
    variables: {
      updateGroupId: id,
      updateGroupInput: {
        name: {
          set: name,
        },
        Organization: {
          connect: {
            id: organizationId,
          },
        },
      },
    },
  });

export default updateGrade;
