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
      antiNodes.add(`${a.j},${a.i}`);
      antiNodes.add(`${b.j},${b.i}`);
      if (yDiff > 0 && xDiff > 0) {
        let x1 = a.j + Math.abs(xDiff);
        let y1 = a.i + Math.abs(yDiff);
        while (isInside(y1, x1)) {
          antiNodes.add(`${x1},${y1}`);
          x1 += Math.abs(xDiff);
          y1 += Math.abs(yDiff);
        }
        let x2 = b.j - Math.abs(xDiff);
        let y2 = b.i - Math.abs(yDiff);
        while (isInside(y2, x2)) {
          antiNodes.add(`${x2},${y2}`);
          x2 -= Math.abs(xDiff);
          y2 -= Math.abs(yDiff);
        }
      } else if (yDiff < 0 && xDiff < 0) {
        let x1 = a.j - Math.abs(xDiff);
        let y1 = a.i - Math.abs(yDiff);
        while (isInside(y1, x1)) {
          antiNodes.add(`${x1},${y1}`);
          x1 -= Math.abs(xDiff);
          y1 -= Math.abs(yDiff);
        }
        let x2 = b.j + Math.abs(xDiff);
        let y2 = b.i + Math.abs(yDiff);
        while (isInside(y2, x2)) {
          antiNodes.add(`${x2},${y2}`);
          x2 += Math.abs(xDiff);
          y2 += Math.abs(yDiff);
        }
      } else if (yDiff > 0 && xDiff < 0) {
        let x1 = a.j - Math.abs(xDiff);
        let y1 = a.i + Math.abs(yDiff);
        while (isInside(y1, x1)) {
          antiNodes.add(`${x1},${y1}`);
          x1 -= Math.abs(xDiff);
          y1 += Math.abs(yDiff);
        }
        let x2 = b.j + Math.abs(xDiff);
        let y2 = b.i - Math.abs(yDiff);
        while (isInside(y2, x2)) {
          antiNodes.add(`${x2},${y2}`);
          x2 += Math.abs(xDiff);
          y2 -= Math.abs(yDiff);
        }
      } else if (yDiff < 0 && xDiff > 0) {
        let x1 = a.j + Math.abs(xDiff);
        let y1 = a.i - Math.abs(yDiff);
        while (isInside(y1, x1)) {
          antiNodes.add(`${x1},${y1}`);
          x1 += Math.abs(xDiff);
          y1 -= Math.abs(yDiff);
        }
        let x2 = b.j - Math.abs(xDiff);
        let y2 = b.i + Math.abs(yDiff);
        while (isInside(y2, x2)) {
          antiNodes.add(`${x2},${y2}`);
          x2 -= Math.abs(xDiff);
          y2 += Math.abs(yDiff);
        }
      } else if (yDiff === 0) {
        let y1 = a.i;
        let y2 = a.i;
        if (b.j > a.j) {
          let x1 = a.j - Math.abs(xDiff);
          while (isInside(y1, x1)) {
            antiNodes.add(`${x1},${y1}`);
            x1 -= Math.abs(xDiff);
          }
          let x2 = b.j + Math.abs(xDiff);
          while (isInside(y2, x2)) {
            antiNodes.add(`${x2},${y2}`);
            x2 += Math.abs(xDiff);
          }
        } else {
          let x1 = a.j + Math.abs(xDiff);
          while (isInside(y1, x1)) {
            antiNodes.add(`${x1},${y1}`);
            x1 += Math.abs(xDiff);
          }
          let x2 = b.j - Math.abs(xDiff);
          while (isInside(y2, x2)) {
            antiNodes.add(`${x2},${y2}`);
            x2 -= Math.abs(xDiff);
          }
        }
      } else if (xDiff === 0) {
        let x1 = a.j;
        let x2 = a.j;
        if (b.i > a.i) {
          let y1 = a.i - Math.abs(yDiff);
          while (isInside(y1, x1)) {
            antiNodes.add(`${x1},${y1}`);
            y1 -= Math.abs(yDiff);
          }
          let y2 = b.i + Math.abs(yDiff);
          while (isInside(y2, x2)) {
            antiNodes.add(`${x2},${y2}`);
            y2 += Math.abs(yDiff);
          }
        } else {
          let y1 = a.i + Math.abs(yDiff);
          while (isInside(y1, x1)) {
            antiNodes.add(`${x1},${y1}`);
            y1 += Math.abs(yDiff);
          }
          let y2 = b.i - Math.abs(yDiff);
          while (isInside(y2, x2)) {
            antiNodes.add(`${x2},${y2}`);
            y2 -= Math.abs(yDiff);
          }
        }
      }
    }
  }
}
console.log(antiNodes.size);
