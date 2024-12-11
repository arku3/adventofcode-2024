import Bun from "bun";

const file = Bun.file("./input.txt");
const text = await file.text();

const GUARD = "^";
const BLOCK = "#";
const SPACE = ".";
const VISITED = "X";

type Position = { i: number; j: number };

const map: string[][] = text.split("\n").map((line) => line.split(""));
const h = map.length;
const w = map[0].length;
const guardInitPost = (function getGuardInitPost() {
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] === GUARD) {
        return { i, j };
      }
    }
  }
  return { i: -1, j: -1 };
})();

function turnRight(direction: Position) {
  return {
    i: direction.j,
    j: -direction.i,
  };
}
function canWalk(pos: Position, direction: Position, map: string[][]) {
  const y = pos.i + direction.i;
  const x = pos.j + direction.j;
  return map[y]?.[x] !== BLOCK;
}

function tryBlock(newBlockPost: Position) {
  const map: string[][] = text.split("\n").map((line) => line.split(""));
  const history = new Set<string>();
  map[newBlockPost.i][newBlockPost.j] = BLOCK;
  let guardPos: Position = { ...guardInitPost };
  let direction: Position = { i: -1, j: 0 }; // up
  while (
    guardPos.i >= 0 &&
    guardPos.j >= 0 &&
    guardPos.i < h &&
    guardPos.j < w
  ) {
    const key = `${guardPos.i},${guardPos.j},${direction.i},${direction.j}`;
    if (history.has(key)) {
      // got caught in a loop
      return true;
    }
    history.add(key);
    map[guardPos.i][guardPos.j] = VISITED;
    if (canWalk(guardPos, direction, map)) {
      guardPos = {
        i: guardPos.i + direction.i,
        j: guardPos.j + direction.j,
      };
    } else {
      direction = turnRight(direction);
    }
  }
  return false;
}

// walk 1 time first
function walk() {
  let guardPos: Position = { ...guardInitPost };
  let direction: Position = { i: -1, j: 0 }; // up
  while (
    guardPos.i >= 0 &&
    guardPos.j >= 0 &&
    guardPos.i < h &&
    guardPos.j < w
  ) {
    map[guardPos.i][guardPos.j] = VISITED;
    if (canWalk(guardPos, direction, map)) {
      guardPos = {
        i: guardPos.i + direction.i,
        j: guardPos.j + direction.j,
      };
    } else {
      direction = turnRight(direction);
    }
  }
}
walk();

let count = 0;
for (let i = 0; i < h; i++) {
  for (let j = 0; j < w; j++) {
    if (map[i][j] === VISITED) {
      const newBlockPost = { i, j };
      const success = tryBlock(newBlockPost);
      if (success) {
        count++;
      }
    }
  }
}
console.log(count);
