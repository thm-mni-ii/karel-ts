///<reference path="../Karel.ts" />

document.addEventListener("DOMContentLoaded", () => {
  const karel = new Karel();
  karel.loadLevel07();

  while(true) {
    while (!karel.isWallInfront()) {
      karel.pickBeeper();
      karel.move();
    }
    karel.pickBeeper();

    karel.turnLeft();
    karel.turnLeft();
    karel.turnLeft();

    if (karel.isWallInfront()) {
      break;
    }

    karel.move();
    karel.turnLeft();
    karel.turnLeft();
    karel.turnLeft();

    while (!karel.isWallInfront()) {
      karel.pickBeeper();
      karel.move();
    }
    karel.pickBeeper();

    karel.turnLeft();

    if (karel.isWallInfront()) {
      break;
    }
    karel.move();
    karel.turnLeft();
  }
});
