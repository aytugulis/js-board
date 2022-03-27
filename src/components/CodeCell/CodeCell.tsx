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
  const [code, setCode] = useState("");
  const [err, setErr] = useState("");
  const { updateCell } = useActions();

  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundler(cell.content);
      setCode(output.code);
      setErr(output.err);
    }, 750);

    return () => {
      clearTimeout(timer);
    };
  }, [cell.content]);

  return (
    <Resizable direction="vertical">
      <div style={{ height: "100%", display: "flex", flexDirection: "row" }}>
        <Resizable direction="horizontal">
          <CodeEditor
            defaultValue="const x = 1;console.log(x);"
            cell={cell}
            updateCell={updateCell}
          />
        </Resizable>
        <Preview code={code} err={err} />
      </div>
    </Resizable>
  );
};
