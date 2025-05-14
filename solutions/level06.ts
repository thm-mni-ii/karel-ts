document.addEventListener("DOMContentLoaded", () => {
  const karel: Karel = new Karel();
  karel.loadLevel06("a");
  karel.move();
  while (karel.getBeeperCount() > 0) {
    karel.putBeeper();
    karel.move();
  }
  while (!karel.isWallInfront()) {
    karel.move();
  }
});
