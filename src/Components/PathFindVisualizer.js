import React, { useState } from "react";
import Node from "./Node";
import StartBtn from "./StartBtn";
import TargetBtn from "./TargetBtn";
import CreateWallBtn from "./CreateWallBtn";
import VisualizeDijkstrasBtn from "./VisualizeDijkstrasBtn";
import ClearGridBtn from "./ClearGridBtn";
import ClearWallsBtn from "./ClearWallsBtn";

import { CustomGrid } from "../DataStructures/CustomGrid";
import { Dijkstras } from "../Algorithms/Dijkstras";
import { cloneDeep } from "lodash";

import "./PathFindVisualizer.css";

const customGrid = new CustomGrid(20, 45);

// Function to decide the node className
const nodeType = (node) => {
  const nodeType = node.isShortestPath
    ? "isShortestPath"
    : node.isVisited
    ? "isVisited"
    : node.isWall
    ? "isWall"
    : node.isStart
    ? "isStart"
    : node.isFinish
    ? "isFinish"
    : "";

  return nodeType;
};

function PathFindVisualizer() {
  const [grid, setGrid] = useState(customGrid.grid);
  const [isButtonPressed, setIsButtonPressed] = useState({
    pressed: false,
    type: null,
  });
  const [source, setSource] = useState({
    hasInstance: false,
    row: null,
    col: null,
  });
  const [target, setTarget] = useState({
    hasInstance: false,
    row: null,
    col: null,
  });
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [visualize, setVisualize] = useState({
    isOngoing: false,
    hasOccurred: false,
  });

  const targetButtonPressed = () => {
    if (isButtonPressed.pressed) {
      if (isButtonPressed.type !== "target") {
        setIsButtonPressed({ pressed: true, type: "target" });
      } else {
        setIsButtonPressed({ pressed: false, type: null });
      }
    } else {
      setIsButtonPressed({ pressed: true, type: "target" });
      if (visualize.hasOccurred) {
        inanimatePath(grid);
      }
    }
  };

  const sourceButtonPressed = () => {
    if (isButtonPressed.pressed) {
      if (isButtonPressed.type !== "source") {
        setIsButtonPressed({ pressed: true, type: "source" });
      } else {
        setIsButtonPressed({ pressed: false, type: null });
      }
    } else {
      setIsButtonPressed({ pressed: true, type: "source" });
      if (visualize.hasOccurred) {
        inanimatePath(grid);
      }
    }
  };

  const wallButtonPressed = () => {
    if (isButtonPressed.pressed) {
      if (isButtonPressed.type !== "wall") {
        setIsButtonPressed({ pressed: true, type: "wall" });
      } else {
        setIsButtonPressed({ pressed: false, type: null });
      }
    } else {
      setIsButtonPressed({ pressed: true, type: "wall" });
      if (visualize.hasOccurred) {
        inanimatePath(grid);
      }
    }
  };

  const clearGrid = () => {
    setGrid(customGrid.grid);
    setSource({ hasInstance: false, row: null, col: null });
    setTarget({ hasInstance: false, row: null, col: null });
  };

  const clearWalls = () => {
    const newGrid = grid.map((row) =>
      row.map((node) => {
        if (node.isWall) {
          node.isWall = false;
        }

        return node;
      })
    );

    setGrid(newGrid);
  };

  const visualizeDijkstras = () => {
    setIsButtonPressed({ pressed: false, type: "null" });
    if (visualize.isOngoing) {
      return;
    }

    if (!source.hasInstance || !target.hasInstance) {
      return;
    }

    if (visualize.hasOccurred) {
      inanimatePath(grid);
      setVisualize((prev) => {
        const newPrev = cloneDeep(prev);
        newPrev.isOngoing = true;
        return { ...newPrev };
      });
    } else {
      setVisualize((prev) => {
        const newPrev = cloneDeep(prev);
        newPrev.isOngoing = true;
        newPrev.hasOccurred = true;
        return { ...newPrev };
      });
    }

    const newGrid = cloneDeep(grid);
    const sourceNode = newGrid[source.row][source.col];
    const targetNode = newGrid[target.row][target.col];
    const [visitedNodes, shortestPath] = Dijkstras(
      newGrid,
      sourceNode,
      targetNode
    );
    visitedNodes.shift();
    shortestPath.shift();

    animatePath(visitedNodes, "isVisited");
    animatePath(shortestPath, "isShortestPath");
    setVisualize((prev) => {
      const newPrev = cloneDeep(prev);
      newPrev.isOngoing = false;
      return { ...newPrev };
    });
  };

  const animatePath = (pathArray, pathType) => {
    for (let i = 0; i < pathArray.length; i++) {
      const node = pathArray[i];
      setTimeout(() => {
        setGrid((prevGrid) => {
          const newGrid = [...prevGrid];
          newGrid[node.row][node.col][pathType] = true;
          return newGrid;
        });
      }, 100);
    }
  };

  const inanimatePath = (grid) => {
    const newGrid = grid.map((row) =>
      row.map((node) => {
        if (node.isShortestPath) {
          node.isShortestPath = false;
          node.isVisited = false;
        } else if (node.isVisited) {
          node.isVisited = false;
        }

        return node;
      })
    );

    setGrid(newGrid);
  };

  return (
    <div className="container">
      <div className="leftSide">
        <h1 className="title">Dijkstra's Shortest Path Visualizer</h1>
        <div className="instructions">{instructions.split("\n").map((item, i) => <p key={i}>{item}</p>)}</div>
      </div>
      <div className="rightSide">
        <div className="buttons">
          <StartBtn sourceButtonPressed={sourceButtonPressed} />
          <TargetBtn targetButtonPressed={targetButtonPressed} />
          <CreateWallBtn wallButtonPressed={wallButtonPressed} />
          <VisualizeDijkstrasBtn visualizeDijkstras={visualizeDijkstras} />
        </div>
        <div className="grid">
          {grid.map((row, rowIndex) => {
            return (
              <div key={rowIndex} className="row">
                {row.map((node) => {
                  return (
                    <Node
                      key={node.id}
                      initialGrid={grid}
                      initialNode={node}
                      setGrid={setGrid}
                      nodeType={nodeType(node)}
                      isButtonPressed={isButtonPressed}
                      setIsButtonPressed={setIsButtonPressed}
                      source={source}
                      target={target}
                      setSource={setSource}
                      setTarget={setTarget}
                      isMouseDown={isMouseDown}
                      setIsMouseDown={setIsMouseDown}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
        <div className="clearButtons">
          <ClearGridBtn clearGrid={clearGrid} />
          <ClearWallsBtn clearWalls={clearWalls} />
        </div>
      </div>
    </div>
  );
}

const instructions = "Instructions:\n"
                    + "1. Press the Source button and place a source location on the grid\n" 
                    + "2. Press the Target button and place a target location on the grid\n" 
                    + "3. To create walls, click the Create Walls button, then click and drag on the grid" 
                    + "   To stop creating walls, click the Create Walls button again." 
                    + "   To delete specific walls, while the Create Walls button is active, you can click and" 
                    + "   drag on existing walls. To delete all walls, press the Clear Walls button.\n" 
                    + "4. To start the animation, click the Visualize Dijkstras button. Wait until the animation ends.\n" 
                    + "5. To repeat the animation once it ended, you can click on the Visualize Dijkstras button again.\n" 
                    + "6. To clear the grid, click on the Clear Grid button.";

export default PathFindVisualizer;
