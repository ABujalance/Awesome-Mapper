import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import Actions from "../Actions";
import { Collapse, Button, CardBody, Card } from "reactstrap";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { FaEdit, FaCheck } from "react-icons/fa";

const TilesGallery = (props) => {
  const dispatch = useDispatch();
  const [openFolder, setOpenFolder] = useState("");
  const [editFolder, setEditFolder] = useState("");
  const [editFolderEditing, setEditFolderEditing] = useState("");
  const [customTiles, setCustomTiles] = useState([]);
  const toggle = (folder) => {
    if (openFolder === folder) {
      setOpenFolder("");
    } else {
      setOpenFolder(folder);
    }
  };

  const inputFolderName = useRef(null);
  useEffect(() => {
    if (inputFolderName.current) {
      inputFolderName.current.focus();
    }
  });

  const onClick = (event, tileName) => {
    event.preventDefault();
    dispatch({
      type: Actions.CHANGE_DRAGGED_ELEMENT,
      draggedElement: tileName,
    });
  };

  const handleKeyDown = (evt, customTileCollection) => {
    if (evt.key === "Enter") {
      saveFolderName(customTileCollection);
    }
    if (evt.keyCode === 27) {
      saveFolderName(customTileCollection);
    }
  };

  const editFolderName = (customTileCollection) => {
    setEditFolder(customTileCollection.folderName);
    setEditFolderEditing(customTileCollection.folderName);
  };

  const saveFolderName = (customTileCollection) => {
    customTileCollection.folderName = editFolderEditing;
    setEditFolder("");
  };

  async function onChangeHandler(event) {
    var newCustomCollection = {
      folderName: "Custom collection " + Number(customTiles.length + 1),
      tiles: [],
    };
    var newCustomImages = [];
    const files = event.target.files;
    for (var i = 0; i < files.length; i++) {
      const file = event.target.files[i];
      var objectURL = URL.createObjectURL(file);
      newCustomImages.push(objectURL);
    }
    newCustomCollection.tiles = newCustomImages;
    console.log(newCustomCollection);
    setCustomTiles([...customTiles, newCustomCollection]);
    event.target.value = null;
  }

  return (
    <div className="tiles-selector">
      <h2>Tile Selector</h2>
      <Tabs>
        <TabList>
          {customTiles.map((customTileCollection) => {
            if (editFolder != customTileCollection.folderName) {
              return (
                <Tab
                  onDoubleClick={() => {
                    editFolderName(customTileCollection);
                  }}
                >
                  {customTileCollection.folderName}&nbsp;&nbsp;
                  <a
                    onClick={() => {
                      editFolderName(customTileCollection);
                    }}
                  >
                    <FaEdit />
                  </a>
                </Tab>
              );
            } else {
              return (
                <Tab tabIndex="200">
                  <input
                    ref={inputFolderName}
                    onBlur={() => {
                      saveFolderName(customTileCollection);
                    }}
                    type="text"
                    value={editFolderEditing}
                    onChange={(evt) => {
                      setEditFolderEditing(evt.target.value);
                    }}
                    onKeyDown={(evt) =>
                      handleKeyDown(evt, customTileCollection)
                    }
                  ></input>
                  &nbsp;&nbsp;
                  <a
                    onClick={() => {
                      saveFolderName(customTileCollection);
                    }}
                  >
                    <FaCheck />
                  </a>
                </Tab>
              );
            }
          })}
          <Tab>
            <input
              id="loadMap"
              type="file"
              name="file"
              onChange={(evt) => onChangeHandler(evt)}
              accept=".png"
              multiple
            />
          </Tab>
        </TabList>
        {customTiles.map((customTileCollection) => {
          return (
            <TabPanel className="tiles-gallery">
              {customTileCollection.tiles.map((tileName) => {
                return (
                  <div
                    className="drag-tile"
                    onClick={(event) => onClick(event, tileName)}
                  >
                    <img src={tileName}></img>
                  </div>
                );
              })}
            </TabPanel>
          );
        })}
      </Tabs>
    </div>
  );
};

export default TilesGallery;
