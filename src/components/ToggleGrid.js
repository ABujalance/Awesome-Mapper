import React from "react";
import Actions from "../Actions";
import { useDispatch, useSelector } from "react-redux";

const ToggleGrid = (props) => {
  const dispatch = useDispatch();
  const showGrid = useSelector((state) => state.showGrid);

  const handleInputChange = () => {
    dispatch({
      type: Actions.TOGGLE_GRID,
    });
  };

  return (
    <div className="toggle-grid">
      <label>
        <span>Show Grid</span>
        <input
          name="showGrid"
          type="checkbox"
          checked={showGrid}
          onChange={() => handleInputChange()}
        />
      </label>
    </div>
  );
};

export default ToggleGrid;
