import { EquationNode } from "@components/create-components/edit-document/lexical/ecuation-node";
import EquationsPlugin from "@components/create-components/edit-document/lexical/ecuation-plugin";
import decompressRichTextContent from "@components/create-components/utils/decompressRichTextJSON";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import React from "react";

function onError(error: unknown) {
  console.error(error);
}

export default function paragraph({
  id,
  options: { text },
}: {
  id: string;
  options: { texto: string; text: string };
}) {
  return (
    <div data-component={id}>
      <LexicalComposer
        initialConfig={{
          editorState: decompressRichTextContent(text),
          editable: false,
          onError,
          nodes: [EquationNode],
          namespace: "ViewContent",
        }}
      >
        <EquationsPlugin />
        <RichTextPlugin
          placeholder={<>AA</>}
          ErrorBoundary={LexicalErrorBoundary}
          contentEditable={<ContentEditable />}
        />
      </LexicalComposer>
    </div>
  );
}
