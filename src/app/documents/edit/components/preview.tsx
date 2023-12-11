/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React from "react";
// import { Component } from "src/app/subjects/edit/models/component";
import DynamicElement from "src/app/(main)/subjects/components/elements/files/dynamic-file";
import { Component } from "../models/component";

export default function Preview({ attrs }: { attrs: Component }) {
  return attrs.type ? (
    <section className="text-xs">
      <span className="text-slate-700">Previsualización</span>
      <div className="overflow-y-scroll flex justify-center">
        <DynamicElement attrs={{ ...attrs }} name={attrs.type} />
      </div>
    </section>
  ) : (
    <></>
  );
}
