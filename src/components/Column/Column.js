import React from "react";
import Tile from "../Tile/Tile";

export default function Column(props) {
  return (
    <div>
      {props.tiles.map((_, index) => {
        return <Tile key={index} />;
      })}
    </div>
  );
}
