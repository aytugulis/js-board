import esbuild from "esbuild-wasm";
import axios from "axios";
import localForage from "localforage";

const fileCache = localForage.createInstance({
  name: "filecache",
});

export const fetchPlugin = (inputCode: string) => {
  return {
    name: "fetch-plugin",
    setup(build: esbuild.PluginBuild) {
      // Onload js
      build.onLoad({ filter: /(^index\.js$)/ }, async () => {
        return { loader: "jsx", contents: inputCode };
      });

      // Onload for caching
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        const cached = await localForage.getItem<esbuild.OnLoadResult>(
          args.path
        );
        if (cached) return cached;
      });

      // Onload css
      build.onLoad({ filter: /.css$/ }, async (args: any) => {
        const cached = await localForage.getItem<esbuild.OnLoadResult>(
          args.path
        );
        if (cached) return cached;

        const { data, request } = await axios.get(args.path);

        const escaped = data
          .replace(/\n/g, "")
          .replace(/"/g, '\\"')
          .replace(/'/g, "\\'");

        const contents = `
        const style = document.createElement("style");
        style.innerText = '${escaped}';
        document.head.appendChild(style);
        `;

        const result: esbuild.OnLoadResult = {
          loader: "jsx",
          contents,
          resolveDir: new URL("./", request.responseURL).pathname,
        };

        await fileCache.setItem(args.path, result);

        return result;
      });

      // Onload for getting package
      build.onLoad({ filter: /.*/ }, async (args: any) => {
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
