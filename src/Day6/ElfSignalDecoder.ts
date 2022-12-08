import fs, { PathOrFileDescriptor } from "fs";

export const ElfSignalDecoder = (path: PathOrFileDescriptor) => {
  const rawSignal = fs.readFileSync(path, { encoding: "utf-8" });

  const test1 = "bvwbjplbgvbhsrlpgdmjqwftvncz";
  const test2 = "nppdvjthqldpwncqszvftbrmjlhg";
  const test3 = "nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg";
  const test4 = "zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw";

  const signal = rawSignal;

  for (let pointer = 0; pointer < signal.length; pointer++) {
    const checkSet = new Set();
    checkSet.add(signal.charAt(pointer));
    checkSet.add(signal.charAt(pointer + 1));
    checkSet.add(signal.charAt(pointer + 2));
    checkSet.add(signal.charAt(pointer + 3));
    if (checkSet.size == 4) {
      console.log(checkSet);
      console.log(
        "First marker for start-of-packet after character",
        pointer + 4
      );
      pointer = signal.length;
    }
  }

  for (let pointer = 0; pointer < signal.length; pointer++) {
    const checkSet = new Set();
    checkSet.add(signal.charAt(pointer));
    checkSet.add(signal.charAt(pointer + 1));
    checkSet.add(signal.charAt(pointer + 2));
    checkSet.add(signal.charAt(pointer + 3));
    checkSet.add(signal.charAt(pointer + 4));
    checkSet.add(signal.charAt(pointer + 5));
    checkSet.add(signal.charAt(pointer + 6));
    checkSet.add(signal.charAt(pointer + 7));
    checkSet.add(signal.charAt(pointer + 8));
    checkSet.add(signal.charAt(pointer + 9));
    checkSet.add(signal.charAt(pointer + 10));
    checkSet.add(signal.charAt(pointer + 11));
    checkSet.add(signal.charAt(pointer + 12));
    checkSet.add(signal.charAt(pointer + 13));
    if (checkSet.size == 14) {
      console.log(checkSet);
      console.log(
        "First marker for start-of-message after character",
        pointer + 14
      );
      pointer = signal.length;
    }
  }
};
