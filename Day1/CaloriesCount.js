import fs from "fs";

export const CaloriesCount = (path) => {
  const CaloriesCountRaw = fs
    .readFileSync(path, { encoding: "utf-8" })
    .split(/\n/);

  const ElvesTotal = new Object({
    Name: 0,
    CalorieTotal: 0,
    NumberOfItems: 0,
  });

  let runningTotal = 0;

  CaloriesCountRaw.forEach((calCurrent) => {
    if (calCurrent != "") {
      runningTotal = runningTotal + +calCurrent;
    } else {
      ElvesTotal.push(runningTotal);
      runningTotal = 0;
    }
  });

  if (runningTotal != 0) {
    ElvesTotal.push(runningTotal);
    ElvesTotal.sort((a, b) => a - b);
  }

  console.log(ElvesTotal);
};
