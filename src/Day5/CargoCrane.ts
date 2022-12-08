import fs, { PathOrFileDescriptor } from "fs";

type InstructionsFormat = {
  MoveAmount: number;
  FromLocation: number;
  ToLocation: number;
};

export const CargoCrane = (path: PathOrFileDescriptor) => {
  const RearrangementProcedures = fs
    .readFileSync(`${path}/RearrangementProcedure.txt`, { encoding: "utf-8" })
    .split(/\n/);
  const StartingStack = fs
    .readFileSync(`${path}/StartingStack.txt`, { encoding: "utf-8" })
    .split(/\n/);

  const allInstructions: InstructionsFormat[] =
    RearrangementProcedures.map(ProcessProcedures);

  const baseStack = StartingStack.pop()
    .trim()
    .split(/ \s /)
    .map((elm) => +elm);

  const stack = StartingStack.map((elm) => ProcessStackText(elm));

  const cleanStack = Startup(baseStack, stack);
  console.log("before", cleanStack);

  allInstructions.forEach((instructions) => {
    for (let moves = 0; moves < instructions.MoveAmount; moves++) {
      const movingCreate = cleanStack[instructions.FromLocation - 1].shift();
      cleanStack[instructions.ToLocation - 1].unshift(movingCreate);
    }
  });

  console.log("After", cleanStack);
};

const ProcessProcedures = (textInstructions: string): InstructionsFormat => {
  const holder = [];
  textInstructions.split(" ").forEach((elm) => {
    if (!isNaN(+elm)) {
      holder.push(+elm);
    }
  });
  return {
    MoveAmount: holder[0],
    FromLocation: holder[1],
    ToLocation: holder[2],
  };
};

const ProcessStackText = (stack: string) => {
  cleanStack.stack = [];
  stack.split(" ").forEach((elm) => {
    cleanStack.clean(elm);
  });
  return cleanStack.stack;
};

const cleanStack = {
  count: 0,
  stack: [],
  clean(elm) {
    if (elm == "") {
      this.count++;
      if (this.count == 4) {
        this.count = 0;
        this.stack.push("[ ]");
      }
    } else this.stack.push(elm);
  },
};

const Startup = (baseStack: number[], stacks: any[][]) => {
  const statingStack = Array.from(Array(baseStack.length), () => []);
  stacks.forEach((stack) => {
    baseStack.forEach((count) => {
      statingStack[count - 1].push(stack[count - 1]);
    });
  });
  return statingStack.map((stack) => {
    //@ts-ignore
    const target = stack.findLastIndex((elm) => elm == "[ ]");
    if (target > -1) {
      return stack.slice(target + 1);
    }
    return stack;
  });
};
