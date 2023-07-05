import React, { useEffect, useState } from "react";
import Edit from "../getDoc/Edit";

type props = { type: string; options: any };

export default function edit() {
  const setComponent = (component: props) => {
    console.log(component);
  };
  return <Edit callback={setComponent} setDoc={setComponent} />;
}
