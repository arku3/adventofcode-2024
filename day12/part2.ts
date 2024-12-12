import Bun from "bun";

const file = Bun.file("./input.txt");
const text = await file.text();

const map: string[][] = text.split("\n").map((row) => row.split(""));

const h = map.length;
const w = map[0].length;

const visited = new Map<string, boolean>();

interface Edge {
  from: { y: number; x: number };
  to: { y: number; x: number };
}

function pushEdge(edge: Edge, accEdges: Array<Edge>) {
  const length = accEdges.length;
  for (let row = 0; row < length; row++) {
    // concat edges if they are connected horizontally or vertically, else add new edge
    const currentEdge = accEdges[row];
    if (
      // if they are connected horizontally
      currentEdge.from.y === currentEdge.to.y &&
      edge.from.y === edge.to.y &&
      currentEdge.from.y === edge.from.y &&
      (currentEdge.from.x === edge.to.x || currentEdge.to.x === edge.from.x)
    ) {
      currentEdge.from.x = Math.min(currentEdge.from.x, edge.from.x);
      currentEdge.to.x = Math.max(currentEdge.to.x, edge.to.x);
      // console.log("merged horizontally", currentEdge);
      return;
    }
    if (
      // if they are connected vertically
      currentEdge.from.x === currentEdge.to.x &&
      edge.from.x === edge.to.x &&
      currentEdge.from.x === edge.from.x &&
      (currentEdge.from.y === edge.to.y || currentEdge.to.y === edge.from.y)
    ) {
      currentEdge.from.y = Math.min(currentEdge.from.y, edge.from.y);
      currentEdge.to.y = Math.max(currentEdge.to.y, edge.to.y);
      // console.log("merged vertically", currentEdge);
      return;
    }
  }
  // console.log("added new edge", edge);
  accEdges.push(edge);
}

function dfs(
  y: number,
  x: number,
  char: string,
  acc: {
    area: number;
    edges: Array<Edge>;
  }
) {
  if (
    y < 0 ||
    y >= h ||
    x < 0 ||
    x >= w ||
    map[y][x] !== char ||
    visited.get(`${y}-${x}`)
  ) {
    return;
  }
  visited.set(`${y}-${x}`, true);

  acc.area += 1;
  if (y <= 0 || map[y - 1][x] !== char) {
    // top edge
    pushEdge(
      { from: { y: y - 0.5, x: x - 0.5 }, to: { y: y - 0.5, x: x + 0.5 } },
      acc.edges
    );
  }
  if (y >= h - 1 || map[y + 1][x] !== char) {
    // bottom edge
    pushEdge(
      { from: { y: y + 0.5, x: x - 0.5 }, to: { y: y + 0.5, x: x + 0.5 } },
      acc.edges
    );
  }
  if (x <= 0 || map[y][x - 1] !== char) {
    // left edge
    pushEdge(
      { from: { y: y - 0.5, x: x - 0.5 }, to: { y: y + 0.5, x: x - 0.5 } },
      acc.edges
    );
  }
  if (x >= w - 1 || map[y][x + 1] !== char) {
    // right edge
    pushEdge(
      { from: { y: y - 0.5, x: x + 0.5 }, to: { y: y + 0.5, x: x + 0.5 } },
      acc.edges
    );
  }

  dfs(y - 1, x, char, acc);
  dfs(y + 1, x, char, acc);
  dfs(y, x - 1, char, acc);
  dfs(y, x + 1, char, acc);
  return true;
}

let grantTotal = 0;
for (let i = 0; i < h; i++) {
  for (let j = 0; j < w; j++) {
    if (!visited.get(`${i}-${j}`)) {
      const char = map[i][j];
      const acc = { area: 0, edges: [] };
      dfs(i, j, char, acc);
      // console.log({
      //   area: acc.area,
      //   edges: acc.edges.length,
      //   char,
      // });
      // console.table(acc.edges);
      grantTotal += acc.area * acc.edges.length;
    }
  }
}
// console.table(map);
console.log(grantTotal);
