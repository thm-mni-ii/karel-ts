///<reference path="../Karel.ts" />

document.addEventListener("DOMContentLoaded", () => {
  const karel: Karel = new Karel();
  karel.loadLevel03("a");
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
