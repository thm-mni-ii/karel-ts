import { State } from "./State";
import { Vector } from "./Vector";
import { WorldElement } from "./WorldElement";
import { Direction } from "./Direction";

export class Tools {
  static getWorldElementAt(state: State, position: Vector) {
    return (state.world[position[0]] ?? {})[position[1]] ?? WorldElement.none;
  }

  static render(state: State) {
    const tileSize = 70;

    const bodies = document.getElementsByTagName("body");
    if (bodies.length == 0) {
      throw new Error("Unable to find <body>-Tag.");
    }
    const body = bodies[0];

    const worldDiv = document.createElement("div");
    worldDiv.style.position = "absolute";
    worldDiv.style.top = `${tileSize}px`;
    worldDiv.style.left = `${tileSize}px`;
    worldDiv.style.width = `${state.worldSize[0] * tileSize}px`;
    worldDiv.style.height = `${state.worldSize[1] * tileSize}px`;
    worldDiv.style.border = "2px solid black";
    worldDiv.style.boxSizing = "content-box";
    body.replaceChildren(worldDiv);

    for (let y = 0; y < state.worldSize[1]; y += 1) {
      const yMarker = document.createElement("div");
      yMarker.style.position = "absolute";
      yMarker.style.width = `${tileSize}px`;
      yMarker.style.height = `${tileSize}px`;
      yMarker.style.top = `${tileSize + tileSize * y + tileSize / 3}px`;
      yMarker.style.textAlign = "center";
      yMarker.style.left = `0px`;
      yMarker.style.fontSize = `${tileSize / 3}px`;
      yMarker.innerHTML = `${y}`;
      body.appendChild(yMarker);

      for (let x = 0; x < state.worldSize[0]; x += 1) {
        const tile = Tools.getWorldElementAt(state, [x, y]);

        if (y == 0) {
          const xMarker = document.createElement("div");
          xMarker.style.position = "absolute";
          xMarker.style.width = `${tileSize}px`;
          xMarker.style.height = `${tileSize}px`;
          xMarker.style.top = `${tileSize / 3}px`;
          xMarker.style.left = `${tileSize + tileSize * x}px`;
          xMarker.style.textAlign = "center";
          xMarker.style.fontSize = `${tileSize / 3}px`;
          xMarker.innerHTML = `${x}`;
          body.appendChild(xMarker);
        }

        if (tile == WorldElement.beeper) {
          const beeper = document.createElement("div");
          beeper.style.position = "absolute";
          beeper.style.width = `${tileSize / 2}px`;
          beeper.style.height = `${tileSize / 2}px`;
          beeper.style.top = `${tileSize * y + tileSize / 4}px`;
          beeper.style.left = `${tileSize * x + tileSize / 4}px`;
          beeper.style.backgroundColor = "yellow";
          beeper.style.border = "2px solid black"
          beeper.style.rotate = "45deg"
          beeper.style.boxSizing = "border-box";
          worldDiv.appendChild(beeper);
        } else if (tile == WorldElement.wall) {
          const wall = document.createElement("div");
          wall.style.position = "absolute";
          wall.style.width = `${tileSize}px`;
          wall.style.height = `${tileSize}px`;
          wall.style.top = `${tileSize * y}px`;
          wall.style.left = `${tileSize * x}px`;
          wall.style.backgroundColor = "gray";
          wall.style.boxSizing = "border-box";
          wall.style.border = "2px solid black";
          worldDiv.appendChild(wall);
        } else {
          const dot = document.createElement("div");
          dot.style.position = "absolute";
          dot.style.width = `4px`;
          dot.style.height = `4px`;
          dot.style.top = `${tileSize * y + tileSize / 2 - 2}px`;
          dot.style.left = `${tileSize * x + tileSize / 2 - 2}px`;
          dot.style.backgroundColor = "black";
          worldDiv.appendChild(dot);
        }
      }
    }

    const karel = document.createElement("div");
    karel.innerHTML = "🤖<br>"
    switch (state.direction) {
      case Direction.east: karel.innerHTML += "➡️"; break;
      case Direction.south: karel.innerHTML += "⬇️️"; break;
      case Direction.west: karel.innerHTML += "⬅️️"; break;
      case Direction.north: karel.innerHTML += "⬆️️️"; break;
    }
    karel.style.position = "absolute";
    karel.style.width = `${tileSize}px`;
    karel.style.height = `${tileSize}px`;
    karel.style.top = `${tileSize * state.position[1]}px`;
    karel.style.left = `${tileSize * state.position[0]}px`;
    karel.style.boxSizing = "border-box";
    karel.style.fontSize = `${tileSize / 2}px`;
    karel.style.lineHeight = "1";
    karel.style.textAlign = "center";
    // karel.style.border = "2px solid black";
    // karel.style.backgroundColor = "lightblue";
    worldDiv.appendChild(karel);

    const beeperCounter = document.createElement("div");
    beeperCounter.innerText = `Beepers: ${state.beeperCount}`;
    beeperCounter.style.position = "absolute";
    beeperCounter.style.top = `${tileSize * (state.worldSize[1] + 1.1)}px`;
    beeperCounter.style.left = `${tileSize}px`;
    beeperCounter.style.width = `${state.worldSize[0] * tileSize}px`;
    body.appendChild(beeperCounter)
  }
}
