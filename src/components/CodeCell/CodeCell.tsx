import { useEffect, useState } from "react";

import { bundler } from "../../bundler/index";
import { CodeEditor } from "../CodeEditor/CodeEditor";
import { Preview } from "../Preview/Preview";
import { Resizable } from "../Resizable/Resizable";

export const CodeCell = () => {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");

  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundler(input);
      setCode(output);
    }, 750);

    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  /*   if (loading) return <Loading />;
  if (error) return <>error</>; */

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
        <Preview code={code} />
      </div>
    </Resizable>
  );
};
