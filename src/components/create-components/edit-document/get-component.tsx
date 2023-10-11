// 'use client'
import dynamic from "next/dynamic";

const GetComponent = ({
  folder,
  name,
  attrs,
}: {
  folder: string;
  name: string;
  attrs: { [key: string]: unknown };
}) => {
  console.log(name)
  const Component = dynamic(
    () => import(`../components/${folder}/${name?.toLowerCase()}`),
    { ssr: false}
  );
  return (
    // <Suspense fallback={<>Loading...</>}>
    <Component {...{ ...attrs }} />
    // </Suspense>
  );
};

export default GetComponent;
