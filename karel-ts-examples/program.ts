///<reference path="../karel-ts/out-tsc/index.d.ts" />

document.addEventListener("DOMContentLoaded", () => {
  const karel = new Karel();
  karel.loadLevel1();
  karel.move();
  karel.pickBeeper();
  karel.turnLeft();
  karel.move();
  karel.putBeeper();
  karel.turnLeft();
  // karel.move();
  // karel.move();
});
