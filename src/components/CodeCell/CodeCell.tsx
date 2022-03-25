import { useState } from "react";

import { bundler } from "../../bundler/index";
import { CodeEditor } from "../CodeEditor/CodeEditor";
import { Preview } from "../Preview/Preview";
import { Resizable } from "../Resizable/Resizable";

export const CodeCell = () => {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");

  const onClick = async () => {
    const output = await bundler(input);
    setCode(output);
  };

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
        {/*         <div>
          <button onClick={onClick}>Submit</button>
        </div> */}
        <Preview code={code} />
      </div>
    </Resizable>
  );
};
