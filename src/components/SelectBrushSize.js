import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Actions from "../Actions";

const SelectBrushSize = (props) => {
  const dispatch = useDispatch();
  const selectedSize = useSelector((state) => state.brushSize);
  const selectedTile = useSelector((state) => state.draggedElement);

  const onClick = (evt, size) => {
    dispatch({
      type: Actions.SET_BRUSH_SIZE,
      brushSize: size,
    });
  };

  const eraserBrush = () => {
    dispatch({
      type: Actions.CHANGE_DRAGGED_ELEMENT,
      draggedElement: "",
    });
  };

  return (
    <div>
      <p>Brush Size</p>
      <div className="brush-selector">
        {" "}
        <button
          onClick={(evt) => onClick(evt, 1)}
          className={
            selectedSize === 1
              ? "btn btn-outline-light active"
              : "btn btn-outline-light "
          }
        >
          <img
            src={process.env.PUBLIC_URL + "/images/special/grid.png"}
            width="10px"
            height="10px"
          ></img>
        </button>
        <button
          onClick={(evt) => onClick(evt, 2)}
          className={
            selectedSize === 2
              ? "btn btn-outline-light  active"
              : "btn btn-outline-light "
          }
        >
          <img
            src={process.env.PUBLIC_URL + "/images/special/grid.png"}
            width="20px"
            height="20px"
          ></img>
        </button>
        <button
          onClick={(evt) => onClick(evt, 4)}
          className={
            selectedSize === 4
              ? "btn btn-outline-light  active"
              : "btn btn-outline-light"
          }
        >
          <img
            src={process.env.PUBLIC_URL + "/images/special/grid.png"}
            width="30px"
            height="30px"
          ></img>
        </button>
      </div>
      <div className="aditional-brushes">
        <button
          onClick={(evt) => onClick(evt, 0)}
          className={
            selectedSize === 0
              ? "btn btn-outline-light btn-link active"
              : "btn btn-outline-light"
          }
        >
          <img
            src={process.env.PUBLIC_URL + "/images/special/bucket.png"}
          ></img>
        </button>
        <button
          onClick={(evt) => onClick(evt, 0)}
          className={
            selectedTile === ""
              ? "btn btn-outline-light btn-link active"
              : "btn btn-outline-light"
          }
          onClick={eraserBrush}
        >
          <img
            src={process.env.PUBLIC_URL + "/images/special/eraser.png"}
            width="32px"
            height="32px"
          ></img>
        </button>
      </div>
    </div>
  );
};

export default SelectBrushSize;
