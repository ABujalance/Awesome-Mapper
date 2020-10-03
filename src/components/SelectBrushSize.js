import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Actions from "../Actions";

const SelectBrushSize = (props) => {
  const dispatch = useDispatch();
  const selectedSize = useSelector((state) => state.brushSize);

  const onClick = (evt, size) => {
    dispatch({
      type: Actions.SET_BRUSH_SIZE,
      brushSize: size,
    });
  };

  return (
    <div>
      <p>Brush Size</p>
      <button
        onClick={(evt) => onClick(evt, 0)}
        className={
          selectedSize === 0
            ? "btn btn-outline-light active"
            : "btn btn-outline-light"
        }
      >
        Small
      </button>
      <button
        onClick={(evt) => onClick(evt, 1)}
        className={
          selectedSize === 1
            ? "btn btn-outline-light active"
            : "btn btn-outline-light"
        }
      >
        Medium
      </button>
      <button
        onClick={(evt) => onClick(evt, 2)}
        className={
          selectedSize === 2
            ? "btn btn-outline-light active"
            : "btn btn-outline-light"
        }
      >
        Big
      </button>
    </div>
  );
};

export default SelectBrushSize;
