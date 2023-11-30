"use client";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import decompressRichTextContent from "src/app/subjects/utils/lexical/decompressRichTextContent";
import { EquationNode } from "src/app/subjects/utils/lexical/katex/equation-node";
import EquationsPlugin from "src/app/subjects/utils/lexical/katex/equation-plugin";
import { PLAYGROUND_TRANSFORMERS } from "src/app/subjects/utils/lexical/markdown-transformer";
import compressJSON from "src/app/subjects/utils/lexical/compress-JSON";
import Label from "./label";

function onError(error: unknown) {
  console.error(error);
}

// function compressJSON(json: RootChildren) {
//   return JSON.stringify(
//     json?.children?.map(({ children }) =>
//       children?.map(({ format, text, type, equation }) => {
//         let t;
//         let f;
//         if (format) f = format;
//         if (type === "equation") t = 1;
//         return { f, c: text ?? equation, t };
//       })
//     )
//   );
// }
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
    editorState: decompressRichTextContent(value),
    namespace: "MyEditor",
    onError,
    nodes: [EquationNode],
  };

  return (
    <div translate="no" className="relative">
      <span>Texto</span>
      <LexicalComposer initialConfig={initialConfig}>
        <RichTextPlugin
          placeholder={<></>}
          ErrorBoundary={LexicalErrorBoundary}
          contentEditable={
            <ContentEditable className="min-h-[100px] border shadow focus:outline-blue-500 rounded p-1" />
          }
        />
        <HistoryPlugin />
        <EquationsPlugin />
        <MarkdownShortcutPlugin transformers={PLAYGROUND_TRANSFORMERS} />
        <OnChangePlugin
          onChange={(state) => {
            console.log(state.toJSON().root);
            onChange({ [dataKey ?? label]: compressJSON(state.toJSON().root) });
          }}
        />
      </LexicalComposer>
    </div>
  );
}
