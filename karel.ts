// http://mormegil.wz.cz/prog/karel/prog_doc.htm

type World = WorldElement[][];

type Position = [number, number];

enum State {
  unloaded = "world_not_loaded",

  on = "world_loaded",

  off = "karel_off",
}

enum Direction {
  north,

  east,

  south,

  west
}

enum WorldElement {
  none = 0,

  wall = 2,

  beeper = 1
}

class Karel {
  private world: World = [];

  /*
   * 2D Vector (x, y)
   */
  private position: Position = [0, 0];

  private direction: Direction = Direction.east;

  private beeperCount: number = 0;

  private state: State = State.unloaded;

  loadLevel1() {
    this.assert(State.unloaded);
    this.world = [];
    this.world.push([0, 0, 0, 0, 0]);
    this.world.push([0, 0, 0, 0, 0]);
    this.world.push([0, 1, 0, 2, 2]);
    this.position = [0, 2];
    this.state = State.on;
    this.render();
    console.log("Did load level 1");
  }

  private assert(state: State) {
    if (this.state != state) {
      throw new Error(`Assertion failed. Target: ${state}. Actual: ${this.state}`);
    }
  }

  private render() {
    this.assert(State.on);
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
    worldDiv.style.width = `${(this.world[0]?.length ?? 0) * tileSize}px`;
    worldDiv.style.height = `${(this.world.length ?? 0) * tileSize}px`;
    worldDiv.style.border = "2px solid black";
    worldDiv.style.boxSizing = "content-box";
    body.replaceChildren(worldDiv);

    for (let y = 0; y < this.world.length; y += 1) {
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

      for (let x = 0; x < this.world[y].length; x += 1) {
        const tile = this.world[y][x];

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
    switch (this.direction) {
      case Direction.east: karel.innerHTML += "➡️"; break;
      case Direction.south: karel.innerHTML += "⬇️️"; break;
      case Direction.west: karel.innerHTML += "⬅️️"; break;
      case Direction.north: karel.innerHTML += "⬆️️️"; break;
    }
    karel.style.position = "absolute";
    karel.style.width = `${tileSize}px`;
    karel.style.height = `${tileSize}px`;
    karel.style.top = `${tileSize * this.position[1]}px`;
    karel.style.left = `${tileSize * this.position[0]}px`;
    karel.style.border = "2px solid black";
    karel.style.boxSizing = "border-box";
    karel.style.fontSize = `${tileSize / 2}px`;
    karel.style.lineHeight = "1";
    karel.style.textAlign = "center";
    karel.style.backgroundColor = "lightblue";
    worldDiv.appendChild(karel);
  }

  move() {
    this.assert(State.on);

    let nextPosition = this.position;
    switch (this.direction) {
      case Direction.east: nextPosition[0] += 1; break;
      case Direction.south: nextPosition[1] += 1; break;
      case Direction.west: nextPosition[0] += -1; break;
      case Direction.north: nextPosition[1] += -1; break;
    }

    if (
      nextPosition[0] < 0 ||
      nextPosition[1] < 0 ||
      nextPosition[1] >= this.world.length ||
      nextPosition[0] >= this.world[nextPosition[1]].length
    ) {
      throw new Error(`Unable to move outside of world.`);
    }

    if (this.world[nextPosition[1]][nextPosition[0]] == WorldElement.wall) {
      throw new Error("Unable to move into wall.")
    }

    this.position = nextPosition;
    this.render();
    console.log("Did move forward.");
  }

  turnLeft() {
    this.assert(State.on);
    switch (this.direction) {
      case Direction.east: this.direction = Direction.north; break;
      case Direction.north: this.direction = Direction.west; break;
      case Direction.west: this.direction = Direction.south; break;
      case Direction.south: this.direction = Direction.east; break;
    }
    this.render();
    console.log("Did turn left.");
  }
}