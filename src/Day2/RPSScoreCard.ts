import fs, { PathOrFileDescriptor } from "fs";

export const RPSScoreCard = (path: PathOrFileDescriptor) => {
  const RPSGuide = fs
    .readFileSync(path, { encoding: "utf-8" })
    .split(/\n/)
    .map((str) => str.split(/ /));

  type OpponentCode = "A" | "B" | "C";
  type HeroCode = "X" | "Y" | "Z";

  const Opponent: Player = new Player("Heracles");
  const Hero: Player = new Player("Spartacus");

  RPSGuide.forEach((Moves: [OpponentCode, HeroCode]) => {
    switch (Moves[0]) {
      case "A":
        Opponent.setIntent = "Rock";
        break;
      case "B":
        Opponent.setIntent = "Paper";
        break;
      case "C":
        Opponent.setIntent = "Scissors";
        break;
    }
    // Here is where part 2 changes our code.
    let conditions: State;
    switch (Moves[1]) {
      case "X":
        conditions = "Lose";
        break;
      case "Y":
        conditions = "Draw";
        break;
      case "Z":
        conditions = "Win";
        break;
    }

    GameGuide(Hero, Opponent, conditions);
    Game(Hero, Opponent);
  });
  console.log(
    "GAME!",
    Hero.Score > Opponent.Score ? Hero.Name : Opponent.Name,
    "Wins!"
  );
  console.log("Final Score:", Hero.Name, ":", Hero.Score);
  console.log("Final Score:", Opponent.Name, ":", Opponent.Score);
};

function GameGuide(Hero: Player, Opponent: Player, conditions: State) {
  if (conditions == "Draw") {
    Hero.setIntent = Opponent.Shot;
  }

  if (conditions == "Lose") {
    switch (Opponent.Shot) {
      case "Rock":
        Hero.setIntent = "Scissors";
        break;
      case "Paper":
        Hero.setIntent = "Rock";
        break;
      case "Scissors":
        Hero.setIntent = "Paper";
        break;
    }
  }

  if (conditions == "Win") {
    switch (Opponent.Shot) {
      case "Paper":
        Hero.setIntent = "Scissors";
        break;
      case "Rock":
        Hero.setIntent = "Paper";
        break;
      case "Scissors":
        Hero.setIntent = "Rock";
        break;
    }
  }
}

const Game = (Player1: Player, Player2: Player) => {
  if (Player1.Shot == Player2.Shot) {
    Player1.addScore = "Draw";
    Player2.addScore = "Draw";
  }

  if (Player1.Shot == "Scissors" && Player2.Shot == "Paper") {
    Player1.addScore = "Win";
    Player2.addScore = "Lose";
  }

  if (Player1.Shot == "Rock" && Player2.Shot == "Scissors") {
    Player1.addScore = "Win";
    Player2.addScore = "Lose";
  }

  if (Player1.Shot == "Paper" && Player2.Shot == "Rock") {
    Player1.addScore = "Win";
    Player2.addScore = "Lose";
  }

  if (Player2.Shot == "Scissors" && Player1.Shot == "Paper") {
    Player2.addScore = "Win";
    Player1.addScore = "Lose";
  }

  if (Player2.Shot == "Rock" && Player1.Shot == "Scissors") {
    Player2.addScore = "Win";
    Player1.addScore = "Lose";
  }

  if (Player2.Shot == "Paper" && Player1.Shot == "Rock") {
    Player2.addScore = "Win";
    Player1.addScore = "Lose";
  }
};

type State = "Win" | "Lose" | "Draw";
type Intent = "Rock" | "Paper" | "Scissors";

class Player {
  private Throws: { Rock: number; Paper: number; Scissors: number };
  private WinLostRecord: { Win: number; Lost: number; Draw: number };
  Name: String;
  Score: number;
  private Intent: Intent;

  constructor(name) {
    this.Name = name;
    this.Intent = undefined;
    this.Score = 0;

    this.WinLostRecord = {
      Win: 0,
      Lost: 0,
      Draw: 0,
    };
    this.Throws = {
      Rock: 0,
      Paper: 0,
      Scissors: 0,
    };
  }

  set addScore(Scoring: State) {
    this.incrementRecord(Scoring);
    this.AddPoints(Scoring);
  }

  set setIntent(newIntent: Intent) {
    this.Intent = newIntent;
  }

  get Shot() {
    return this.Intent;
  }

  private AddPoints(Scoring: State) {
    this.Score += this.returnPoints(Scoring) + this.returnPoints(this.Intent);
  }

  private incrementRecord(Scoring: State) {
    this.Throws[this.Intent]++;
    this.WinLostRecord[Scoring]++;
  }

  private returnPoints(type: State | Intent) {
    let points = 0;
    switch (type) {
      case "Win":
        points = 6;
        break;
      case "Draw":
        points = 3;
        break;
      case "Lose":
        points = 0;
        break;
      case "Scissors":
        points = 3;
        break;
      case "Paper":
        points = 2;
        break;
      case "Rock":
        points = 1;
        break;
      default:
    }
    return points;
  }
}
