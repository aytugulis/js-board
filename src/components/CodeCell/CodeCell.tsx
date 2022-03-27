import { useEffect, useState } from "react";

import { bundler } from "../../bundler/index";
import { useActions } from "../../hooks/use-actions";
import { Cell } from "../../state";
import { CodeEditor } from "../CodeEditor/CodeEditor";
import { Preview } from "../Preview/Preview";
import { Resizable } from "../Resizable/Resizable";

interface CodeCellProps {
  cell: Cell;
}

export const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");
  const [err, setErr] = useState("");
  const { updateCell } = useActions();

  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundler(input);
      setCode(output.code);
      setErr(output.err);
    }, 750);

    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  return (
    <Resizable direction="vertical">
      <div style={{ height: "100%", display: "flex", flexDirection: "row" }}>
        <Resizable direction="horizontal">
          <CodeEditor
            defaultValue="const x = 1;console.log(x);"
            input={input}
            setInput={setInput}
          />
        </Resizable>
        <Preview code={code} err={err} />
      </div>
    </Resizable>
  );
};