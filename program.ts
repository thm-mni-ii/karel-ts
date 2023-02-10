/// <reference path="karel.ts" />

document.addEventListener("DOMContentLoaded", () => {
  const karel = new Karel();
  karel.loadLevel1();
  karel.move();
  karel.turnLeft();
  karel.move();
  karel.turnLeft();
  karel.move();
  // karel.move();
});
