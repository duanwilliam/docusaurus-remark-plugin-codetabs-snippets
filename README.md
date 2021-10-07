# docusaurus-remark-plugin-codetabs-snippets

Docusaurus v2 Remark utility plugin to allow sourcing code from files in codetabs using `docusaurus-remark-plugin-codetabs` and `remark-plugin-code-snippets`.

## Installation

```bash
# npm
npm install docusaurus-remark-plugin-codetabs remark-plugin-code-snippets docusaurus-remark-plugin-codetabs-snippets

# yarn
yarn add docusaurus-remark-plugin-codetabs remark-plugin-code-snippets docusaurus-remark-plugin-codetabs-snippets
```

## Usage

Add the plugin to the Remark plugins array for each instance using it in `docusaurus.config.js`.

`docusaurus-remark-plugin-codetabs-snippets` should come **before** `docusaurus-remark-plugin-codetabs`, which should come **before** `remark-plugin-code-snippets`

```js
module.exports = {
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          remarkPlugins: [
+           [require('docusaurus-remark-plugin-codetabs-snippets'), {
+             // options             
+           }],
+           [require('docusaurus-remark-plugin-codetabs'), {
+             // options             
+           }],
+           [require('remark-plugin-code-snippets'), {
+             // options             
+           }],
          ],
        },
        blog: {
          remarkPlugins: [
+           [require('docusaurus-remark-plugin-codetabs-snippets'), {
+             // options             
+           }],
+           [require('docusaurus-remark-plugin-codetabs'), {
+             // options             
+           }],
+           [require('remark-plugin-code-snippets'), {
+             // options             
+           }],
          ],
        },
      },
    ],
  ],
};
```

## Options

| Option | Type | Default | Description |
| :-: | :-: | :-: | :-- |
| `extensions` | `{ [ext: string]: string }` | `{}` | maps file extensions to the language syntax highlighting to use for that language extension |

### `extensions`

Map of file extensions to the desired language for syntax highlighting. Only the final extension is captured, ie `a.b.c -> c`

You can configure the extension mapping with the `extensions` field in `options`. For instance, `{ mdx: md }` would make sourced files with the `.mdx` extension result in a codeblock with language `md`.

## Example

    ```md codetabs

    ```file="helloworld.js":1

    ```file="HelloWorld.jsx":2-
    import React from 'react';
    {{ FILE }}

    ```

produces

    ```md codetabs

    ```js file="helloworld.js"

    ```jsx file="HelloWorld.jsx":2-
    import React from 'react';
    {{ FILE }}

    ```