import path from "path";
import { Command } from "commander";
import { serve } from "@jscodeboard/local-api";

const production = process.env.NODE_ENV === "production";

export const serverCommand = new Command()
  .command("serve [filename]")
  .description("Open file for editing.")
  .option("-p --port <number>", "port to run server on", "4005")
  .action(async (filename = "jscodeboard.js", options: { port: string }) => {
    try {
      const dir = path.join(process.cwd(), path.dirname(filename));
      await serve(
        parseInt(options.port),
        path.basename(filename),
        dir,
        !production
      );
      console.log(
        `Opened ${filename}. Nagigate to htpp://localhost:${options.port} to edit the file.`
      );
    } catch (err: any) {
      if (err.code === "EADDRINUSE")
        console.error("Port is in use. Try different port.");
      else console.log("Here's the problem", err.message);

      process.exit(1);
    }
  });
