import Bun from "bun";

const file = Bun.file("./input.txt");
const text = await file.text();

const map: string[][] = text.split("\n").map((row) => row.split(""));

// console.table(map);
const h = map.length;
const w = map[0].length;

const visited = new Map<string, boolean>();

function getSize(y: number, x: number) {
  const char = map[y][x];
  let perimeter = 4;
  if (y > 0 && map[y - 1][x] === char) {
    perimeter--;
  }
  if (y < h - 1 && map[y + 1][x] === char) {
    perimeter--;
  }
  if (x > 0 && map[y][x - 1] === char) {
    perimeter--;
  }
  if (x < w - 1 && map[y][x + 1] === char) {
    perimeter--;
  }
  return { area: 1, perimeter };
}
function dfs(
  y: number,
  x: number,
  char: string,
  stack: { area: number; perimeter: number }[]
) {
  if (y < 0 || y >= h || x < 0 || x >= w) return;
  if (map[y][x] !== char) return;
  if (visited.get(`${y}-${x}`)) return;

  visited.set(`${y}-${x}`, true);
  stack.push(getSize(y, x));
  dfs(y - 1, x, char, stack);
  dfs(y + 1, x, char, stack);
  dfs(y, x - 1, char, stack);
  dfs(y, x + 1, char, stack);
}

let grantTotal = 0;
for (let i = 0; i < h; i++) {
  for (let j = 0; j < w; j++) {
    if (!visited.get(`${i}-${j}`)) {
      const stack: { area: number; perimeter: number }[] = [];
      const char = map[i][j];
      dfs(i, j, char, stack);
      const total = stack.reduce(
        (acc, cur) => {
          return {
            area: acc.area + cur.area,
            perimeter: acc.perimeter + cur.perimeter,
          };
        },
        { area: 0, perimeter: 0 }
      );
      // console.log({
      //   ...total,
      //   char,
      // });
      grantTotal += total.area * total.perimeter;
    }
  }
}
console.log(grantTotal);
