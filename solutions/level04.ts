document.addEventListener("DOMContentLoaded", () => {
  const karel: Karel = new Karel();
  karel.loadLevel04("b");
  karel.move();
  karel.turnLeft();
  karel.move();
  karel.turnLeft();
  karel.turnLeft();
  karel.turnLeft();
  if (karel.isWallInfront()) {
    karel.turnLeft();
    karel.turnLeft();
    karel.turnLeft();
    karel.move();
    karel.move();
    karel.turnLeft();
    karel.move();
    karel.pickBeeper();
    karel.move();
    karel.turnLeft();
    karel.move();
    karel.turnLeft();
    karel.turnLeft();
    karel.turnLeft();
    karel.move();
  } else {
    karel.move();
    karel.pickBeeper();
    karel.move();
    karel.turnLeft();
    karel.turnLeft();
    karel.turnLeft();
    karel.move();
    karel.turnLeft();
    karel.move();
  }
});
