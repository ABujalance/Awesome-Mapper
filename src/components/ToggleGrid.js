import React from "react";
import Actions from "../Actions";
import { useDispatch, useSelector } from "react-redux";

const ToggleGrid = (props) => {
  const dispatch = useDispatch();
  const showGrid = useSelector((state) => state.showGrid);

  const onClick = () => {
    dispatch({
      type: Actions.TOGGLE_GRID,
    });
  };

  return (
    <button
      onClick={onClick}
      className={
        showGrid ? "btn btn-outline-light active" : "btn btn-outline-light"
      }
    >
      Toggle Grid
    </button>
  );
};

export default ToggleGrid;
