import React from "react";

function TargetBtn({ targetButtonPressed }) {
  return (
    <button className="topBtn" onClick={targetButtonPressed}>
      Target
    </button>
  );
}

export default TargetBtn;
