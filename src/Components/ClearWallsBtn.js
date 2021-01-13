import React from "react";

function ClearWallsBtn({ clearWalls }) {
  return (
    <button className="clearBtn" onClick={clearWalls}>
      Clear Walls
    </button>
  );
}

export default ClearWallsBtn;
