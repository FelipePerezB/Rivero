import { useRouter } from "next/router";
import React from "react";
import Edit from "src/getDoc/Edit";

type props = { type: string; options: any };

export default function EditPage() {
  const router = useRouter();
  const { id } = router.query;
  // Get
  const setComponent = (component: props) => {
    // Patch
    console.log(component);
  };
  return <Edit saveDoc={setComponent} setDoc={setComponent} />;
}
