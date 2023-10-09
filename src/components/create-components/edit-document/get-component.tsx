// 'use client'
import dynamic from "next/dynamic";
import { Suspense, lazy } from "react";

const GetComponent = ({
  folder,
  name,
  attrs,
}: {
  folder: string;
  name: string;
  attrs: { [key: string]: unknown };
}) => {
  console.log(attrs);
  const Component = dynamic(
    () => import(`../components/${folder}/${name?.toLowerCase()}`)
  );
  return (
    // <Suspense fallback={<>Loading...</>}>
      <Component {...{ ...attrs }} />
    // </Suspense>
  );
};

export default GetComponent;
