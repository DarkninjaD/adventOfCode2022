import fs, { PathOrFileDescriptor } from "fs";

type RuckSackFlat = Set<string>;

export const SortSack = (path: PathOrFileDescriptor) => {
  const ruckSackList: string[] = fs
    .readFileSync(path, { encoding: "utf-8" })
    .split(/\n/);

  let matchList = [];

  const ruckSackFlatList: RuckSackFlat[] = ruckSackList.map(
    (elm) => new Set(elm.split(""))
  );
  const ruckSackListCompartments = ruckSackList.map((elm) => [
    elm.slice(0, elm.length / 2),
    elm.slice(elm.length / 2),
  ]);

  NSetArray(ruckSackFlatList, 3).forEach((ruckSet) => {
    matchList.push(sortRuckSackBy3(ruckSet[0], ruckSet[1], ruckSet[2]));
  });

  console.log("Part one: ", pointUp(sortRuckSack(ruckSackListCompartments)));
  console.log("Part two: ", pointUp(matchList));
};

const sortRuckSackBy3 = (
  ruckSackA: RuckSackFlat,
  ruckSackB: RuckSackFlat,
  ruckSackC: RuckSackFlat
) => {
  let match = "";
  ruckSackA.forEach((charA) => {
    ruckSackB.forEach((charB) => {
      if (charA == charB) {
        ruckSackC.forEach((charC) => {
          if (charC == charB && charC == charA) {
            match = charA;
          }
        });
      }
    });
  });
  return match;
};

const sortRuckSack = (ruckSackList: string[][]) => {
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

// Takes a array turns it into a array of nth. ie => ([1,2,3,4], 2) => [[1,2],[3,4]]
const NSetArray = (array: Array<any>, nth: number) => {
  let newArray = [];
  let holder = [];
  array.forEach((elm) => {
    holder.push(elm);
    if (holder.length == nth) {
      newArray.push(holder);
      holder = [];
    }
  });
  return newArray;
};
