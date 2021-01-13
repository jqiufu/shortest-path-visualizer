import React from "react";

function ClearGridBtn({ clearGrid }) {
  return (
    <button className="clearBtn" onClick={clearGrid}>
      Clear Grid
    </button>
  );
}

export default ClearGridBtn;
