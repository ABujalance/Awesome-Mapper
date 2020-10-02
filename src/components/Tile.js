import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Actions from "../Actions";

const Tile = (props) => {
  const dispatch = useDispatch();

  const draggedElement = useSelector((state) => state.draggedElement);

  const tileType = props.tileType;
  const index = props.index;
  const isBase = props.isBase;
  const imgUrl = tileType
    ? process.env.PUBLIC_URL + "/images/" + tileType
    : isBase
    ? process.env.PUBLIC_URL + "/images/special/empty.png"
    : process.env.PUBLIC_URL + "/images/special/transparent.png";

  const onDragOver = (event) => {
    event.preventDefault();
  };
  const onDrop = (event) => {
    const y = event.target.parentNode.parentNode.parentNode.getAttribute(
      "index"
    );
    const x = event.target.parentNode.parentNode.getAttribute("index");
    dispatch({
      type: Actions.PLACE_TILE,
      x: x,
      y: y,
      tileName: draggedElement,
    });
  };

  return (
    <td index={index}>
      <div
        className="tile"
        onDrop={(event) => onDrop(event)}
        onDragOver={(event) => onDragOver(event)}
      >
        <img src={imgUrl} />
      </div>
    </td>
  );
};

export default Tile;