import Bun from "bun";

const file = Bun.file("./input.txt");
const text = await file.text();

const matrix: string[][] = [];
text.split("\n").forEach((line) => {
  matrix.push(line.split(""));
});

const output: string[][] = [];
for (let i = 0; i < matrix.length; i++) {
  output.push([]);
  for (let j = 0; j < matrix[i].length; j++) {
    output[i][j] = ".";
  }
}

// console.table(matrix);
const XMAS = "XMAS";
const SAMX = "SAMX";
const h = matrix.length;
const w = matrix[0].length;
let count = 0;
for (let i = 0; i < h; i++) {
  for (let j = 0; j < w; j++) {
    const char = matrix[i][j];
    if (char === "X" || char === "S") {
      const horizontal =
        j < w - 3
          ? matrix[i][j] +
            matrix[i][j + 1] +
            matrix[i][j + 2] +
            matrix[i][j + 3]
          : "";
      const vertical =
        i < h - 3
          ? matrix[i][j] +
            matrix[i + 1][j] +
            matrix[i + 2][j] +
            matrix[i + 3][j]
          : "";
      const diagonalDown =
        j < w - 3 && i < h - 3
          ? matrix[i][j] +
            matrix[i + 1][j + 1] +
            matrix[i + 2][j + 2] +
            matrix[i + 3][j + 3]
          : "";
      const diagonalUp =
        j < w - 3 && i > 2
          ? matrix[i][j] +
            matrix[i - 1][j + 1] +
            matrix[i - 2][j + 2] +
            matrix[i - 3][j + 3]
          : "";

      if (horizontal === XMAS) {
        // console.log("horizontal", i, j, horizontal);
        output[i][j] = "X";
        output[i][j + 1] = "M";
        output[i][j + 2] = "A";
        output[i][j + 3] = "S";
        count++;
      } else if (horizontal === SAMX) {
        // console.log("horizontal", i, j, horizontal);
        output[i][j] = "S";
        output[i][j + 1] = "A";
        output[i][j + 2] = "M";
        output[i][j + 3] = "X";
        count++;
      }

      if (vertical === XMAS) {
        // console.log("vertical", i, j, vertical);
        output[i][j] = "X";
        output[i + 1][j] = "M";
        output[i + 2][j] = "A";
        output[i + 3][j] = "S";
        count++;
      } else if (vertical === SAMX) {
        // console.log("vertical", i, j, vertical);
        output[i][j] = "S";
        output[i + 1][j] = "A";
        output[i + 2][j] = "M";
        output[i + 3][j] = "X";
        count++;
      }
      if (diagonalDown === XMAS) {
        // console.log("diagonal", i, j, diagonalDown);
        output[i][j] = "X";
        output[i + 1][j + 1] = "M";
        output[i + 2][j + 2] = "A";
        output[i + 3][j + 3] = "S";
        count++;
      } else if (diagonalDown === SAMX) {
        // console.log("diagonal", i, j, diagonalDown);
        output[i][j] = "S";
        output[i + 1][j + 1] = "A";
        output[i + 2][j + 2] = "M";
        output[i + 3][j + 3] = "X";
        count++;
      }

      if (diagonalUp === XMAS) {
        // console.log("diagonal", i, j, diagonalUp);
        output[i][j] = "X";
        output[i - 1][j + 1] = "M";
        output[i - 2][j + 2] = "A";
        output[i - 3][j + 3] = "S";
        count++;
      } else if (diagonalUp === SAMX) {
        // console.log("diagonal", i, j, diagonalUp);
        output[i][j] = "S";
        output[i - 1][j + 1] = "A";
        output[i - 2][j + 2] = "M";
        output[i - 3][j + 3] = "X";
        count++;
      }
    }
  }
}

// console.table(output);
console.log(count);

const output2: string[][] = [];
for (let i = 0; i < matrix.length; i++) {
  output2.push([]);
  for (let j = 0; j < matrix[i].length; j++) {
    output2[i][j] = ".";
  }
}
count = 0;
for (let i = 1; i < h - 1; i++) {
  for (let j = 1; j < w - 1; j++) {
    const center = matrix[i][j];
    if (center === "A") {
      const leftTop = matrix[i - 1][j - 1];
      const rightBottom = matrix[i + 1][j + 1];
      const rightTop = matrix[i - 1][j + 1];
      const leftBottom = matrix[i + 1][j - 1];
      if (
        rightBottom != leftTop &&
        rightTop != leftBottom &&
        (leftTop === "S" || leftTop === "M") &&
        (rightBottom === "S" || rightBottom === "M") &&
        (rightTop === "S" || rightTop === "M") &&
        (leftBottom === "S" || leftBottom === "M")
      ) {
        output2[i][j] = matrix[i][j];
        output2[i - 1][j - 1] = matrix[i - 1][j - 1];
        output2[i + 1][j + 1] = matrix[i + 1][j + 1];
        output2[i - 1][j + 1] = matrix[i - 1][j + 1];
        output2[i + 1][j - 1] = matrix[i + 1][j - 1];
        count++;
      }
    }
  }
}
// console.table(output2);
console.log(count);
