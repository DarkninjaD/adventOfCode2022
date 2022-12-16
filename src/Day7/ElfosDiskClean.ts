import fs, { PathOrFileDescriptor } from "fs";

type ElfFile = {
  size: number;
  name: string;
};
type ElfFolder = {
  name: string;
  contains: Array<ElfFolder | ElfFile>;
};

export const ElfosDiskClean = (path: PathOrFileDescriptor) => {
  const commandList = fs.readFileSync(path, { encoding: "utf-8" }).split(/\n/);
  const ElfOSroot = "";
};
