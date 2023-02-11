///<reference path="../Karel.ts" />

document.addEventListener("DOMContentLoaded", () => {
  const karel = new Karel();
  karel.loadLevel01();
  karel.move();
  karel.pickBeeper();
  karel.turnLeft();
  karel.move();
  karel.turnLeft();
  karel.turnLeft();
  karel.turnLeft();
  karel.move();
  karel.putBeeper();
  karel.move();
});
