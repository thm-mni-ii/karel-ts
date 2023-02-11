type State = {
  world: World;
  worldSize: Vector;
  position: Vector;
  direction: Direction;
  beeperCount: number;
  levelName: string;
};

type Direction = "north" | "east" | "south" | "west";

type Vector = [number, number];

type World = Record<number, Record<number, WorldElement | null> | null>;

type WorldElement  = "none" | "wall" | "beeper";

class Karel {
  private callCount: number;

  private state: State;

  public constructor() {
    this.callCount = 0;
  }

  public loadLevel01(): void {
    this.state = {
      worldSize: [4, 3],
      world: {
        1: { 2: "beeper" },
        2: { 2: "wall" },
        3: { 2: "wall" }
      },
      position: [0, 2],
      direction: "east",
      beeperCount: 0,
      levelName: "Level 01",
    }
    this.render(this.state);
  }

  public loadLevel02(): void {
    this.state = {
      worldSize: [9, 5],
      world: {
        0: {
          0: "wall",
          1: "wall",
          3: "wall",
          4: "wall",
        },
        1: {
          0: "wall",
          1: "wall",
          3: "wall",
          4: "wall",
        },
        2: {
          0: "beeper",
          1: "wall",
          4: "beeper",
        },
        3: {
          3: "wall",
          4: "wall",
        },
        4: {
          0: "wall",
          1: "wall",
          3: "wall",
          4: "beeper",
        },
        6: {
          0: "beeper",
          1: "wall",
          3: "wall",
          4: "beeper",
        },
        7: {
          0: "wall",
          1: "wall",
          3: "wall",
          4: "wall",
        },
        8: {
          0: "wall",
          1: "wall",
          3: "wall",
          4: "wall",
        }
      },
      position: [0, 2],
      direction: "east",
      beeperCount: 0,
      levelName: "Level 02",
    }
    this.render(this.state);
  }

  public loadLevel03(mode?: "fixed"): void {
    this.state = {
      worldSize: [6, 3],
      world: {
        0: {
        },
        1: {
        },
        2: {
        },
        3: {
        },
        4: {
        },
      },
      position: [0, 1],
      direction: "east",
      beeperCount: 0,
      levelName: "Level 03",
    };

    if (this.random(0, 1) == 0 || mode == "fixed") {
      this.state.world[2][1] = "beeper";
    }
    if (this.random(0, 1) == 0 || mode == "fixed") {
      this.state.world[3][1] = "beeper";
    }

    this.render(this.state);
  }

  public loadLevel04(mode?: "fixed-a" | "fixed-b"): void {
    this.state = {
      worldSize: [5, 3],
      world: {
        0: {
          0: "wall",
          2: "wall",
        },
        2: {
          1: "wall",
        },
        3: {
        },
        4: {
          0: "wall",
          2: "wall",
        },
      },
      position: [0, 1],
      direction: "east",
      beeperCount: 0,
      levelName: "Level 04",
    };

    const r = this.random(0, 1);
    if (mode == null && r == 0 || mode == "fixed-a") {
      this.state.world[2][0] = "wall";
      this.state.world[2][2] = "beeper";
    } else {
      this.state.world[2][0] = "beeper";
      this.state.world[2][2] = "wall";
    }


    this.render(this.state);
  }

  public loadLevel05(mode?: "fixed-extreme" | "fixed"): void {
    let beeperCount: number;

    if (mode == "fixed-extreme") {
      beeperCount = 20;
    } else if (mode == "fixed") {
      beeperCount = 4;
    } else {
      beeperCount = this.random(2, 6);
    }

    this.state = {
      worldSize: [beeperCount + 4, 1],
      world: {
      },
      position: [0, 0],
      direction: "east",
      beeperCount: 0,
      levelName: "Level 05",
    };

    for (let i = 0; i < beeperCount; i += 1) {
      this.state.world[2 + i] = this.state.world[2 + i] ?? {};
      this.state.world[2 + i][0] = "beeper";
    }

    this.render(this.state);
  }

  public loadLevel06(mode?: "extreme" | "fixed" | "fixed-extreme"): void {
    let beeperCount: number;
    let levelWidth: number;

    if (mode == "fixed-extreme") {
      beeperCount = 20;
      levelWidth = 24;
    } else if (mode == "fixed") {
      beeperCount = 4;
      levelWidth = 8;
    } else if (mode == "extreme") {
      beeperCount = this.random(5, 20);
      levelWidth = 24;
    }  else {
      beeperCount = this.random(1, 4);
      levelWidth = 8;
    }

    this.state = {
      worldSize: [levelWidth, 1],
      world: {

      },
      position: [0, 0],
      direction: "east",
      beeperCount: beeperCount,
      levelName: "Level 06",
    };

    this.render(this.state);
  }

  public loadLevel07(mode?: "fixed-extreme" | "fixed"): void {
    let height: number;
    let width: number;

    if (mode == "fixed-extreme") {
      height = 20;
      width = 20;
    } else if (mode == "fixed") {
      height = 5;
      width = 6;
    } else {
      width = this.random(1, 6);
      height = this.random(1, 5);
    }

    this.state = {
      worldSize: [width, height],
      world: {

      },
      position: [0, 0],
      direction: "east",
      beeperCount: 0,
      levelName: "Level 06",
    };

    for(let x = 0; x < width; x += 1) {
      this.state.world[x] = {};
      for (let y = 0; y < height; y += 1) {
        this.state.world[x][y] = "beeper";
      }
    }

    this.render(this.state);
  }

  public move(): void {
    this.detectInfiniteLoop();

    let nextPosition = this.state.position;
    switch (this.state.direction) {
      case "east": nextPosition[0] += 1; break;
      case "south": nextPosition[1] += 1; break;
      case "west": nextPosition[0] += -1; break;
      case "north": nextPosition[1] += -1; break;
    }

    if (
      nextPosition[0] < 0 ||
      nextPosition[1] < 0 ||
      nextPosition[1] >= this.state.worldSize[1] ||
      nextPosition[0] >= this.state.worldSize[0]
    ) {
      throw new Error(`Unable to move outside of world.`);
    }

    if (this.getWorldElementAt(this.state, nextPosition) == "wall") {
      throw new Error("Unable to move into wall.")
    }

    this.state.position = nextPosition;
    this.render(this.state);
  }

  public turnLeft(): void {
    this.detectInfiniteLoop();

    switch (this.state.direction) {
      case "east": this.state.direction = "north"; break;
      case "north": this.state.direction = "west"; break;
      case "west": this.state.direction = "south"; break;
      case "south": this.state.direction = "east"; break;
    }

    this.render(this.state);
  }

  public pickBeeper(): void {
    this.detectInfiniteLoop();

    if (this.getWorldElementAt(this.state, this.state.position) !== "beeper") {
      throw new Error("Unable to pick beeper: There is no beeper on this tile.");
    }

    this.state.world[this.state.position[0]][this.state.position[1]] = null;
    this.state.beeperCount += 1;

    this.render(this.state);
  }

  public putBeeper(): void {
    this.detectInfiniteLoop();

    if (this.state.beeperCount == 0) {
      throw new Error("Unable to put beeper: There are no beepers in the beeper bag.")
    }
    if (this.getWorldElementAt(this.state, this.state.position) !== "none") {
      throw new Error("Unable to put beeper: There is no room for a beeper on this tile.");
    }

    if (this.state.world[this.state.position[0]] == null) {
      this.state.world[this.state.position[0]] = {};
    }
    this.state.world[this.state.position[0]][this.state.position[1]] = "beeper";
    this.state.beeperCount -= 1;

    this.render(this.state);
  }

  public isWallInfront(): boolean {
    this.detectInfiniteLoop();

    if (this.state.direction == "west") {
      if (this.state.position[0] == 0) {
        return true;
      }
      if (this.getWorldElementAt(this.state, [this.state.position[0] - 1, this.state.position[1]]) == "wall") {
        return true;
      }
    }
    if (this.state.direction == "north") {
      if (this.state.position[1] == 0) {
        return true;
      }
      if (this.getWorldElementAt(this.state, [this.state.position[0], this.state.position[1] - 1]) == "wall") {
        return true;
      }
    }
    if (this.state.direction == "east") {
      if (this.state.position[0] == this.state.worldSize[0] - 1) {
        return true;
      }
      if (this.getWorldElementAt(this.state, [this.state.position[0] + 1, this.state.position[1]]) == "wall") {
        return true;
      }
    }
    if (this.state.direction == "south") {
      if (this.state.position[1] == this.state.worldSize[1] - 1) {
        return true;
      }
      if (this.getWorldElementAt(this.state, [this.state.position[0], this.state.position[1] + 1]) == "wall") {
        return true;
      }
    }
  }

  public isOnBeeper(): boolean {
    this.detectInfiniteLoop();

    return this.getWorldElementAt(this.state, this.state.position) == "beeper";
  }

  public getBeeperCount(): number {
    this.detectInfiniteLoop();

    return this.state.beeperCount;
  }

  private detectInfiniteLoop() {
    this.callCount += 1;
    if (this.callCount > 10_000_000) {
      throw new Error("Infinite loop detected.");
    }
  }

  private getWorldElementAt(state: State, position: Vector): WorldElement {
    return (state.world[position[0]] ?? {})[position[1]] ?? "none";
  }

  private render(state: State): void {
    const tileSize = 70;

    const bodies = document.getElementsByTagName("body");
    if (bodies.length == 0) {
      throw new Error("Unable to find the <body>-Element. Karel should only be used after 'DOMContentLoaded'.");
    }
    const body = bodies[0];

    const worldDiv = document.createElement("div");
    worldDiv.style.position = "absolute";
    worldDiv.style.top = `${tileSize}px`;
    worldDiv.style.left = `${tileSize}px`;
    worldDiv.style.width = `${state.worldSize[0] * tileSize - 2}px`;
    worldDiv.style.height = `${state.worldSize[1] * tileSize - 2}px`;
    worldDiv.style.border = "2px solid black";
    worldDiv.style.boxSizing = "content-box";
    body.replaceChildren(worldDiv);

    const yLetter = document.createElement("div");
    yLetter.style.position = "absolute";
    yLetter.style.width = `${tileSize}px`;
    yLetter.style.height = `${tileSize}px`;
    yLetter.style.top = `${tileSize * (state.worldSize[1] + 1) + 10}px`;
    yLetter.style.textAlign = "left";
    yLetter.style.left = `${tileSize - 5}px`;
    yLetter.style.fontSize = `${tileSize / 3}px`;
    yLetter.innerHTML = `y`;
    body.appendChild(yLetter);

    const xLetter = document.createElement("div");
    xLetter.style.position = "absolute";
    xLetter.style.width = `${tileSize}px`;
    xLetter.style.height = `${tileSize}px`;
    xLetter.style.top = `${tileSize - 15}px`;
    xLetter.style.left = `${tileSize * (state.worldSize[0] + 1) + 20}px`;
    xLetter.style.textAlign = "left";
    xLetter.style.fontSize = `${tileSize / 3}px`;
    xLetter.innerHTML = `x`;
    body.appendChild(xLetter);

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
        const tile = this.getWorldElementAt(state, [x, y]);

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

        if (tile == "beeper") {
          const beeper = document.createElement("div");
          beeper.style.position = "absolute";
          beeper.style.width = `${tileSize / 2}px`;
          beeper.style.height = `${tileSize / 2}px`;
          beeper.style.top = `${tileSize + tileSize * y + tileSize / 4}px`;
          beeper.style.left = `${tileSize + tileSize * x + tileSize / 4}px`;
          beeper.style.backgroundColor = "yellow";
          beeper.style.border = "2px solid black"
          beeper.style.rotate = "45deg"
          beeper.style.boxSizing = "border-box";
          body.appendChild(beeper);
        } else if (tile == "wall") {
          const wall = document.createElement("div");
          wall.style.position = "absolute";
          wall.style.width = `${tileSize + 2}px`;
          wall.style.height = `${tileSize + 2}px`;
          wall.style.top = `${tileSize + tileSize * y}px`;
          wall.style.left = `${tileSize + tileSize * x}px`;
          wall.style.backgroundColor = "gray";
          wall.style.boxSizing = "border-box";
          wall.style.border = "2px solid black";
          body.appendChild(wall);
        } else {
          const dot = document.createElement("div");
          dot.style.position = "absolute";
          dot.style.width = `4px`;
          dot.style.height = `4px`;
          dot.style.top = `${tileSize + tileSize * y + tileSize / 2 - 2}px`;
          dot.style.left = `${tileSize + tileSize * x + tileSize / 2 - 2}px`;
          dot.style.backgroundColor = "black";
          body.appendChild(dot);
        }
      }
    }

    const karel = document.createElement("div");
    karel.innerHTML = "🤖<br>"
    switch (state.direction) {
      case "east": karel.innerHTML += "➡️"; break;
      case "south": karel.innerHTML += "⬇️️"; break;
      case "west": karel.innerHTML += "⬅️️"; break;
      case "north": karel.innerHTML += "⬆️️️"; break;
    }
    karel.style.position = "absolute";
    karel.style.width = `${tileSize}px`;
    karel.style.height = `${tileSize}px`;
    karel.style.top = `${tileSize * (state.position[1] + 1)}px`;
    karel.style.left = `${tileSize * (state.position[0] + 1)}px`;
    karel.style.boxSizing = "border-box";
    karel.style.fontSize = `${tileSize / 2}px`;
    karel.style.lineHeight = "1";
    karel.style.textAlign = "center";
    // karel.style.border = "2px solid black";
    // karel.style.backgroundColor = "lightblue";
    body.appendChild(karel);

    const beeperCounter = document.createElement("div");
    beeperCounter.innerHTML = `<b>${state.levelName}</b><br>Beepers: ${state.beeperCount}`;
    beeperCounter.style.position = "absolute";
    beeperCounter.style.top = `${tileSize * (state.worldSize[1] + 2.1)}px`;
    beeperCounter.style.left = `${tileSize}px`;
    beeperCounter.style.width = `${state.worldSize[0] * tileSize}px`;
    body.appendChild(beeperCounter)
  }

  private random(min: number, max: number): number {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1)) + minCeiled;
  }
}
