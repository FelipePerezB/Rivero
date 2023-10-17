import getFile from "src/app/utils/getFile";

export default async function Page(props: {
  searchParams: { [key: string]: string };
  params: { id: string };
}) {
  const { file } = (await getFile(props.params.id));
  return (<></>
    // <Practice
    //   type="document"
    //   id=""
    //   searchParams={props.searchParams}
    //   title={file.title}
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
