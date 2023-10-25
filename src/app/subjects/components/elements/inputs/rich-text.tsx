'use client'
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
// import EquationsPlugin from "@components/create-components/edit-document/lexical/ecuation-plugin";
// import { EquationNode } from "@components/create-components/edit-document/lexical/ecuation-node";
// import { PLAYGROUND_TRANSFORMERS } from "@components/create-components/edit-document/lexical/markdown-transformer";
// import decompressRichTextContent from "@components/create-components/utils/decompressRichTextJSON";

function onError(error: unknown) {
  console.error(error);
}

type RootChildren = {
  children?: RootChildren[];
  format?: 0 | 1 | 2 | string;
  type?: "paragraph" | "text" | "equation" | "root" | string;
  text?: string;
  equation?: string;
};

function compressJSON(json: RootChildren) {
  return JSON.stringify(
    json?.children?.map(({ children }) =>
      children?.map(({ format, text, type, equation }) => {
        let t;
        let f;
        if (format) f = format;
        if (type === "equation") t = 1;
        return { f, c: text ?? equation, t };
      })
    )
  );
}
export default function Editor({
  label,
  dataKey,
  value,
  onChange,
}: {
  dataKey: string;
  label: string;
  value: string;
  onChange: (value: { [key: string]: string }) => void;
}) {


  const initialConfig = {
    // editorState: decompressRichTextContent(value),
    namespace: "MyEditor",
    onError,
    // nodes: [EquationNode],
  };

  return (
    <div translate="no" className="relative">
      <LexicalComposer initialConfig={initialConfig}>
        <RichTextPlugin
          placeholder={<div className="">Enter some text...</div>}
          ErrorBoundary={LexicalErrorBoundary}
          contentEditable={
            <ContentEditable className="min-h-[100px] border shadow focus:outline-blue-500 rounded p-1" />
          }
        />
        <HistoryPlugin />
        {/* <EquationsPlugin />
        <MarkdownShortcutPlugin transformers={PLAYGROUND_TRANSFORMERS} /> */}
        <OnChangePlugin
          onChange={(state) => {
            onChange({ [dataKey ?? label]: compressJSON(state.toJSON().root) });
          }}
        />
      </LexicalComposer>
    </div>
  );
}
