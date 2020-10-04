import React from "react";
import { useSelector } from "react-redux";

const SelectedTileDisplay = (props) => {
  const selectedLayer = useSelector((state) => state.draggedElement);
  const imgUrl = selectedLayer
    ? process.env.PUBLIC_URL + "/images/" + selectedLayer
    : process.env.PUBLIC_URL + "/images/special/empty.png";
  return (
    <div>
      Selected Tile &nbsp;
      <img src={imgUrl} />
    </div>
  );
};

export default SelectedTileDisplay;
