import React from "react";
import { useDispatch } from "react-redux";
import Actions from "../Actions";

const TilesGallery = (props) => {
  const tileTypes = props.tileTypes;
  const dispatch = useDispatch();

  const onDrag = (event, tileName) => {
    event.preventDefault();
    dispatch({
      type: Actions.CHANGE_DRAGGED_ELEMENT,
      draggedElement: tileName,
    });
  };

  const clickNewTile = (tileType) => {
    alert(tileType);
  };

  return (
    <div className="tiles-gallery" aria-label="Tiles">
      {tileTypes.map((tileName) => {
        var tileType = process.env.PUBLIC_URL + "/images/" + tileName;
        return (
          <div draggable onDrag={(event) => onDrag(event, tileName)}>
            <img src={tileType}></img>
          </div>
        );
      })}
    </div>
  );
};

export default TilesGallery;
