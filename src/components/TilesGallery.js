import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Actions from "../Actions";
import { Collapse, Button, CardBody, Card } from "reactstrap";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const TilesGallery = (props) => {
  const dispatch = useDispatch();
  const [openFolder, setOpenFolder] = useState("");
  const [customTiles, setCustomTiles] = useState([]);
  const toggle = (folder) => {
    if (openFolder === folder) {
      setOpenFolder("");
    } else {
      setOpenFolder(folder);
    }
  };

  const onClick = (event, tileName) => {
    event.preventDefault();
    dispatch({
      type: Actions.CHANGE_DRAGGED_ELEMENT,
      draggedElement: tileName,
    });
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
            return <Tab>{customTileCollection.folderName}</Tab>;
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
