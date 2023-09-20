import React, { useMemo } from "react";
import GetComponent from "./get-component";
import { Component } from "src/pages/docs/edit/[id]";

export default function Preview({ attrs }: { attrs: Component }) {
  console.log(attrs)
  const node = useMemo(
    () => (
      <GetComponent attrs={{ ...attrs }} folder="documents" name={attrs.type} />
    ),
    [attrs]
  );
  return attrs.type ? (
    <section>
      <span className="text-s text-slate-700">Previsualización</span>
      <div className="overflow-y-scroll">{node}</div>
    </section>
  ) : (
    <></>
  );
}
