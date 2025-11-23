import React from "react";
import Editor from "@monaco-editor/react";

export default function CodeEditor({ value, onChange, language = "javascript" }) {
  return (
    <Editor
      height="300px"
      language={language}
      theme="vs-dark"
      value={value}
      onChange={(value) => onChange(value)}
      options={{
        fontSize: 14,
        minimap: { enabled: false },
        wordWrap: "on",
      }}
    />
  );
}
