/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React from "react";
// import { Component } from "src/app/subjects/edit/models/component";
import DynamicElement from "src/app/subjects/components/elements/files/dynamic-file";
import { Component } from "../models/component";

export default function Preview({ attrs }: { attrs: Component }) {
  console.log(attrs)
  return attrs.type ? (
    <section>
      <span className="text-slate-700">Previsualización</span>
      <div className="overflow-y-scroll">
        <DynamicElement attrs={{ ...attrs }} name={attrs.type} />
      </div>
    </section>
  ) : (
    <></>
  );
}
