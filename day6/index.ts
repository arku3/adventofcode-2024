import Bun from "bun";

const file = Bun.file("./test.txt");
const text = await file.text();

const GUARD = "^";
const BLOCK = "#";
const SPACE = ".";
const VISITED = "X";

const map: string[][] = text.split("\n").map((line) => line.split(""));

type Position = { i: number; j: number };
let guardPos: Position = (function getGuardInitPost() {
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] === GUARD) {
        return { i, j };
      }
    }
  }
  return { i: -1, j: -1 };
})();
let direction: Position = {
  i: -1,
  j: 0,
};
function turnRight(direction: Position) {
  return {
    i: direction.j,
    j: -direction.i,
  };
}
const h = map.length;
const w = map[0].length;

function canWalk(pos: Position, direction: Position) {
  const y = pos.i + direction.i;
  const x = pos.j + direction.j;
  return map[y]?.[x] !== BLOCK;
}

while (guardPos.i >= 0 && guardPos.j >= 0 && guardPos.i < h && guardPos.j < w) {
  map[guardPos.i][guardPos.j] = VISITED;
  if (canWalk(guardPos, direction)) {
    guardPos = {
      i: guardPos.i + direction.i,
      j: guardPos.j + direction.j,
    };
  } else {
    direction = turnRight(direction);
  }
}

const visited = map.flat().filter((cell) => cell === VISITED).length;

console.table(map);
console.log({ guardPos, visited });
