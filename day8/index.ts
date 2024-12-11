import Bun from "bun";

const file = Bun.file("./input.txt");
const text = await file.text();

const map: string[][] = text.split("\n").map((line) => line.split(""));
type Coordinate = { i: number; j: number };
const nodes = new Map<string, Coordinate[]>();

const h = map.length;
const w = map[0].length;
for (let i = 0; i < h; i++) {
  for (let j = 0; j < w; j++) {
    const c = map[i][j];
    if (c === ".") {
      // empty
      continue;
    }
    if (!nodes.has(c)) {
      nodes.set(c, []);
    }
    nodes.get(c)!.push({ i, j });
  }
}

function isInside(i: number, j: number) {
  return i >= 0 && i < h && j >= 0 && j < w;
}

const antiNodes = new Set<string>();
for (const [key, value] of nodes) {
  for (let first = 0; first < value.length; first++) {
    for (let second = first + 1; second < value.length; second++) {
      const a = value[first];
      const b = value[second];
      const yDiff = a.i - b.i;
      const xDiff = a.j - b.j;
      if (yDiff > 0 && xDiff > 0) {
        const x1 = a.j + Math.abs(xDiff);
        const y1 = a.i + Math.abs(yDiff);
        if (isInside(y1, x1)) {
          antiNodes.add(`${x1},${y1}`);
        }
        const x2 = b.j - Math.abs(xDiff);
        const y2 = b.i - Math.abs(yDiff);
        if (isInside(y2, x2)) {
          antiNodes.add(`${x2},${y2}`);
        }
      } else if (yDiff < 0 && xDiff < 0) {
        const x1 = a.j - Math.abs(xDiff);
        const y1 = a.i - Math.abs(yDiff);
        if (isInside(y1, x1)) {
          antiNodes.add(`${x1},${y1}`);
        }
        const x2 = b.j + Math.abs(xDiff);
        const y2 = b.i + Math.abs(yDiff);
        if (isInside(y2, x2)) {
          antiNodes.add(`${x2},${y2}`);
        }
      } else if (yDiff > 0 && xDiff < 0) {
        const x1 = a.j - Math.abs(xDiff);
        const y1 = a.i + Math.abs(yDiff);
        if (isInside(y1, x1)) {
          antiNodes.add(`${x1},${y1}`);
        }
        const x2 = b.j + Math.abs(xDiff);
        const y2 = b.i - Math.abs(yDiff);
        if (isInside(y2, x2)) {
          antiNodes.add(`${x2},${y2}`);
        }
      } else if (yDiff < 0 && xDiff > 0) {
        const x1 = a.j + Math.abs(xDiff);
        const y1 = a.i - Math.abs(yDiff);
        if (isInside(y1, x1)) {
          antiNodes.add(`${x1},${y1}`);
        }
        const x2 = b.j - Math.abs(xDiff);
        const y2 = b.i + Math.abs(yDiff);
        if (isInside(y2, x2)) {
          antiNodes.add(`${x2},${y2}`);
        }
      } else if (yDiff === 0) {
        const y1 = a.i;
        const y2 = a.i;
        if (b.j > a.j) {
          const x1 = a.j - Math.abs(xDiff);
          const x2 = b.j + Math.abs(xDiff);
          if (isInside(y1, x1)) {
            antiNodes.add(`${x1},${y1}`);
          }
          if (isInside(y2, x2)) {
            antiNodes.add(`${x2},${y2}`);
          }
        } else {
          const x1 = a.j - 1;
          const x2 = b.j + 1;
          if (isInside(y1, x1)) {
            antiNodes.add(`${x1},${y1}`);
          }
          if (isInside(y2, x2)) {
            antiNodes.add(`${x2},${y2}`);
          }
        }
      } else if (xDiff === 0) {
        const x1 = a.j;
        const x2 = a.j;
        if (b.i > a.i) {
          const y1 = a.i - Math.abs(yDiff);
          const y2 = b.i + Math.abs(yDiff);
          if (isInside(y1, x1)) {
            antiNodes.add(`${x1},${y1}`);
          }
          if (isInside(y2, x2)) {
            antiNodes.add(`${x2},${y2}`);
          }
        }
      }
    }
  }
}
console.log(antiNodes.size);
