import { SortSack } from "./Day3/SortSack.js";
import { CaloriesCount } from "./Day1/CaloriesCount.js";
import { RPSScoreCard } from "./Day2/RPSScoreCard.js";
import { decoupleWork } from "./Day4/decoupleWork.js";
import { CargoCrane } from "./Day5/CargoCrane.js";

const sample = 1;
const Day: number = 5;
const dataPath = "./src/data/";

if (sample) {
  switch (Day) {
    case 1:
      CaloriesCount(`${dataPath}/ElvesCount.txt`);
      break;
    case 2:
      RPSScoreCard(`${dataPath}/RPSGuide.txt`);
      break;
    case 3:
      SortSack(`${dataPath}/SackList.txt`);
      break;
    case 4:
      decoupleWork(`${dataPath}/SectionAssignmentPair.txt`);
      break;
    case 5:
      CargoCrane(`${dataPath}/Day5`);
      break;
  }
} else {
  switch (Day) {
    case 1:
      CaloriesCount(`${dataPath}/ElvesCount.txt`);
      break;
    case 2:
      RPSScoreCard(`${dataPath}/RPSGuide.txt`);
      break;
    case 3:
      SortSack(`${dataPath}/SackList.txt`);
      break;
    case 4:
      decoupleWork(`${dataPath}/sampleSectionAssignmentPair.txt`);
      break;
    case 5:
      break;
  }
}
