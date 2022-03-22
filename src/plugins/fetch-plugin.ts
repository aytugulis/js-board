import esbuild from "esbuild-wasm";
import axios from "axios";
import localForage from "localforage";

const fileCache = localForage.createInstance({
  name: "filecache",
});

export const fetchPlugin = (contents: string) => {
  return {
    name: "fetch-plugin",
    setup(build: esbuild.PluginBuild) {
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log("onLoad", args);

        if (args.path === "index.js")
          return {
            loader: "jsx",
            contents,
          };

        const cached = await localForage.getItem<esbuild.OnLoadResult>(
          args.path
        );
        if (cached) return cached;

        const { data, request } = await axios.get(args.path);

        const result: esbuild.OnLoadResult = {
          loader: "jsx",
          contents: data,
          resolveDir: new URL("./", request.responseURL).pathname,
        };

        await fileCache.setItem(args.path, result);

        return result;
      });
    },
  };
};
