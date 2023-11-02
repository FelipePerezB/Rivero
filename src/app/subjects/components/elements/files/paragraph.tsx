"use client"
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import React from "react";
import decompressRichTextContent from "src/app/subjects/utils/lexical/decompressRichTextContent";
import { EquationNode } from "src/app/subjects/utils/lexical/katex/equation-node";
import EquationsPlugin from "src/app/subjects/utils/lexical/katex/equation-plugin";

function onError(error: unknown) {
  console.error(error);
}

function UpdatePlugin({ content }: { content: string }) {
  const [editor] = useLexicalComposerContext();
  editor.setEditorState(editor.parseEditorState(content));
  return null;
}

export default function paragraph({
  id,
  options: { text } = { text: "" },
}: {
  id: string;
  options: { text: string };
}) {
  const content = decompressRichTextContent(text) as unknown as string;
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
          contentEditable={<ContentEditable />}
        />
        <UpdatePlugin content={content} />
      </LexicalComposer>
    </div>
  );
}
