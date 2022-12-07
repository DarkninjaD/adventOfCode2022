import { SortSack } from "./Day3/SortSack.js";
import { CaloriesCount } from "./Day1/CaloriesCount.js";
import { RPSScoreCard } from "./Day2/RPSScoreCard.js";
import { decoupleWork } from "./Day4/decoupleWork.js";

const sample = 1;
const Day: number = 4;
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
  }
}
