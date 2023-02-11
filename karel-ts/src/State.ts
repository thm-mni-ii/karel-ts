import { World } from "./World";
import { Vector } from "./Vector";
import { Direction } from "./Direction";

export type State = {
  world: World;
  worldSize: Vector;
  position: Vector;
  direction: Direction;
  beeperCount: number;
};
