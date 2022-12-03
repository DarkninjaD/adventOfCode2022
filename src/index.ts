import { SortSack } from "./Day3/SortSack.js";
import { CaloriesCount } from "./Day1/CaloriesCount.js";
import { RPSScoreCard } from "./Day2/RPSScoreCard.js";

const Day: number = 3;
const dataPath = "./src/data/";

switch (Day) {
  case 1:
    CaloriesCount(`${dataPath}/ElvesCount.txt`);
  case 2:
    RPSScoreCard(`${dataPath}/RPSGuide.txt`);
  case 3:
    SortSack(`${dataPath}/SackList.txt`);
}
