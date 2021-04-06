import React from "react"
import { CodeBlock, dracula } from "react-code-blocks";

export default function MyCoolCodeBlock({ code }) {
  return (
    <CodeBlock
      text={code !== null ? JSON.stringify(JSON.parse(code),null,2):""}      
      theme={dracula}
      language="json"
      wrapLines
    />
  );
}