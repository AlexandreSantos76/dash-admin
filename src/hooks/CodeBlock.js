import React from "react"
import { CodeBlock, dracula } from "react-code-blocks";

export default function MyCoolCodeBlock({ code }) {
    console.log(code);
    return (
        <CodeBlock
            text={code}
            theme={dracula}
            language="json"
            wrapLines
        />
    );
}