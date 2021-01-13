import React from "react";
import { cloneDeep } from "lodash";

import "./Node.css";

function Node({
  initialGrid,
  initialNode,
  setGrid,
  nodeType,
  isButtonPressed,
  setIsButtonPressed,
  source,
  target,
  setSource,
  setTarget,
  isMouseDown,
  setIsMouseDown,
}) {
  const onNodeClick = () => {
    if (!isButtonPressed.pressed) {
      return;
    }

    if (isButtonPressed.type === "wall") {
      return;
    }

    if (initialNode.isStart || initialNode.isFinish || initialNode.isWall) {
      setIsButtonPressed({ pressed: false, type: null });
      return;
    }

    const newGrid = cloneDeep(initialGrid);

    if (isButtonPressed.type === "source") {
      newGrid[initialNode.row][initialNode.col].isStart = true;
      if (source.hasInstance) {
        newGrid[source.row][source.col].isStart = false;
      }

      setSource({
        hasInstance: true,
        row: initialNode.row,
        col: initialNode.col,
      });
    } else if (isButtonPressed.type === "target") {
      newGrid[initialNode.row][initialNode.col].isFinish = true;
      if (target.hasInstance) {
        newGrid[target.row][target.col].isFinish = false;
      }

      setTarget({
        hasInstance: true,
        row: initialNode.row,
        col: initialNode.col,
      });
    }

    setIsButtonPressed({ pressed: false, type: null });
    setGrid(newGrid);
  };

  const onNodePressed = () => {
    if (!isButtonPressed.pressed) {
      return;
    }

    if (isButtonPressed.type !== "wall") {
      return;
    }

    const newGrid = cloneDeep(initialGrid);

    newGrid[initialNode.row][initialNode.col].isWall = !newGrid[
      initialNode.row
    ][initialNode.col].isWall;

    setIsMouseDown(true);
    setGrid(newGrid);
  };

  const onNodeEnter = () => {
    if (!isMouseDown) {
      return;
    }

    const newGrid = cloneDeep(initialGrid);

    newGrid[initialNode.row][initialNode.col].isWall = !newGrid[
      initialNode.row
    ][initialNode.col].isWall;

    setGrid(newGrid);
  };

  const onNodeReleased = () => {
    if (!isButtonPressed.pressed) {
      return;
    }

    if (isButtonPressed.type !== "wall") {
      return;
    }

    setIsMouseDown(false);
    setIsButtonPressed({ pressed: false, type: null });
  };

  return (
    <div
      id={`${initialNode.id}`}
      className={`node ${nodeType}`}
      onClick={onNodeClick}
      onMouseDown={onNodePressed}
      onMouseEnter={onNodeEnter}
      onMouseUp={onNodeReleased}
    ></div>
  );
}

export default Node;
