import fs, { PathOrFileDescriptor } from "fs";

export const decoupleWork = (path: PathOrFileDescriptor) => {
  const sectionAssignmentList = fs
    .readFileSync(path, { encoding: "utf-8" })
    .split(/\n/)
    .map((elm) => elm.split(","));
  sectionAssignmentList.forEach((elm) => OverLap.Find(elm));
  console.log(OverLap.foundContains);
};

const OverLap = {
  foundContains: 0,
  foundOverLaps: 0,
  Find(sectionPair) {
    const [aPair, bPair] = sectionPair;
    const [aLow, aHigh] = aPair.split("-");
    const [bLow, bHigh] = bPair.split("-");
    const isOverLap = +bHigh - +aLow > -1 && +bLow - +aHigh < 1;
    const isContains =
      (+aHigh >= +bHigh && +aLow <= +bLow) ||
      (+bHigh >= +aHigh && +bLow <= +aLow);
    if (isOverLap) {
      if (isContains) {
        this.foundContains++;
      }
      this.foundOverLaps++;
    }
  },
};
