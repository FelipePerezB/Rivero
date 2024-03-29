import 'katex/dist/katex.css';

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
export function $wrapNodeInElement(
  node: LexicalNode,
  createElementNode: () => ElementNode
): ElementNode {
  const elementNode = createElementNode();
  node.replace(elementNode);
  elementNode.append(node);
  return elementNode;
}
import {
  $createParagraphNode,
  $insertNodes,
  $isRootOrShadowRoot,
  COMMAND_PRIORITY_EDITOR,
  createCommand,
  ElementNode,
  LexicalCommand,
  LexicalNode,
} from "lexical";
import { useEffect } from "react";
import { $createEquationNode, EquationNode } from './equation-node';

// import { $createEquationNode, EquationNode } from "./ecuation-node";

type CommandPayload = {
  equation: string;
  inline: boolean;
};

export const INSERT_EQUATION_COMMAND: LexicalCommand<CommandPayload> =
  createCommand("INSERT_EQUATION_COMMAND");


export default function EquationsPlugin(): JSX.Element | null {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!editor.hasNodes([EquationNode])) {
      throw new Error(
        "EquationsPlugins: EquationsNode not registered on editor"
      );
    }

    return editor.registerCommand<CommandPayload>(
      INSERT_EQUATION_COMMAND,
      (payload) => {
        const { equation, inline } = payload;
        const equationNode = $createEquationNode(equation, inline);

        $insertNodes([equationNode]);
        if ($isRootOrShadowRoot(equationNode.getParentOrThrow())) {
          $wrapNodeInElement(equationNode, $createParagraphNode).selectEnd();
        }

        return true;
      },
      COMMAND_PRIORITY_EDITOR
    );
  }, [editor]);

  return null;
}
