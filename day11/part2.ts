import Bun from "bun";

const file = Bun.file("./input.txt");
const text = await file.text();

const sequence: number[] = text.split(" ").map(Number);

function blind(num: number) {
  if (num === 0) {
    return [1];
  }
  const asString = `${num}`;
  if (asString.length % 2 === 0) {
    const left = asString.slice(0, asString.length / 2);
    const right = asString.slice(asString.length / 2);
    return [Number(left), Number(right)];
  }
  return [num * 2024];
}

let cache = new Map<number, number>();
for (let j = 0; j < sequence.length; j++) {
  if (!cache.has(sequence[j])) {
    cache.set(sequence[j], 1);
  } else {
    cache.set(sequence[j], cache.get(sequence[j])! + 1);
  }
}

for (let i = 0; i < 75; i++) {
  const newCache = new Map<number, number>();
  Array.from(cache.keys()).forEach((key) => {
    let value = cache.get(key)!;
    blind(key).forEach((n) => {
      newCache.set(n, (newCache.get(n) || 0) + value);
    });
  });
  cache = newCache;
}

let count = 0;
cache.values().forEach((v) => {
  count += v;
});
console.log(count);
