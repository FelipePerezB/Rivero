/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import React, { useEffect, useRef } from "react";
import decompressRichTextContent from "src/app/subjects/utils/lexical/decompressRichTextContent";
import { EquationNode } from "src/app/subjects/utils/lexical/katex/equation-node";
import EquationsPlugin from "src/app/subjects/utils/lexical/katex/equation-plugin";

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

export default function Paragraph({
  id,
  options: { text, indent } = { text: "", indent: false },
}: {
  id?: string;
  options: { text: string, indent: boolean };
}) {
  const content = decompressRichTextContent(text) as unknown as string;
  console.log(content, text)

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
            contentEditable={<ContentEditable style={{textIndent: indent ? "1em" : "0" }} className="text-justify" />}
          />
          <UpdatePlugin content={content} />
        </LexicalComposer>
      </div>
    );
  } catch (error) {
    console.log(error);
  }
}