import {
  TextMatchTransformer,
  Transformer,
} from '@lexical/markdown';

import {
  LexicalNode,
} from 'lexical';

import {
  $createEquationNode,
  $isEquationNode,
  EquationNode,
} from './katex/equation-node';


export const EQUATION: TextMatchTransformer = {
  dependencies: [EquationNode],
  export: (node: LexicalNode | null | undefined) => {
    if (!$isEquationNode(node)) {
      return null;
    }

    return `$${node.getEquation()}$`;
  },
  importRegExp: /\$([^$]+?)\$/,
  regExp: /\$([^$]+?)\$$/,
  replace: (textNode: any, match: any) => {
    const [, equation] = match;
    const equationNode = $createEquationNode(equation, true);
    textNode.replace(equationNode);
  },
  trigger: '$',
  type: 'text-match',
};

export const PLAYGROUND_TRANSFORMERS: Array<Transformer> = [
  EQUATION,
];