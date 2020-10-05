import React from "react";
import { useSelector } from "react-redux";

const SelectedTileDisplay = (props) => {
  var selectedTile = useSelector((state) => state.draggedElement);
  if (selectedTile === "") {
    selectedTile = process.env.PUBLIC_URL + "/images/special/empty.png";
  }
  return (
    <div>
      Selected Tile &nbsp;
      <img
        style={{ border: "2px solid black" }}
        className="tile-32"
        src={selectedTile}
      />
    </div>
  );
};

export default SelectedTileDisplay;
