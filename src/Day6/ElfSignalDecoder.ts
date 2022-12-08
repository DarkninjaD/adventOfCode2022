import fs, { PathOrFileDescriptor } from "fs";

export const ElfSignalDecoder = (path: PathOrFileDescriptor) => {
  const signal = fs.readFileSync(path, { encoding: "utf-8" });
  FindMarker(signal, 4);
  FindMarker(signal, 14);
};

const FindMarker = (signal: string, uniqueCharCount: number) => {
  for (let pointer = 0; pointer < signal.length; pointer++) {
    const checkSet = new Set();
    for (let charPulled = 0; charPulled < uniqueCharCount; charPulled++) {
      checkSet.add(signal.charAt(pointer + charPulled));
    }
    if (checkSet.size == uniqueCharCount) {
      console.log("First marker after character", pointer + uniqueCharCount);
      pointer = signal.length;
    }
  }
};
