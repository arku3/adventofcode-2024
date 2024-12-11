import Bun from "bun";

const file = Bun.file("./test.txt");
const text = await file.text();

const sequence: number[] = text.split(" ").map(Number);

let nextSeq: number[] = sequence;
for (let i = 0; i < 25; i++) {
  nextSeq = nextSeq.flatMap((n) => {
    if (n === 0) {
      return [1];
    }
    const asString = `${n}`;
    if (asString.length % 2 === 0) {
      const left = asString.slice(0, asString.length / 2);
      const right = asString.slice(asString.length / 2);
      return [Number(left), Number(right)];
    }
    return [n * 2024];
  });
}
console.log(nextSeq.length);
