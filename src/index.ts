import { CaloriesCount } from "./Day1/CaloriesCount.js";
import { RPSScoreCard } from "./Day2/RPSScoreCard.js";

const Day: number = 2;

switch (Day) {
  case 1:
    CaloriesCount("./src/data/ElvesCount.txt");
  case 2:
    RPSScoreCard("./src/data/RPSGuide.txt");
}
