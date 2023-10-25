import getFile from "src/app/utils/getFile";
import getPractice from "../utils/getPractice";
import Practice from "src/app/subjects/components/elements/files/practice";
import EditWraper from "../../components/edit-wraper";

export default async function Page(props: {
  searchParams: { [key: string]: string };
  params: { id: string };
}) {
  const file = await getPractice(props.params.id);
  return (
    <EditWraper document={file} id={props.params.id} />
    // <Practice
    // searchParams={{}}
    // title="Prácticar"
    //   type="document"
    //   id=""
    //   // searchParams={props.searchParams}
    //   // title={file.title}
    //   options={{ children: file.content.options.children as [] }}
    // />
    // <GetComponent
    //   attrs={{
    //     ...file.content,
    //     title: file.title,
    //     searchParams: props.searchParams,
    //   }}
    //   name={"document"}
    //   folder="practice"
    // />
  );
}
