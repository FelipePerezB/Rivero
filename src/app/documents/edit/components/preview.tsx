/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState } from "react";
import DynamicElement from "src/app/(main)/subjects/components/elements/files/dynamic-file";
import { Component } from "../models/component";

export default function Preview({ attrs }: { attrs: Component }) {
  const [visibility, setVisibility] = useState(true);
  return attrs.type ? (
    <section>
      <button
        onClick={() => {
          setVisibility(!visibility);
        }}
        className="text-slate-700"
      >
        {visibility ? "Ocultar previsualización" : "Mostrar previsualización"}
      </button>
      {visibility && (
        <div className="text-xs">
          <div className="overflow-y-scroll flex justify-center">
            <DynamicElement attrs={{ ...attrs, isPreview: true }} name={attrs.type} />
          </div>
        </div>
      )}
    </section>
  ) : (
    <></>
  );
}
