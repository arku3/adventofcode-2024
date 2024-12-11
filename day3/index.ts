import Bun from "bun";

const file = Bun.file("./input.txt");
const text = await file.text();

const pattern = /mul\(([0-9]+),([0-9]+)\)/;
const matches = text.matchAll(new RegExp(pattern, "g"));
console.log(
  matches
    .map(([, num1, num2]) => Number(num1) * Number(num2))
    .reduce((a, b) => a + b, 0)
);

const parts = text.split("do");
console.log(
  parts
    .map((part) => {
      if (part.startsWith("n't")) {
        return 0;
      }
      return part
        .matchAll(new RegExp(pattern, "g"))
        .map(([, num1, num2]) => Number(num1) * Number(num2))
        .reduce((a, b) => a + b, 0);
    })
    .reduce((a, b) => a + b, 0)
);
