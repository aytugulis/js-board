import esbuild from "esbuild-wasm";

export const unpkgPathPlugin = () => {
  return {
    name: "unpkg-path-plugin",
    setup(build: esbuild.PluginBuild) {
      // Handle root file which name is index.js
      build.onResolve({ filter: /(^index\.js$)/ }, async (args: any) => {
        return { path: args.path, namespace: "a" };
      });

      // Handle relative paths in module
      build.onResolve({ filter: /^\.+\// }, async (args: any) => {
        return {
          path: new URL(args.path, "https://unpkg.com" + args.resolveDir + "/")
            .href,
          namespace: "a",
        };
      });

      // Handle modules
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        return { path: `https://unpkg.com/${args.path}`, namespace: "a" };
      });
    },
  };
};
