import { Direction } from "./Direction";
import { State } from "./State";
import { WorldElement } from "./WorldElement";
import { Tools } from "./Tools";

export class Karel {
  private state: State;

  loadLevel1() {
    this.state = {
      worldSize: [5, 3],
      world: {
        1: { 2: WorldElement.beeper },
        3: { 2: WorldElement.wall },
        4: { 2: WorldElement.wall }
      },
      position: [0, 2],
      direction: Direction.east,
      beeperCount: 0,
    }
    Tools.render(this.state);
  }

  move() {
    let nextPosition = this.state.position;
    switch (this.state.direction) {
      case Direction.east: nextPosition[0] += 1; break;
      case Direction.south: nextPosition[1] += 1; break;
      case Direction.west: nextPosition[0] += -1; break;
      case Direction.north: nextPosition[1] += -1; break;
    }

    if (
      nextPosition[0] < 0 ||
      nextPosition[1] < 0 ||
      nextPosition[1] >= this.state.worldSize[1] ||
      nextPosition[0] >= this.state.worldSize[0]
    ) {
      throw new Error(`Unable to move outside of world.`);
    }

    if (Tools.getWorldElementAt(this.state, nextPosition) == WorldElement.wall) {
      throw new Error("Unable to move into wall.")
    }

    this.state.position = nextPosition;
    Tools.render(this.state);
  }

  turnLeft() {
    switch (this.state.direction) {
      case Direction.east: this.state.direction = Direction.north; break;
      case Direction.north: this.state.direction = Direction.west; break;
      case Direction.west: this.state.direction = Direction.south; break;
      case Direction.south: this.state.direction = Direction.east; break;
    }
    Tools.render(this.state);
  }

  pickBeeper() {
    if (Tools.getWorldElementAt(this.state, this.state.position) !== WorldElement.beeper) {
      throw new Error("Unable to pick beeper: There is no beeper on this tile.");
    }

    this.state.world[this.state.position[0]][this.state.position[1]] = null;
    this.state.beeperCount += 1;

    Tools.render(this.state);
  }

  putBeeper() {
    if (this.state.beeperCount == 0) {
      throw new Error("Unable to put beeper: There are no beepers in the beeper bag.")
    }
    if (Tools.getWorldElementAt(this.state, this.state.position) !== WorldElement.none) {
      throw new Error("Unable to put beeper: There is no room for a beeper on this tile.");
    }

    this.state.world[this.state.position[0]][this.state.position[1]] = WorldElement.beeper;
    this.state.beeperCount -= 1;

    Tools.render(this.state);
  }
}
