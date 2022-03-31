import React from "react";
import { Cell } from "../../state";
import { ActionBar } from "../ActionBar/ActionBar";
import { CodeCell } from "../CodeCell/CodeCell";
import { TextEditor } from "../TextEditor/TextEditor";
import "./CellListItem.css";

interface CellListItemProps {
  cell: Cell;
}

export const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
  let child: JSX.Element;
  if (cell.type === "code")
    child = (
      <>
        <div className="action-bar-wrapper">
          <ActionBar id={cell.id} />
        </div>
        <CodeCell cell={cell} />
      </>
    );
  else
    child = (
      <>
        <TextEditor cell={cell} />
        <ActionBar id={cell.id} />
      </>
    );

  return <div className="cell-list-item">{child}</div>;
};
