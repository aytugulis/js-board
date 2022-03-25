import { useState } from "react";

import { Loading } from "../Loading/Loading";
import { CodeEditor } from "../CodeEditor/CodeEditor";
import { Preview } from "../Preview/Preview";
import { bundler } from "../../bundler/index";

export const CodeCell = () => {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");
  /*   const [bundlerInitialized, setBundlerInitialized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | undefined>(); */

  /*   const startService = async () => {
    if (!loading && !bundlerInitialized) return;
    try {
      setLoading(false);
      setError(undefined);
      setBundlerInitialized(true);
    } catch (err) {
      setLoading(false);
      setError(err as Error);
      setBundlerInitialized(false);
    }
  }; */

  const onClick = async () => {
    const output = await bundler(input);
    setCode(output);
  };

  /*   if (loading) return <Loading />;
  if (error) return <>error</>; */

  return (
    <div>
      <CodeEditor
        defaultValue="const x = 1;"
        input={input}
        setInput={setInput}
      />
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <Preview code={code} />
    </div>
  );
};
