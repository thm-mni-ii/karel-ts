///<reference path="../Karel.ts" />

document.addEventListener("DOMContentLoaded", () => {
  const karel = new Karel();
  karel.loadLevel05("a");
  karel.move();
  karel.move();
  while (karel.isOnBeeper()) {
    karel.pickBeeper();
    karel.move();
  }
  karel.move();
});
