import fs, { PathOrFileDescriptor } from "fs";

/* TODO
  [] - Take Two Arrays and find Matching Char
  X  - Return Points based off Char & Tally Points
*/

export const SortSack = (path: PathOrFileDescriptor) => {
  type RuckSack = [String, String];

  const ruckSackList: RuckSack[] = fs
    .readFileSync(path, { encoding: "utf-8" })
    .split(/\n/)
    .map((str) => {
      return [str.slice(0, str.length / 2), str.slice(str.length / 2)];
    });

  console.log(pointUp(sortRuckSack(ruckSackList)));
};

const sortRuckSack = (ruckSackList: [String, String][]) => {
  let found = [];

  ruckSackList.forEach((rucksack) => {
    let doneSearch = undefined;
    rucksack[0].split("").forEach((charLeft) => {
      if (!doneSearch) {
        doneSearch = rucksack[1]
          .split("")
          .find((charRight) => charLeft == charRight);
        if (doneSearch) {
          found.push(doneSearch);
        }
      }
    });
  });
  return found;
};

const pointUp = (charList) => {
  const baseChar = "abcdefghijklmnopqrstuvwxyz";
  const baseList = baseChar.split("").concat(baseChar.toUpperCase().split(""));
  let total = 0;

  charList.forEach((foundChar) => {
    total += baseList.findIndex((elm) => elm == foundChar) + 1;
  });
  return total;
};
