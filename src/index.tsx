import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

import esbuild from "esbuild-wasm";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";
import { fetchPlugin } from "./plugins/fetch-plugin";
import "bulmaswatch/superhero/bulmaswatch.min.css";

import { Loading } from "./components/Loading/Loading";
import { CodeEditor } from "./components/CodeEditor/CodeEditor";

const { VITE_ENV_KEY } = import.meta.env;

const App = () => {
  const iframe = useRef<any>();
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
        wasmURL: "https://www.unpkg.com/esbuild-wasm@0.14.27/esbuild.wasm",
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
    iframe.current.srcdoc = html;

    const result = await esbuild.build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(input)],
      define: {
        [VITE_ENV_KEY]: '"production"',
        global: "window",
      },
    });

    //setCode(result.outputFiles[0].text);
    iframe.current.contentWindow.postMessage(result.outputFiles[0].text, "*");
  };

  const html = `
    <html>
      <head></head>
      <body>
        <div id="root"></div>
        <script>
          window.addEventListener('message', (event) => {
            try {
              eval(event.data);
            } catch (err) {
              const root = document.querySelector("#root");
              root.innerHTML = '<div style="color: red;"><h4>Runtime Error<h4>' + err + '</div>';
              throw err
            }
          }, false);
        </script>
      </body>
    </html>
  `;

  if (loading) return <Loading />;
  if (error) return <>error</>;

  return (
    <div>
      <CodeEditor
        defaultValue="const x = 1;"
        input={input}
        setInput={setInput}
      />
      <textarea onChange={(e) => setInput(e.target.value)}></textarea>
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <iframe
        ref={iframe}
        title="code preview"
        sandbox="allow-scripts"
        srcDoc={html}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
