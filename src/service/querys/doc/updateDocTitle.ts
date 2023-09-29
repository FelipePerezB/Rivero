// import { UpdateDocDocument } from "src/gql/graphql";
import { client } from "src/service/client";

const updateDocName = async (id: number, name: string) =>""
  // await client.mutate({
  //   mutation: UpdateDocDocument,
  //   variables: {
  //     updateDocId: id,
  //     updateDocInput: {
  //       title: {
  //         set: name,
  //       },
  //     },
  //   },
  // });

export default updateDocName;
