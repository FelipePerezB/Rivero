'use client'
import React, { useMemo } from "react";
import GetComponent from "./get-component";
import { Component } from "src/app/documents/edit/models/component";
// import DynamicInput from "src/app/documents/components/elements/inputs/dynamic-input";
import DynamicElement from "src/app/documents/components/elements/files/dynamic-file";
// import { Component } from "src/pages/docs/edit/[id]";

export default function Preview({ attrs }: { attrs: Component }) {
  const node = useMemo(
    () => (
      <DynamicElement attrs={{ ...attrs }} name={attrs.type} />
    ),
    [attrs.options]
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
