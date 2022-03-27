import ReactDOM from "react-dom";
import "bulmaswatch/superhero/bulmaswatch.min.css";

import { CodeCell } from "./components/CodeCell/CodeCell";
import { TextEditor } from "./components/TextEditor/TextEditor";

const App = () => {
  return (
    <div>
      {/* <CodeCell /> */}
      <TextEditor />
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
