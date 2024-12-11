import Bun from "bun";

const file = Bun.file("./input.txt");
const text = await file.text();
const list1: number[] = [];
const list2: number[] = [];
text.split("\n").forEach((line) => {
  const [one, two] = line.split(/[\s]+/, 2);
  // console.log(one, two);
  list1.push(parseInt(one.trim()));
  list2.push(parseInt(two.trim()));
});

list1.sort();
list2.sort();
let distance = 0;
for (let i = 0; i < list1.length; i++) {
  distance += Math.abs(list1[i] - list2[i]);
}
console.log(distance);

let similarity = 0;
for (let i = 0; i < list1.length; i++) {
  let needle = list1[i];
  let count = list2.filter((haystack) => haystack === needle).length;
  similarity += count * needle;
}
console.log(similarity);
