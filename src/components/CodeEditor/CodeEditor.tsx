import MonacoEditor from "@monaco-editor/react";
import prettier from "prettier";
import parser from "prettier/parser-babel";
import "./CodeEditor.css";

interface CodeEditorProps {
  defaultValue: string;
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  defaultValue,
  input,
  setInput,
}) => {
  const onFormatClick = () => {
    const unformatted = input || defaultValue;

    const formatted = prettier
      .format(unformatted, {
        parser: "babel",
        plugins: [parser],
        useTabs: false,
        semi: true,
      })
      .replace("/\n$/", "");

    setInput(formatted);
  };

  return (
    <div className="editor-wrapper">
      <button
        className="button button-format is-info is-small"
        onClick={onFormatClick}
      >
        Format
      </button>
      <MonacoEditor
        onChange={(value: string | undefined) => setInput(value ?? "")}
        defaultValue={defaultValue}
        value={input}
        theme="vs-dark"
        language="javascript"
        height="500px"
        options={{
          wordWrap: "on",
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    </div>
  );
};
