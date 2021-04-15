import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function MyCoolCodeBlock({ code }) {
  return (
    <div style={{ height: "400px" }}>
      <SyntaxHighlighter language="json" style={dark} wrapLines={false} wrapLongLines={false}>
        {JSON.stringify(JSON.parse(code), null, 2)}
      </SyntaxHighlighter>
    </div>
  );
}
