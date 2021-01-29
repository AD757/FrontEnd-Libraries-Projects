import React, { useState } from 'react';

import { Preview } from './Preview';
import { Editor } from './Editor';

const defaultMarkdown = `
# Welcome to my React Markdown Previewer!

## This is a sub-header

**Inline code:** \`<div></div>\`

**Block code:**

\`\`\`
const a = 100;

if (a > 10) console.log('cool!');
\`\`\`

**Links:** [freeCodeCamp](https://www.freecodecamp.com)

> Quotes!

**Lists:** 

1. First item
2. Second item

![React Logo](https://ru.reactjs.org/logo-og.png)
`;

export const App = () => {
  const [markdown, setMarkdown] = useState(defaultMarkdown);

  const textAreaChangeHandler = TextArea => setMarkdown(TextArea.target.value);

  return (
    <div className="markdown-previewer">
      <Editor text={markdown} onTextChange={textAreaChangeHandler} />
      <Preview text={markdown} />
    </div>
  );
};
