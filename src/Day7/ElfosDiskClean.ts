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
  const commandList = fs
    .readFileSync(path, { encoding: "utf-8" })
    .split("$")
    .map((elm) => elm.trim().split(/\n/));
  if (commandList[0][0] == "") {
    commandList.shift();
  }

  let pwd = "";

  commandList.forEach((commands) => {
    if (commands[0].startsWith("cd")) {
      const [_, path] = commands[0].split(" ");
      if (path == "..") {
        const slashIndex = pwd.lastIndexOf("/");
        if (slashIndex != 0) pwd = pwd.slice(0, slashIndex);
        else pwd = "/";
      } else {
        if (path == "/") pwd = path;
        else if (pwd == "/") pwd = `${pwd}${path}`;
        else pwd = `${pwd}/${path}`;
      }
    }
    if (commands[0].startsWith("ls")) {
      if (!commands.some((elm) => elm.startsWith("dir"))) {
        // I'm at the most outer directory here!
        commands.forEach((elm) => {
          if (!elm.startsWith("ls")) {
            const [fileSize, fileName] = elm.split(" ");
            console.log("at", pwd, fileSize, fileName);
          }
        });
      }
    }
  });
};
