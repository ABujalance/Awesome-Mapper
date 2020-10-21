import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Actions from "../Actions";
import AddLayer from "./AddLayer";
import { FaTrash } from "react-icons/fa";

const LayerSelector = (props) => {
  const dispatch = useDispatch();
  const selectedLayer = useSelector((state) => state.selectedLayer);
  const mapLayers = useSelector((state) => state.mapLayers);
  const deletedLayers = useSelector((state) => state.deletedLayers);

  const onClick = (evt, select) => {
    dispatch({
      type: Actions.SELECT_LAYER,
      selectedLayer: select,
    });
  };

  const deleteLayer = (evt, deletedLayer) => {
    if (
      window.confirm(
        "Do you want to delete the Layer called " +
          "Layer " +
          (deletedLayer + 1) +
          "? This action cannot be undone"
      )
    ) {
      dispatch({
        type: Actions.DELETE_LAYER,
        deletedLayer: deletedLayer,
      });
    }
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
        if (!deletedLayers.includes(index)) {
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
              <span>Layer {index + 1}</span>
              <span
                onClick={(evt) => deleteLayer(evt, index)}
                className="close small"
              >
                <FaTrash className="small" />
              </span>
            </button>
          );
        }
      })}
      <AddLayer />
    </div>
  );
};

export default LayerSelector;
