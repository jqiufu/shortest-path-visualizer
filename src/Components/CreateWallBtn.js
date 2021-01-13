import React from "react";

function CreateWallBtn({ wallButtonPressed }) {
  return (
    <button className="topBtn" onClick={wallButtonPressed}>
      Create Walls
    </button>
  );
}

export default CreateWallBtn;
