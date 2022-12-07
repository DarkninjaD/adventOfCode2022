import fs, { PathOrFileDescriptor } from "fs";

export const CargoCrane = (path: PathOrFileDescriptor) => {
  const RearrangementProcedures = fs
    .readFileSync(`${path}/RearrangementProcedure.txt`, { encoding: "utf-8" })
    .split(/\n/);
  const StartingStack = fs
    .readFileSync(`${path}/StartingStack.txt`, { encoding: "utf-8" })
    .split(/\n/);

  console.log(RearrangementProcedures);
  console.log(StartingStack);
};
