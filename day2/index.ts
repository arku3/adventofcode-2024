import Bun from "bun";

const file = Bun.file("./input.txt");
const text = await file.text();

function findViolation(numbers: number[]): number {
  const direction = numbers[0] - numbers[1] > 0 ? "desc" : "asc";
  for (let i = 0; i < numbers.length - 1; i++) {
    if (Math.abs(numbers[i] - numbers[i + 1]) > 3) {
      return i + 1;
    }
    if (direction === "asc" && numbers[i] >= numbers[i + 1]) {
      return i + 1;
    } else if (direction === "desc" && numbers[i] <= numbers[i + 1]) {
      return i + 1;
    }
  }
  return 0;
}

let safe = 0;

let unsafe = 0;
text.split("\n").forEach((line) => {
  const numbers = line.split(/[\s]+/).map((number) => parseInt(number));
  let v = findViolation(numbers);
  if (v === 0) {
    safe += 1;
    return;
  }
  for (let i = v - 2; i <= v; i++) {
    const removed = numbers.slice();
    removed.splice(i, 1);
    let v2 = findViolation(removed);
    if (v2 === 0) {
      if (i !== v - 1 && i !== v) {
        console.log({ numbers, removed: numbers[i], i, v });
      }
      safe += 1;
      return;
    }
  }
  unsafe++;
});

console.log({ safe, unsafe });
