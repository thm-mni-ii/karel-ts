import { WorldElement } from "./WorldElement";

export type World = Record<number, Record<number, WorldElement | null> | null>;
