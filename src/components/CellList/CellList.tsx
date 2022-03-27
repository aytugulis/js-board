import { useTypedSelector } from "../../hooks/use-typed-selector";
import { CellListItem } from "../CellListItem/CellListItem";

export const CellList = () => {
  const cells = useTypedSelector(({ cells: { order, data } }) =>
    order.map((id) => data[id])
  );

  const renderedCells = cells.map((cell) => (
    <CellListItem key={cell.id} cell={cell} />
  ));

  return <div>{renderedCells}</div>;
};
