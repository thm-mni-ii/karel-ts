///<reference path="../Karel.ts" />

document.addEventListener("DOMContentLoaded", () => {
  const karel = new Karel();
  karel.loadLevel03();
  karel.move();
  karel.move();
  if (karel.isOnBeeper()) {
    karel.pickBeeper();
  }
  karel.move();
  if (karel.isOnBeeper()) {
    karel.pickBeeper();
  }
  karel.move();
  karel.move();
});
