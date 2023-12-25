/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import React, { useEffect, useRef } from "react";
import decompressRichTextContent from "src/app/(main)/subjects/utils/lexical/decompressRichTextContent";
import { EquationNode } from "src/app/(main)/subjects/utils/lexical/katex/equation-node";
import EquationsPlugin from "src/app/(main)/subjects/utils/lexical/katex/equation-plugin";

function onError(error: unknown) {
  console.error(error);
}

function UpdatePlugin({ content }: { content: string }) {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    setTimeout(() => {
      editor.setEditorState(editor.parseEditorState(content));
    });
  }, [content]);
  return null;
}

type aligns = "center" | "justify" | "left";
type sizes = "sm" | "md" | "lg";

const fontsSizes = {
  sm: "0.8em",
  md: "1em",
  lg: "1.2em",
};

const lineHeight = {
  sm: "",
  md: "",
  lg: "2em",
};

export default function Paragraph({
  id,
  options: { text, indent, align, fontSize } = {
    text: "",
    indent: false,
    align: "justify",
    fontSize: "md",
  },
}: {
  id?: string;
  options: { text: string; indent?: boolean; align?: aligns; fontSize?: sizes };
}) {
  const content = decompressRichTextContent(text) as unknown as string;

  try {
    return (
      <div data-component={id}>
        <LexicalComposer
          initialConfig={{
            editorState: content,
            editable: false,
            onError,
            nodes: [EquationNode],
            namespace: "ViewContent." + id,
          }}
        >
          <EquationsPlugin />
          <RichTextPlugin
            placeholder={<></>}
            ErrorBoundary={LexicalErrorBoundary}
            contentEditable={
              <ContentEditable
                style={{
                  textIndent: indent ? "1em" : "0",
                  textAlign: align,
                  fontSize: fontsSizes[fontSize ?? "md"],
                  lineHeight: lineHeight[fontSize ?? "md"],
                }}
                // className="text-justify"
              />
            }
          />
          <UpdatePlugin content={content} />
        </LexicalComposer>
      </div>
    );
  } catch (error) {
    console.log(error);
  }
}
