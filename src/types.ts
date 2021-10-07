import { Node } from 'unist';

export interface MDASTNode extends Node {
  lang?: string;
  meta?: string;
  value: string;
  children?: MDASTNode[];
}

export interface Options {
  extensions?: {
    [ext: string]: string;
  };
}