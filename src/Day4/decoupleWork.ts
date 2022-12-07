import fs, { PathOrFileDescriptor } from "fs";

export const decoupleWork = (path: PathOrFileDescriptor) => {
  const sectionAssignmentList = fs
    .readFileSync(path, { encoding: "utf-8" })
    .split(/\n/)
    .map((elm) => elm.split(","));

  console.log(sectionAssignmentList);
};
