import React from "react";
import { useSelector } from "react-redux";

const SelectedTileDisplay = (props) => {
  const selectedTile = useSelector((state) => state.draggedElement);
  return (
    <div>
      Selected Tile &nbsp;
      <img className="tile-32" src={selectedTile} />
    </div>
  );
};

export default SelectedTileDisplay;
