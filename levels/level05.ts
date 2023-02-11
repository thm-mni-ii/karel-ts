///<reference path="../Karel.ts" />

document.addEventListener("DOMContentLoaded", () => {
  const karel = new Karel();
  karel.loadLevel05();
  karel.move();
  karel.move();
  while (karel.isOnBeeper()) {
    karel.pickBeeper();
    karel.move();
  }
  karel.move();
});
