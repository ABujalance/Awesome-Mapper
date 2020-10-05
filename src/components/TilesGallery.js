import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Actions from "../Actions";
import { Collapse, Button, CardBody, Card } from "reactstrap";

const TilesGallery = (props) => {
  const tileTypes = props.tileTypes;
  const dispatch = useDispatch();
  const structureFolder = props.structureFolder;
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
    var newCustomImages = [];
    const files = event.target.files;
    for (var i = 0; i < files.length; i++) {
      const file = event.target.files[i];
      var objectURL = URL.createObjectURL(file);
      newCustomImages.push(objectURL);
    }
    alert(
      "Keep in mind that imported files will not be saved correctly with the map. When you load a previous map, you must reimport and redraw custom tiles"
    );
    setCustomTiles(newCustomImages);
    event.target.value = null;
  }

  return (
    <div>
      <h2>Tile Selector</h2>

      {structureFolder.map((folder, index) => {
        const name = folder.name;
        if (name != "special") {
          return (
            <div>
              <Button
                color="light"
                onClick={() => toggle(folder.name)}
                style={{ marginBottom: "1rem" }}
              >
                {folder.name}
              </Button>
              <Collapse isOpen={openFolder === name}>
                <Card className="bg-dark">
                  <CardBody className="tiles-gallery">
                    {folder.content.map((tileName) => {
                      var tileType =
                        process.env.PUBLIC_URL + "/images/" + tileName;
                      return (
                        <div
                          className="drag-tile"
                          onClick={(event) => onClick(event, tileType)}
                        >
                          <img className="tile-32" src={tileType}></img>
                        </div>
                      );
                    })}
                  </CardBody>
                </Card>
              </Collapse>
            </div>
          );
        } else {
          return <div></div>;
        }
      })}
      <Button
        color="light"
        onClick={() => toggle("Custom_Uploaded_Tiles")}
        style={{ marginBottom: "1rem" }}
      >
        Custom Tiles
      </Button>
      <Collapse isOpen={openFolder === "Custom_Uploaded_Tiles"}>
        <Card className="bg-dark">
          <CardBody className="tiles-gallery">
            {customTiles.map((tileName) => {
              console.log(tileName);
              return (
                <div
                  className="drag-tile"
                  onClick={(event) => onClick(event, tileName)}
                >
                  <img className="tile-32" src={tileName}></img>
                </div>
              );
            })}
          </CardBody>
        </Card>
      </Collapse>
      <input
        id="loadMap"
        type="file"
        name="file"
        onChange={(evt) => onChangeHandler(evt)}
        accept=".png"
        multiple
      />
    </div>
  );
};

export default TilesGallery;
