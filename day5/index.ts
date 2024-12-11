import Bun from "bun";

const file = Bun.file("./input.txt");
const text = await file.text();

const [orderRuleText, pagesText] = text.split("\n\n", 2);

type Rule = { head: number; tail: number };

const rules: Rule[] = [];
orderRuleText.split("\n").forEach((ruleText) => {
  const [head, tail] = ruleText.split("|").map(Number);
  rules.push({ head, tail });
});

const rows = pagesText.split("\n").map((row) => row.split(",").map(Number));
let correctTotal = 0;
let incorrectTotal = 0;
for (const row of rows) {
  let valid = true;
  for (const rule of rules) {
    const headPos = row.indexOf(rule.head);
    const tailPos = row.indexOf(rule.tail);
    if (headPos === -1 || tailPos === -1 || headPos < tailPos) {
      continue;
    }
    valid = false;
    break;
  }
  if (valid) {
    // console.log(row);
    // console.log(row[(row.length - 1) / 2]);
    correctTotal += row[(row.length - 1) / 2];
  } else {
    // reorder the row
    const sorted = row.toSorted((a, b) => {
      for (const rule of rules) {
        if (a === rule.head && b === rule.tail) {
          return -1;
        } else if (a === rule.tail && b === rule.head) {
          return 1;
        }
      }
      return 0;
    });
    incorrectTotal += sorted[(sorted.length - 1) / 2];
  }
}
console.log({ correctTotal, incorrectTotal });
