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
  const Component = dynamic(
    () => import(`../components/${folder}/${name?.toLowerCase()}`)
  );
  return <Component {...{ ...attrs }} />;
};

export default GetComponent;
