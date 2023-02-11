///<reference path="../Karel.ts" />

document.addEventListener("DOMContentLoaded", () => {
  const karel = new Karel();
  karel.loadLevel06("extreme");
  karel.move();
  while (karel.getBeeperCount() > 0) {
    karel.putBeeper();
    karel.move();
  }
  while (!karel.isWallInfront()) {
    karel.move();
  }
});
