import express from "express";
import fs from "fs/promises";
import path from "path";

interface Cell {
  id: string;
  content: string;
  type: "text" | "code";
}

const initialContent = [
  {
    content:
      "# jscodeboard\nThis is an interactive coding environment. You can write Javascript, see it executed, and write comprehensive documentation using markdown.\n\n- Click any text cell (including this one) to edit it\n- The code in each code editor is all joined together into one file. If you define a variable in cell #1, you can refer to it in any following cell!\n- You can use any library in npm by importing it\n- You can show any React component, string, number, or anything else by calling the `show` function. This is a function built into this environment. Call show multiple times to show multiple values\n- Re-order or delete cells using the buttons on the top right\n- Add new cells by hovering on the divider between each cell\n\nAll of your changes get saved to the file you opened jscodeboard with. So if you ran `npx  jscodeboard serve test.js`, all of the text and code you write will be saved to the test.js file.",
    type: "text",
    id: "hjt6h",
  },
  {
    content:
      "import { useState } from 'react';\r\n\r\nconst Counter = () => {\r\n  const [count, setCount] = useState(0);\r\n\r\n  return (\r\n    <div>\r\n      <button onClick={() => setCount(count + 1)}>Click</button>\r\n      <h3>Count: {count}</h3>\r\n    </div>\r\n  );\r\n};\r\n\r\n// Display any variable or React component by calling 'show'\r\nshow(<Counter />);",
    type: "code",
    id: "ag3fz",
  },
  {
    content:
      "const App = () => {\r\n  return (\r\n    <div>\r\n      <h3>App Says Hi!</h3>\r\n      <i>Counter component will be rendered below...</i>\r\n      <hr />\r\n      {/* Counter was declared in an earlier cell - we can reference it here! */}\r\n      <Counter />\r\n    </div>\r\n  );\r\n};\r\n\r\nshow(<App />)",
    type: "code",
    id: "hsefl",
  },
];

export const createCellsRouter = (filename: string, dir: string) => {
  const router = express.Router();
  router.use(express.json());

  const fullPath = path.join(dir, filename);

  router.get("/cells", async (req, res) => {
    try {
      const result = await fs.readFile(fullPath, { encoding: "utf-8" });
      res.send(JSON.parse(result));
    } catch (error: any) {
      if (error.code === "ENOENT") {
        await fs.writeFile(fullPath, JSON.stringify(initialContent), "utf-8");
        res.send(initialContent);
      } else {
        throw error;
      }
    }
  });

  router.post("/cells", async (req, res) => {
    const { cells }: { cells: Cell[] } = req.body;

    await fs.writeFile(fullPath, JSON.stringify(cells), "utf-8");

    res.send({ status: "ok" });
  });

  return router;
};
