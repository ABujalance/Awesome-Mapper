import React from "react";
import { useDispatch } from "react-redux";
import Actions from "../Actions";

const TilesGallery = (props) => {
  const tileTypes = props.tileTypes;
  const dispatch = useDispatch();

  const onClick = (event, tileName) => {
    event.preventDefault();
    dispatch({
      type: Actions.CHANGE_DRAGGED_ELEMENT,
      draggedElement: tileName,
    });
  };

  return (
    <div>
      <div className="tiles-gallery" aria-label="Tiles">
        {tileTypes.map((tileName) => {
          var tileType = process.env.PUBLIC_URL + "/images/" + tileName;
          return (
            <div
              className="drag-tile"
              onClick={(event) => onClick(event, tileName)}
            >
              <img src={tileType}></img>
            </div>
          );
        })}
      </div>
      <div
        className="drag-tile eraser"
        onClick={(event) => onClick(event, "")}
      ></div>
    </div>
  );
};

export default TilesGallery;
