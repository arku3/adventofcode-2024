import Bun from "bun";

const file = Bun.file("./input.txt");
const text = await file.text();

const map: string[][] = text.split("\n").map((row) => row.split(""));

const h = map.length;
const w = map[0].length;

const visited = new Set<string>();

function walkMap(i: number, j: number, char: string, charMap: Set<string>) {
  if (charMap.has(`${i},${j}`)) {
    return;
  }
  charMap.add(`${i},${j}`);
  visited.add(`${i},${j}`);
  if (i > 0 && map[i - 1][j] === char) {
    walkMap(i - 1, j, char, charMap);
  }
  if (i < h - 1 && map[i + 1][j] === char) {
    walkMap(i + 1, j, char, charMap);
  }
  if (j > 0 && map[i][j - 1] === char) {
    walkMap(i, j - 1, char, charMap);
  }
  if (j < w - 1 && map[i][j + 1] === char) {
    walkMap(i, j + 1, char, charMap);
  }
}

function getNumberOfMark(i: number, j: number, charMap: Set<string>): number {
  let count = 0;

  if (charMap.has(`${i - 1},${j - 1}`)) {
    count++;
  }
  if (charMap.has(`${i},${j}`)) {
    count++;
  }
  if (charMap.has(`${i},${j - 1}`)) {
    count++;
  }
  if (charMap.has(`${i - 1},${j}`)) {
    count++;
  }
  if (count % 2 === 1) {
    return 1;
  } else if (count === 4) {
    return 0;
  } else if (charMap.has(`${i},${j}`) && charMap.has(`${i - 1},${j - 1}`)) {
    return 2;
  } else if (charMap.has(`${i},${j - 1}`) && charMap.has(`${i - 1},${j}`)) {
    return 2;
  }
  return 0;
}

let grantTotal = 0;
for (let i = 0; i < h; i++) {
  for (let j = 0; j < w; j++) {
    if (visited.has(`${i},${j}`)) {
      continue;
    }
    const char = map[i][j];
    const charMap = new Set<string>();
    walkMap(i, j, char, charMap);
    const cornerMap = new Map<string, number>();
    charMap.forEach((key) => {
      const [y, x] = key.split(",").map(Number);
      if (!cornerMap.has(`${y},${x}`)) {
        // left-top corner
        cornerMap.set(`${y},${x}`, getNumberOfMark(y, x, charMap));
      }
      if (!cornerMap.has(`${y},${x + 1}`)) {
        // right-top corner
        cornerMap.set(`${y},${x + 1}`, getNumberOfMark(y, x + 1, charMap));
      }
      if (!cornerMap.has(`${y + 1},${x}`)) {
        // left-bottom corner
        cornerMap.set(`${y + 1},${x}`, getNumberOfMark(y + 1, x, charMap));
      }
      if (!cornerMap.has(`${y + 1},${x + 1}`)) {
        // right-bottom corner
        cornerMap.set(
          `${y + 1},${x + 1}`,
          getNumberOfMark(y + 1, x + 1, charMap)
        );
      }
    });
    const edge = Array.from(cornerMap.values()).reduce(
      (acc, cur) => acc + cur,
      0
    );
    // console.log({
    //   char,
    //   size: charMap.size,
    //   edge,
    // });
    grantTotal += edge * charMap.size;
  }
}
// console.table(map);
console.log(grantTotal);
