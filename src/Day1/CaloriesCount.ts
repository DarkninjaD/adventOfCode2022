import fs, { PathOrFileDescriptor } from "fs";

export const CaloriesCount = (path: PathOrFileDescriptor) => {
  const CaloriesCountRaw = fs
    .readFileSync(path, { encoding: "utf-8" })
    .split(/\n/);

  type Elves = {
    Name: number;
    CalorieTotal: number;
    NumberOfItems: number;
  };

  const elfTotal: Elves[] = new Array();

  let elfEval: Elves = {
    Name: 0,
    CalorieTotal: 0,
    NumberOfItems: 0,
  };

  CaloriesCountRaw.forEach((calCurrent) => {
    if (calCurrent != "") {
      elfEval.CalorieTotal = elfEval.CalorieTotal + +calCurrent;
      elfEval.NumberOfItems++;
    } else {
      elfEval.Name = elfTotal.length;
      elfTotal.push({ ...elfEval });
      elfEval = {
        Name: 0,
        CalorieTotal: 0,
        NumberOfItems: 0,
      };
    }
  });

  const firstElf = elfTotal.reduce((highestElf, currentElf) => {
    if (highestElf.CalorieTotal < currentElf.CalorieTotal) {
      return currentElf;
    } else {
      return highestElf;
    }
  });

  elfTotal.splice(firstElf.Name, 1);

  const secondedElf = elfTotal.reduce((highestElf, currentElf) => {
    if (highestElf.CalorieTotal < currentElf.CalorieTotal) {
      return currentElf;
    } else {
      return highestElf;
    }
  });

  elfTotal.splice(secondedElf.Name, 1);

  const thirdElf = elfTotal.reduce((highestElf, currentElf) => {
    if (highestElf.CalorieTotal < currentElf.CalorieTotal) {
      return currentElf;
    } else {
      return highestElf;
    }
  });

  console.log(
    "First Elf:",
    firstElf,
    "\nSecond Elf:",
    secondedElf,
    "\nThirdElf",
    thirdElf
  );
  console.log(
    firstElf.CalorieTotal + secondedElf.CalorieTotal + thirdElf.CalorieTotal
  );
};
