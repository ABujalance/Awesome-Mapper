import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Actions from "../Actions";

const LayerSelector = (props) => {
  const dispatch = useDispatch();
  const selectedLayer = useSelector((state) => state.selectedLayer);

  const onClick = (evt, selectedLayer) => {
    dispatch({
      type: Actions.SELECT_LAYER,
      selectedLayer: selectedLayer,
    });
  };

  return (
    <div>
      <button
        onClick={(evt) => onClick(evt)}
        className={
          !selectedLayer && selectedLayer != 0
            ? "btn btn-outline-light active"
            : "btn btn-outline-light"
        }
      >
        Base Layer
      </button>
      <button
        onClick={(evt) => onClick(evt, 0)}
        className={
          selectedLayer === 0
            ? "btn btn-outline-light active"
            : "btn btn-outline-light"
        }
      >
        Layer 1
      </button>
    </div>
  );
};

export default LayerSelector;
