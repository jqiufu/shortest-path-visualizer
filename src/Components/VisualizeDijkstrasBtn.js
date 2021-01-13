import React from "react";

function VisualizeDijkstrasBtn({ visualizeDijkstras }) {
  return (
    <button className="topBtn" onClick={visualizeDijkstras}>
      Visualize Dijkstras
    </button>
  );
}

export default VisualizeDijkstrasBtn;
