import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Actions from "../Actions";
import AddLayer from "./AddLayer";

const LayerSelector = (props) => {
  const dispatch = useDispatch();
  const selectedLayer = useSelector((state) => state.selectedLayer);
  const mapLayers = useSelector((state) => state.mapLayers);

  const onClick = (evt, select) => {
    dispatch({
      type: Actions.SELECT_LAYER,
      selectedLayer: select,
    });
    console.log("selected ", select);
  };

  return (
    <div>
      <button
        onClick={(evt) => onClick(evt, 0)}
        className={
          selectedLayer === 0
            ? "btn btn-outline-dark active"
            : "btn btn-outline-dark"
        }
      >
        Base Layer
      </button>
      {Array.from(Array(mapLayers), (el, index) => {
        return (
          <button
            className="close-wrapper"
            onClick={(evt) => onClick(evt, index + 1)}
            className={
              selectedLayer === index + 1
                ? "btn btn-outline-dark active"
                : "btn btn-outline-dark"
            }
          >
            Layer {index + 1}
            <span className="close" />
          </button>
        );
      })}
      <AddLayer />
    </div>
  );
};

export default LayerSelector;
