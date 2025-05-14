type State = {
  readonly world: World;
  readonly worldSize: Vector;
  readonly position: Vector;
  readonly direction: Direction;
  readonly beeperCount: number;
  readonly levelName: string;
};

type Direction = "north" | "east" | "south" | "west";

type Vector = Readonly<[number, number]>;

type World = Record<number, Readonly<Record<number, Readonly<WorldElement | null>> | null>>;

type WorldElement  = "none" | "wall" | "beeper";

class Karel {
  private callCount: number;

  private state: State;

  public constructor() {
    this.state = {
      worldSize: [0, 0],
      world: {},
      position: [0, 0],
      direction: "east",
      beeperCount: 0,
      levelName: "",
    }
    this.callCount = 0;
  }

  public loadLevel01(): void {
    this.state = {
      worldSize: [5, 4],
      world: {
        2: { 2: "beeper" },
        3: { 2: "wall" },
        4: { 2: "wall" }
      },
      position: [0, 2],
      direction: "east",
      beeperCount: 0,
      levelName: "Level 01",
    }
    Karel.render(this.state);
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
    Karel.render(this.state);
  }

  public loadLevel03(variant: "a" | "b" | "c"): void {
    let world: World = {};

    switch (variant) {
      case "a":
        world = Karel.bySettingWorldElementAt(world, [2, 1], "beeper");
        world = Karel.bySettingWorldElementAt(world, [3, 1], "beeper");
        break;
      case "b":
        world = Karel.bySettingWorldElementAt(world, [2, 1], "beeper");
        break;
      case "c":
        break;
    }

    this.state = {
      worldSize: [6, 3],
      world: world,
      position: [0, 1],
      direction: "east",
      beeperCount: 0,
      levelName: "Level 03",
    };

    Karel.render(this.state);
  }

  public loadLevel04(variant: "a" | "b"): void {
    let world: World = {
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
    }

    switch (variant) {
      case "a":
        world = Karel.bySettingWorldElementAt(world, [2, 0], "wall");
        world = Karel.bySettingWorldElementAt(world, [2, 2], "beeper");
        break;
      case "b":
        world = Karel.bySettingWorldElementAt(world, [2, 0], "beeper");
        world = Karel.bySettingWorldElementAt(world, [2, 2], "wall");
        break;
    }

    this.state = {
      worldSize: [5, 3],
      world: world,
      position: [0, 1],
      direction: "east",
      beeperCount: 0,
      levelName: "Level 04",
    };

    Karel.render(this.state);
  }

  public loadLevel05(variant: "a" | "b"): void {
    let beeperCount: number;

    switch (variant) {
      case "a":
        beeperCount = 4;
        break;
      case "b":
        beeperCount = 20;
        break;
    }

    let world: World = {};
    for (let i: number = 0; i < beeperCount; i += 1) {
      world = Karel.bySettingWorldElementAt(world, [2 + i, 0], "beeper");
    }

    this.state = {
      worldSize: [beeperCount + 4, 1],
      world: world,
      position: [0, 0],
      direction: "east",
      beeperCount: 0,
      levelName: "Level 05",
    };

    Karel.render(this.state);
  }

  public loadLevel06(variant: "a" | "b"): void {
    let beeperCount: number;
    let levelWidth: number;

    switch (variant) {
      case "a":
        beeperCount = 4;
        levelWidth = 8;
        break;
      case "b":
        beeperCount = 20;
        levelWidth = 24;
        break;
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

    Karel.render(this.state);
  }

  public loadLevel07(variant: "a" | "b"): void {
    let height: number;
    let width: number;

    switch (variant) {
      case "a":
        height = 5;
        width = 6;
        break;
      case "b":
        height = 20;
        width = 20;
        break;
    }

    let world: World = {};
    for(let x: number = 0; x < width; x += 1) {
      for (let y: number = 0; y < height; y += 1) {
        world = Karel.bySettingWorldElementAt(world, [x, y], "beeper");
      }
    }

    this.state = {
      worldSize: [width, height],
      world: world,
      position: [0, 0],
      direction: "east",
      beeperCount: 0,
      levelName: "Level 06",
    };

    Karel.render(this.state);
  }

  public move(): void {
    this.detectInfiniteLoop();

    let [x, y] = this.state.position;
    switch (this.state.direction) {
      case "east": x += 1; break;
      case "south": y += 1; break;
      case "west": x += -1; break;
      case "north": y += -1; break;
    }

    if (
      x < 0 ||
      y < 0 ||
      y >= this.state.worldSize[1] ||
      x >= this.state.worldSize[0]
    ) {
      throw new Error(`Unable to move outside of world.`);
    }

    const nextPosition: Vector = [x, y];

    if (Karel.getWorldElementAt(this.state.world, nextPosition) == "wall") {
      throw new Error("Unable to move into wall.")
    }

    this.state = {
      ...this.state,
      position: nextPosition,
    }
    Karel.render(this.state);
  }

  public turnLeft(): void {
    this.detectInfiniteLoop();

    let newDirection = this.state.direction;
    switch (this.state.direction) {
      case "east": newDirection = "north"; break;
      case "north": newDirection = "west"; break;
      case "west": newDirection = "south"; break;
      case "south": newDirection = "east"; break;
    }

    this.state = {
      ...this.state,
      direction: newDirection,
    }
    Karel.render(this.state);
  }

  public pickBeeper(): void {
    this.detectInfiniteLoop();

    if (Karel.getWorldElementAt(this.state.world, this.state.position) !== "beeper") {
      throw new Error("Unable to pick beeper: There is no beeper on this tile.");
    }

    this.state = {
      ...this.state,
      beeperCount: this.state.beeperCount + 1,
      world: Karel.bySettingWorldElementAt(this.state.world, this.state.position, "none")
    }

    Karel.render(this.state);
  }

  public putBeeper(): void {
    this.detectInfiniteLoop();

    if (this.state.beeperCount == 0) {
      throw new Error("Unable to put beeper: There are no beepers in the beeper bag.")
    }
    if (Karel.getWorldElementAt(this.state.world, this.state.position) !== "none") {
      throw new Error("Unable to put beeper: There is no room for a beeper on this tile.");
    }

    this.state = {
      ...this.state,
      beeperCount: this.state.beeperCount - 1,
      world: Karel.bySettingWorldElementAt(this.state.world, this.state.position, "beeper")
    }

    Karel.render(this.state);
  }

  public isWallInfront(): boolean {
    this.detectInfiniteLoop();

    if (this.state.direction == "west") {
      if (this.state.position[0] == 0) {
        return true;
      }
      if (Karel.getWorldElementAt(this.state.world, [this.state.position[0] - 1, this.state.position[1]]) == "wall") {
        return true;
      }
    }
    if (this.state.direction == "north") {
      if (this.state.position[1] == 0) {
        return true;
      }
      if (Karel.getWorldElementAt(this.state.world, [this.state.position[0], this.state.position[1] - 1]) == "wall") {
        return true;
      }
    }
    if (this.state.direction == "east") {
      if (this.state.position[0] == this.state.worldSize[0] - 1) {
        return true;
      }
      if (Karel.getWorldElementAt(this.state.world, [this.state.position[0] + 1, this.state.position[1]]) == "wall") {
        return true;
      }
    }
    if (this.state.direction == "south") {
      if (this.state.position[1] == this.state.worldSize[1] - 1) {
        return true;
      }
      if (Karel.getWorldElementAt(this.state.world, [this.state.position[0], this.state.position[1] + 1]) == "wall") {
        return true;
      }
    }

    return false;
  }

  public isOnBeeper(): boolean {
    this.detectInfiniteLoop();

    return Karel.getWorldElementAt(this.state.world, this.state.position) == "beeper";
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

  private static getWorldElementAt(world: World, position: Vector): WorldElement {
    return (world[position[0]] ?? {})[position[1]] ?? "none";
  }

  private static bySettingWorldElementAt(world: World, position: Vector, element: WorldElement): World {
    return {
      ...world,
      [position[0]]: {
        ...world[position[0]],
        [position[1]]: element,
      }
    }
  }

  private static render(state: State): void {
    const tileSize: number = 70;

    const bodies: HTMLCollection = document.getElementsByTagName("body");
    if (bodies.length == 0) {
      throw new Error("Unable to find the <body>-Element. Karel should only be used after 'DOMContentLoaded'.");
    }
    const body: Element = bodies[0];

    const worldDiv: HTMLDivElement = document.createElement("div");
    worldDiv.style.position = "absolute";
    worldDiv.style.top = `${tileSize}px`;
    worldDiv.style.left = `${tileSize}px`;
    worldDiv.style.width = `${state.worldSize[0] * tileSize - 2}px`;
    worldDiv.style.height = `${state.worldSize[1] * tileSize - 2}px`;
    worldDiv.style.border = "2px solid black";
    worldDiv.style.boxSizing = "content-box";
    body.replaceChildren(worldDiv);

    const yLetter: HTMLDivElement = document.createElement("div");
    yLetter.style.position = "absolute";
    yLetter.style.width = `${tileSize}px`;
    yLetter.style.height = `${tileSize}px`;
    yLetter.style.top = `${tileSize * (state.worldSize[1] + 1) + 10}px`;
    yLetter.style.textAlign = "left";
    yLetter.style.left = `${tileSize - 5}px`;
    yLetter.style.fontSize = `${tileSize / 3}px`;
    yLetter.innerHTML = `y`;
    body.appendChild(yLetter);

    const xLetter: HTMLDivElement = document.createElement("div");
    xLetter.style.position = "absolute";
    xLetter.style.width = `${tileSize}px`;
    xLetter.style.height = `${tileSize}px`;
    xLetter.style.top = `${tileSize - 15}px`;
    xLetter.style.left = `${tileSize * (state.worldSize[0] + 1) + 20}px`;
    xLetter.style.textAlign = "left";
    xLetter.style.fontSize = `${tileSize / 3}px`;
    xLetter.innerHTML = `x`;
    body.appendChild(xLetter);

    for (let y: number = 0; y < state.worldSize[1]; y += 1) {
      const yMarker: HTMLDivElement = document.createElement("div");
      yMarker.style.position = "absolute";
      yMarker.style.width = `${tileSize}px`;
      yMarker.style.height = `${tileSize}px`;
      yMarker.style.top = `${tileSize + tileSize * y + tileSize / 3}px`;
      yMarker.style.textAlign = "center";
      yMarker.style.left = `0px`;
      yMarker.style.fontSize = `${tileSize / 3}px`;
      yMarker.innerHTML = `${y}`;
      body.appendChild(yMarker);

      for (let x: number = 0; x < state.worldSize[0]; x += 1) {
        const tile: WorldElement = Karel.getWorldElementAt(state.world, [x, y]);

        if (y == 0) {
          const xMarker: HTMLDivElement = document.createElement("div");
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
          const beeper: HTMLDivElement = document.createElement("div");
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
          const wall: HTMLDivElement = document.createElement("div");
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
          const dot: HTMLDivElement = document.createElement("div");
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

    const karel: HTMLDivElement = document.createElement("div");
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
    body.appendChild(karel);

    const beeperCounter: HTMLDivElement = document.createElement("div");
    beeperCounter.innerHTML = `<b>${state.levelName}</b><br>Beeper-Bag: ${state.beeperCount}`;
    beeperCounter.style.position = "absolute";
    beeperCounter.style.top = `${tileSize * (state.worldSize[1] + 2.1)}px`;
    beeperCounter.style.left = `${tileSize}px`;
    beeperCounter.style.width = `${state.worldSize[0] * tileSize}px`;
    body.appendChild(beeperCounter)
  }
}
