import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Actions from "../Actions";
import AddLayer from "./AddLayer";

const LayerSelector = (props) => {
  const dispatch = useDispatch();
  const selectedLayer = useSelector((state) => state.selectedLayer);
  const mapLayers = useSelector((state) => state.mapLayers);

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
            ? "btn btn-outline-dark active"
            : "btn btn-outline-dark"
        }
      >
        Base Layer
      </button>
      {Array.from(Array(mapLayers), (el, index) => {
        return (
          <button
            onClick={(evt) => onClick(evt, index)}
            className={
              selectedLayer === index
                ? "btn btn-outline-dark active"
                : "btn btn-outline-dark"
            }
          >
            Layer {index + 1}
          </button>
        );
      })}
      <AddLayer />
    </div>
  );
};

export default LayerSelector;
