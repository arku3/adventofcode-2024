import Bun from "bun";

const file = Bun.file("./input.txt");
const text = await file.text();

const input: number[] = text.split("").map(Number);

type Node = {
  fileId: number;
  size: number;
  prev: Node | null;
  next: Node | null;
};

const head: Node = {
  fileId: 0,
  size: input[0],
  prev: null,
  next: null,
};
let current: Node | null = head;

for (let i = 1; i < input.length; i++) {
  const fileId = i % 2 === 0 ? Math.floor(i / 2) : -1;
  const size = input[i];
  current.next = {
    fileId,
    size,
    prev: current,
    next: null,
  };
  current = current.next;
}
const tail = current;

// current = head;
// while (current !== null) {
//   console.log({ fileId: current.fileId, size: current.size });
//   current = current.next;
// }
// console.log("-----");

let fileNode: Node | null = tail;
while (fileNode !== null) {
  if (fileNode.fileId === -1) {
    // loop until reach a file from right
    fileNode = fileNode.prev;
    continue;
  }
  let emptySpaceNode: Node | null = head;
  while (emptySpaceNode !== null) {
    if (emptySpaceNode.fileId === fileNode.fileId) {
      // reached the file pos, failed and break out
      break;
    } else if (emptySpaceNode.fileId !== -1) {
      emptySpaceNode = emptySpaceNode.next;
      continue;
    } else if (emptySpaceNode.size < fileNode.size) {
      // not enough space, try next space node
      emptySpaceNode = emptySpaceNode.next;
      continue;
    }
    const newNode = {
      ...fileNode,
      prev: emptySpaceNode.prev,
      next: emptySpaceNode,
    };
    emptySpaceNode.prev!.next = newNode;
    emptySpaceNode.prev = newNode;
    emptySpaceNode.size -= fileNode.size;
    fileNode.fileId = -1;
    break;
  }
  fileNode = fileNode.prev;
}

const memoryLayout: number[] = [];
current = head;
while (current !== null) {
  // console.log({ fileId: current.fileId, size: current.size });
  for (let i = 0; i < current.size; i++) {
    memoryLayout.push(current.fileId);
  }
  current = current.next;
}
// console.table(memoryLayout);
// compute checksum of the memory layout
let checksum = 0;
for (let i = 0; i < memoryLayout.length; i++) {
  if (memoryLayout[i] > -1) {
    checksum += memoryLayout[i] * i;
  }
}

console.table(checksum);
