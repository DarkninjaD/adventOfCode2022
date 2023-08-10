import fs, { PathOrFileDescriptor } from "fs";
import promptSync from "prompt-sync";
import chalk from "chalk";
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
  private screenSize: cords = { x: 8, y: 8 };

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

  async step(amount: number = 1): Promise<void> {
    if (this.commandList === null)
      return console.log("Please load command list before calling step");
    if (this.atCommand === this.commandList.length)
      return console.log("we are at the end of the list");
    if (amount === 0) {
      console.log("running through the remaining command list.");
      //TODO//
    }

    for (let i = 0; i < amount; i++) {
      await this.move(this.commandList[this.atCommand]).then(() => {});
      this.atCommand++;
    }
  }

  private async move(
    command: snakeCommand,
    positions: cords = this.headPosition
  ) {
    let axis: string;
    let amount: number;

    if (command.Directions === "D" || command.Directions === "U") {
      axis = "y";
      amount = command.Directions === "D" ? -1 : +1;
    }
    if (command.Directions === "L" || command.Directions === "R") {
      axis = "x";
      amount = command.Directions === "L" ? -1 : +1;
    }

    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    for (let i = 0; i < command.Amount; i++) {
      positions[axis as keyof cords] += amount;
      await sleep(1000).then(() => {
        console.clear();
        console.log(this.show());
        console.log(
          "Tail is Touching? " +
            this.isTouching(
              this.headPosition.x - this.tailPosition.x,
              this.headPosition.y - this.tailPosition.y
            )
        );
      });
      this.tailTrail(axis, amount);
      // console.clear();
      await sleep(1000).then(() => {
        console.clear();
        console.log(this.show());
        console.log(
          "Tail is Touching? " +
            this.isTouching(
              this.headPosition.x - this.tailPosition.x,
              this.headPosition.y - this.tailPosition.y
            )
        );
      });
    }
  }

  private tailTrail(axis: string, amount: number) {
    const xDif = this.headPosition.x - this.tailPosition.x;
    const yDif = this.headPosition.y - this.tailPosition.y;

    if (!this.isTouching(xDif, yDif)) {
      this.tailPosition[axis] += amount;
      // TODO -> if it's not touching check which way is the right way to go.
      // [ ] -> another functions to test if the isTouching is a 1 or 1.4
    }
  }

  private isTouching(xDif: number, yDif: number): boolean {
    return Math.hypot(xDif, yDif) > 1.5 ? false : true;
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
  show(): string {
    const head: cords = { x: 0, y: this.screenSize.y - 1 };
    let screen = [];
    for (let i = 0; i < this.screenSize.x * this.screenSize.y; i++) {
      head.x = i % this.screenSize.y;
      if (i % this.screenSize.y === 0 && i != 0) {
        head.y -= 1;
      }
      screen[i] = ".";
      if (this.cordMatch(head, this.startPosition)) {
        screen[i] = "s";
      }
      if (this.cordMatch(head, this.tailPosition)) {
        screen[i] = "T";
      }
      if (this.cordMatch(head, this.headPosition)) {
        screen[i] = "H";
      }
      if (i % this.screenSize.y === 0 && i != 0) {
        screen[i] = "\n" + screen[i];
      }
    }
    return screen.join("");
  }

  private cordMatch(first: cords, second: cords): Boolean {
    if (first.x === second.x && first.y === second.y) return true;
    return false;
  }
}

const gameLoop = async (game: Snake) => {
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
        // console.log("stepping");
        if (userResponse.length > 1 && !Number.isNaN(userResponse[1])) {
          game.step(+userResponse[1]);
          // console.log(game.show());
        } else {
          await game.step().then(() => {});
          // console.log(game.show());
        }
        break;
      case "info":
        game.info();
        break;
      case "show":
        console.log(game.show());
        break;
    }
  }
};
