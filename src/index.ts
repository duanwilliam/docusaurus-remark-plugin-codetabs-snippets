import type { Plugin, Transformer } from 'unified';
import type { MDASTNode, Options } from './types';

const codeSnippetRegex = /file=(["'])(?<file>.*?)\1(?::(?<start>[1-9]\d*)(?<dash>-(?<end>[1-9]\d*)?)?)?/;
const codetabLangCodeSnippetRegex = /^```(?<snippet>(file=(["'])(?<file>.*?)\3(?::(?<start>[1-9]\d*)(?<dash>-(?<end>[1-9]\d*)?)?)?))(?:[^\S\r\n]+(?<meta>.*))?$/mg;

type TransformNodeOptions = Required<Pick<Options, 'extensions'>>;

const transformNode = (node: MDASTNode, { extensions }: TransformNodeOptions) => {
  node.value = node.value.replace(codetabLangCodeSnippetRegex, (...args) => {
    const groups = args[args.length - 1];
    const file = groups.file;
    if (!file) { return args[0]; }
  
    const ext = file.substring(file.lastIndexOf('.') + 1);
    const lang = extensions[ext] ?? ext;
    return `\`\`\`${lang} ${groups.snippet} ${groups.meta ?? ''}`;
  });
}

const isCodetabsNode = (node) => node.type === 'code' && node.meta === 'codetabs';

const attacher: Plugin = (options: Options = {}) => {
  const {
    extensions
  } = options;

  const transformer: Transformer = async (node: MDASTNode) => {
    if (isCodetabsNode(node)) {
      await transformNode(node, { extensions });
      return undefined;
    }
    if (Array.isArray(node.children)) {
      for (const child of node.children) {
        await transformer(child, undefined, undefined);
      }
    }
    return undefined;
  };

  return transformer;
};

module.exports = attacher;