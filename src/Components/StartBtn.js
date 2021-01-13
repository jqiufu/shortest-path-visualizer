import React from "react";

function StartBtn({ sourceButtonPressed }) {
  return (
    <button className="topBtn" onClick={sourceButtonPressed}>
      Source
    </button>
  );
}

export default StartBtn;
