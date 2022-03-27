import React from "react";
import { Cell } from "../../state";
import { CodeCell } from "../CodeCell/CodeCell";
import { TextEditor } from "../TextEditor/TextEditor";

interface CellListItemProps {
  cell: Cell;
}

export const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
  /*   let child: JSX.Element;
  if (cell.type === "code") child = <CodeCell />;
  else child = <TextEditor />;

  return <div>{child}</div>; */

  if (cell.type === "code") return <CodeCell cell={cell} />;
  else return <TextEditor />;
};
