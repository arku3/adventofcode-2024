import Bun from "bun";

const file = Bun.file("./input.txt");
const text = await file.text();

const map: number[][] = text
  .split("\n")
  .map((row) => row.split("").map(Number));

const h = map.length;
const w = map[0].length;

type Coord = { x: number; y: number };
function countTrailHeads(coord: Coord, reachable9: Set<string>, stepCount = 0) {
  if (coord.y < 0 || coord.y >= h || coord.x < 0 || coord.x >= w) return; // out of bounds
  if (map[coord.y][coord.x] !== stepCount) return; // cannot pass through
  if (stepCount === 9) {
    reachable9.add(`${coord.y},${coord.x}`);
    return; // completed a trail
  }
  countTrailHeads({ y: coord.y + 1, x: coord.x }, reachable9, stepCount + 1);
  countTrailHeads({ y: coord.y - 1, x: coord.x }, reachable9, stepCount + 1);
  countTrailHeads({ y: coord.y, x: coord.x + 1 }, reachable9, stepCount + 1);
  countTrailHeads({ y: coord.y, x: coord.x - 1 }, reachable9, stepCount + 1);
  return;
}

let total = 0;
for (let i = 0; i < h; i++) {
  for (let j = 0; j < w; j++) {
    if (map[i][j] === 0) {
      const reachable9 = new Set<string>();
      countTrailHeads({ y: i, x: j }, reachable9, 0);
      total += reachable9.size;
    }
  }
}
// console.table(map);
console.log(total);
