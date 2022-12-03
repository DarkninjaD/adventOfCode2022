import fs, { PathOrFileDescriptor } from "fs";

export const SortSack = (path: PathOrFileDescriptor) => {
  type RuckSack = [String, String];
  const sackList: RuckSack[] = fs
    .readFileSync(path, { encoding: "utf-8" })
    .split(/\n/)
    .map((str) => {
      return [str.slice(0, str.length / 2), str.slice(str.length / 2)];
    });
};
