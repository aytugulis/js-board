import path from "path";
import { Command } from "commander";
import { serve } from "local-api";

export const serverCommand = new Command()
  .command("serve [filename]")
  .description("Open file for editing.")
  .option("-p --port <number>", "port to run server on", "4005")
  .action((filename = "js-board.js", options: { port: string }) => {
    const dir = path.join(process.cwd(), path.dirname(filename));
    serve(parseInt(options.port), path.basename(filename), dir);
  });
