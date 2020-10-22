import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Actions from "../Actions";
import AddLayer from "./AddLayer";
import { FaTrash, FaEdit, FaCheck } from "react-icons/fa";

const LayerSelector = (props) => {
  const dispatch = useDispatch();
  const selectedLayer = useSelector((state) => state.selectedLayer);
  const mapLayers = useSelector((state) => state.mapLayers);
  const deletedLayers = useSelector((state) => state.deletedLayers);
  const layerNames = useSelector((state) => state.layerNames);
  const [editLayer, setEditLayer] = useState();
  const [editLayerInput, setEditLayerInput] = useState("");

  const inputLayerName = useRef(null);
  useEffect(() => {
    if (inputLayerName.current) {
      inputLayerName.current.focus();
    }
  });

  const onClick = (evt, select) => {
    dispatch({
      type: Actions.SELECT_LAYER,
      selectedLayer: select,
    });
  };

  const handleKeyDown = (evt, index) => {
    if (evt.key === "Enter") {
      saveLayerName(index);
    }
    if (evt.keyCode === 27) {
      saveLayerName(index);
    }
  };

  const saveLayerName = (index) => {
    var newLayerNames = [...layerNames];
    newLayerNames[index] = editLayerInput;
    dispatch({
      type: Actions.CHANGE_LAYER_NAMES,
      layerNames: newLayerNames,
    });
    setEditLayerInput("");
    setEditLayer();
  };

  const deleteLayer = (evt, deletedLayer) => {
    if (
      window.confirm(
        "Do you want to delete the Layer called " +
          layerNames[deletedLayer] +
          "? This action cannot be undone"
      )
    ) {
      dispatch({
        type: Actions.DELETE_LAYER,
        deletedLayer: deletedLayer,
      });
    }
  };

  const editLayerName = (evt, index) => {
    setEditLayer(index);
    setEditLayerInput(layerNames[index]);
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
              onClick={(evt) => onClick(evt, index + 1)}
              onDoubleClick={() => {
                editLayerName(index);
              }}
              className={
                selectedLayer === index + 1
                  ? "btn btn-outline-dark active"
                  : "btn btn-outline-dark"
              }
            >
              {editLayer === index ? (
                <span className="layer-selector" tabIndex="200">
                  <span className="layer-name">
                    <input
                      ref={inputLayerName}
                      onBlur={() => {
                        saveLayerName(index);
                      }}
                      type="text"
                      value={editLayerInput}
                      onChange={(evt) => {
                        setEditLayerInput(evt.target.value);
                      }}
                      onKeyDown={(evt) => handleKeyDown(evt, index)}
                    ></input>
                  </span>
                  <div className="layer-actions">
                    <span
                      onClick={(evt) => saveLayerName(evt, index)}
                      className="close"
                    >
                      <FaCheck className=" save-layer" />
                    </span>
                  </div>
                </span>
              ) : (
                <span className="layer-selector">
                  <span className="layer-name">{layerNames[index]}</span>
                  <div className="layer-actions">
                    <span
                      onClick={(evt) => editLayerName(evt, index)}
                      className="close"
                    >
                      <FaEdit className=" edit-layer" />
                    </span>
                    <span
                      onClick={(evt) => deleteLayer(evt, index)}
                      className="close"
                    >
                      <FaTrash className=" delete-layer" />
                    </span>
                  </div>
                </span>
              )}
            </button>
          );
        }
      })}
      <AddLayer />
    </div>
  );
};

export default LayerSelector;
