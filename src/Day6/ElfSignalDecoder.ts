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
      console.log("First marker after ", pointer + 4);
      pointer = signal.length;
    }
  }
};
