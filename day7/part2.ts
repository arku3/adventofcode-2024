import Bun from "bun";

const file = Bun.file("./input.txt");
const text = await file.text();

function dfs(
  target: number,
  numbers: number[],
  currentPos: number,
  accur: number,
  history: Array<"+" | "*" | "||">
): boolean {
  if (currentPos === numbers.length) {
    // console.table([[...numbers], [...history]]);
    return accur === target;
  }
  const currentNumber = numbers[currentPos];
  return (
    dfs(target, numbers, currentPos + 1, accur + currentNumber, [
      ...history,
      "+",
    ]) ||
    dfs(target, numbers, currentPos + 1, accur * currentNumber, [
      ...history,
      "*",
    ]) ||
    dfs(
      target,
      numbers,
      currentPos + 1,
      Number(accur.toString() + currentNumber.toString()),
      [...history, "||"]
    )
  );
}

const lines = text.split("\n");
let total = 0;
for (const line of lines) {
  const [left, right] = line.split(":", 2);
  const numbers = right.split(" ").map(Number);
  const target = Number(left);
  if (dfs(target, numbers, 1, numbers[0], [])) {
    total += target;
  }
}
console.log(total);
