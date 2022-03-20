import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import esbuild from "esbuild-wasm";
import { Loading } from "./components/Loading";

const App = () => {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");
  const [bundlerInitialized, setBundlerInitialized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | undefined>();

  const startService = async () => {
    if (!loading && !bundlerInitialized) return;
    try {
      await esbuild.initialize({
        worker: true,
        wasmURL: "/esbuild.wasm",
      });

      setLoading(false);
      setError(undefined);
      setBundlerInitialized(true);
    } catch (err) {
      setLoading(false);
      setError(err as Error);
      setBundlerInitialized(false);
    }
  };

  useEffect(() => {
    startService();
  }, []);

  const onClick = async () => {
    const result = await esbuild.transform(input, {
      loader: "jsx",
      target: "es2015",
    });

    setCode(result.code);
  };

  if (loading) return <Loading />;
  if (error) return <>error</>;

  return (
    <div>
      <textarea onChange={(e) => setInput(e.target.value)}></textarea>
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <pre>{code}</pre>
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
