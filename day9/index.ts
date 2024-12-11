import Bun from "bun";

const file = Bun.file("./input.txt");
const text = await file.text();

const input: number[] = text.split("").map(Number);

const memoryLayout = [];
for (let i = 0; i < input.length; i++) {
  if (i % 2 === 0) {
    // a file
    const fileId = Math.floor(i / 2);
    const fileSize = input[i];
    for (let j = 0; j < fileSize; j++) {
      memoryLayout.push(fileId);
    }
  } else {
    // empty space
    for (let j = 0; j < input[i]; j++) {
      memoryLayout.push(-1);
    }
  }
}
let emptySpacePost = 0;
let nonEmptySpacePost = memoryLayout.length - 1;
while (emptySpacePost < nonEmptySpacePost) {
  if (memoryLayout[emptySpacePost] !== -1) {
    emptySpacePost++;
    continue;
  } else if (memoryLayout[nonEmptySpacePost] === -1) {
    nonEmptySpacePost--;
    continue;
  }
  memoryLayout[emptySpacePost] = memoryLayout[nonEmptySpacePost];
  memoryLayout[nonEmptySpacePost] = -1;
  emptySpacePost++;
  nonEmptySpacePost--;
}
// compute checksum of the memory layout
let checksum = 0;
for (let i = 0; i < memoryLayout.length; i++) {
  if (memoryLayout[i] > -1) {
    checksum += memoryLayout[i] * i;
  }
}

console.table(checksum);
