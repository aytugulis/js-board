import MonacoEditor, { OnMount } from "@monaco-editor/react";
import MonacoJSXHighlighter from "monaco-jsx-highlighter";
import prettier from "prettier";
import parser from "prettier/parser-babel";
import { parse } from "@babel/parser";
import traverse from "@babel/traverse";
import "./CodeEditor.css";
import "./syntax.css";
import { Cell } from "../../state";
import { UpdateCellAction } from "../../state/actions";

const onMount: OnMount = (monacoEditor, monaco) => {
  const babel = (code: string) =>
    parse(code, {
      sourceType: "module",
      plugins: ["jsx"],
      errorRecovery: true,
    });

  const highlighter = new MonacoJSXHighlighter(
    monaco,
    babel,
    traverse,
    monacoEditor
  );

  highlighter.highlightOnDidChangeModelContent(100);
  highlighter.addJSXCommentCommand();
};

interface CodeEditorProps {
  defaultValue: string;
  cell: Cell;
  updateCell(id: string, content: string): UpdateCellAction;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  defaultValue,
  cell,
  updateCell,
}) => {
  const onFormatClick = () => {
    const unformatted = cell.content || defaultValue;

    const formatted = prettier
      .format(unformatted, {
        parser: "babel",
        plugins: [parser],
        useTabs: false,
        semi: true,
      })
      .replace("/\n$/", "");

    updateCell(cell.id, formatted);
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
        onChange={(value: string | undefined) =>
          updateCell(cell.id, value || "")
        }
        onMount={onMount}
        defaultValue={defaultValue}
        value={cell.content}
        theme="vs-dark"
        language="javascript"
        height="100%"
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
