import fs, { PathOrFileDescriptor } from "fs";
import promptSync from "prompt-sync";
const prompt = promptSync();

/*
  AdventOfCode 2022
  Example Answer: 13 positions the tail visited at least once
*/
type Directions = "U" | "R" | "D" | "L";
type snakeCommand = {
  Directions: Directions;
  Amount: number;
};
type cords = { x: number; y: number };

export const PlanckSnake = (path: PathOrFileDescriptor) => {
  const snakePathRaw = fs.readFileSync(path, { encoding: "utf-8" }).split(/\n/);
  const snakePath = snakePathRaw.map((elm): snakeCommand => {
    return {
      Directions: elm.split(" ")[0] as Directions,
      Amount: +elm.split(" ")[1],
    };
  });

  const headTail = new Snake();
  headTail.loadCommands(snakePath);
  gameLoop(headTail);
};

class Snake {
  private commandList = [];
  private atCommand: number;
  private headPosition: cords;
  private tailPosition: cords;
  private startPosition: cords;

  constructor(defaultStart = { x: 0, y: 0 }) {
    this.startPosition = { ...defaultStart };
    this.headPosition = { ...defaultStart };
    this.tailPosition = { ...defaultStart };
    this.atCommand = 0;
  }

  loadCommands(Commands: snakeCommand[]): void {
    if (this.commandList.length !== 0) {
      console.log(
        "There Are Commands still in the list do you want to overwrite it with the new commands? 'Y' or 'N'"
      );
      const safety = prompt("> ");
      if (safety.toLowerCase() !== "y") {
        console.log("aborting import");
        return;
      }
    }
    this.commandList = Commands;
    console.log("Import complete");
    return;
  }

  step(amount: number = 1): void {
    if (this.commandList === null)
      return console.log("Please load command list before calling step");
    if (amount === 0) {
      console.log("running through the remaining command list.");
      //TODO//
    }

    for (let i = 0; i < amount; i++) {
      this.move(this.commandList[this.atCommand]);
      this.atCommand++;
    }
  }

  private move(command: snakeCommand, positions: cords = this.headPosition) {
    let axis: string;
    let amount: number;
    if (command.Directions === "D" || command.Directions === "U") {
      axis = "x";
      amount = command.Directions === "D" ? -1 : +1;
    }
    if (command.Directions === "L" || command.Directions === "R") {
      axis = "y";
      amount = command.Directions === "L" ? -1 : +1;
    }
    for (let i = 0; i < command.Amount; i++) {
      positions[axis as keyof cords] += amount;
      this.tailTrail(axis, amount);
    }
  }

  private tailTrail(axis: string, amount: number) {
    const xDif = this.headPosition.x - this.tailPosition.x;
    const yDif = this.headPosition.y - this.tailPosition.y;

    if (!this.isTouching(xDif, yDif) && (xDif === 0 || yDif === 0)) {
      this.tailPosition[axis] += amount;
      console.log("tail moving");
    } else {
      console.log("CASE PROB", xDif, yDif);
    }
  }

  private isTouching(xDif: number, yDif: number): boolean {
    return Math.hypot(xDif, yDif) > 1 ? false : true;
  }

  info() {
    console.log("we stated at positions: ", this.startPosition);
    console.log("Snakes is at positions: ", this.headPosition);
    console.log("Snake's tail is at positions: ", this.tailPosition);
    console.log(
      "Snake has executed ",
      this.atCommand,
      " this many commands of ",
      this.commandList.length
    );
  }
}

const gameLoop = (game: Snake) => {
  let endVal = false;
  console.log("Your now in the game loop type 'help' to see all options");
  while (!endVal) {
    let userResponse = prompt("> ").split(" ");
    switch (userResponse[0].toLowerCase()) {
      case "help":
        console.log(
          "'end' -> to end prompt\n'step' -> to step through\n'info' -> to display info on the game"
        );
        break;
      case "end":
        endVal = true;
        break;
      case "step":
        console.log("stepping");
        if (userResponse.length > 1 && !Number.isNaN(userResponse[1])) {
          game.step(+userResponse[1]);
        } else {
          game.step();
        }
        break;
      case "info":
        game.info();
        break;
    }
  }
};
