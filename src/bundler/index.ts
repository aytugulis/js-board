import esbuild from "esbuild-wasm";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";
import { fetchPlugin } from "./plugins/fetch-plugin";

const { VITE_ENV_KEY } = import.meta.env;

let bundlerInitialized = false;
export const bundler = async (rawCode: string) => {
  if (!bundlerInitialized) {
    await esbuild.initialize({
      worker: true,
      wasmURL: "https://www.unpkg.com/esbuild-wasm@0.14.27/esbuild.wasm",
    });
    bundlerInitialized = true;
  }

  const result = await esbuild.build({
    entryPoints: ["index.js"],
    bundle: true,
    write: false,
    plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
    define: {
      [VITE_ENV_KEY]: '"production"',
      global: "window",
    },
  });

  return result.outputFiles[0].text;
};
