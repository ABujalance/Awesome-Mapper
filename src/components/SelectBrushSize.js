import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Actions from "../Actions";

const SelectBrushSize = (props) => {
  const dispatch = useDispatch();
  const selectedSize = useSelector((state) => state.brushSize);
  const eraseMode = useSelector((state) => state.eraseMode);
  const clearMode = useSelector((state) => state.clearMode);

  const onClick = (evt, size) => {
    dispatch({
      type: Actions.SET_BRUSH_SIZE,
      brushSize: size,
    });
  };

  const eraserBrush = () => {
    dispatch({
      type: Actions.TOGGLE_ERASE_MODE,
      eraseMode: !eraseMode,
    });
  };

  const clearLayer = () => {
    dispatch({
      type: Actions.TOGGLE_CLEAR_MODE,
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
            eraseMode
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
      <div className="aditional-brushes">
        <button
          onClick={(evt) => onClick(evt, 0)}
          className={
            clearMode ? "btn btn-outline-dark active" : "btn btn-outline-dark"
          }
          onClick={clearLayer}
        >
          Clear Layer
        </button>
      </div>
    </div>
  );
};

export default SelectBrushSize;
