import fs, { PathOrFileDescriptor } from "fs";

export const CaloriesCount = (path: PathOrFileDescriptor) => {
  const CaloriesCountRaw = fs
    .readFileSync(path, { encoding: "utf-8" })
    .split(/\n/);

  let placeholder = 0;
  let totalArray = [];

  CaloriesCountRaw.forEach((calorie) => {
    if (calorie == "") {
      totalArray.push(placeholder);
      placeholder = 0;
    } else {
      placeholder = placeholder + +calorie;
    }
  });

  //console.log(CaloriesCountRaw);
  console.log(totalArray);
};
