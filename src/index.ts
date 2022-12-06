import { SortSack } from "./Day3/SortSack.js";
import { CaloriesCount } from "./Day1/CaloriesCount.js";
import { RPSScoreCard } from "./Day2/RPSScoreCard.js";
import { decoupleWork } from "./Day4/decoupleWork.js";

const Day: number = 1;
const dataPath = "./src/data/";

CaloriesCount(`${dataPath}/ElvesCount.txt`);
// switch (Day) {
//   case 1:
//     CaloriesCount(`${dataPath}/ElvesCount.txt`);
//   case 2:
//     RPSScoreCard(`${dataPath}/RPSGuide.txt`);
//   case 3:
//     SortSack(`${dataPath}/SackList.txt`);
//   case 4:
//     decoupleWork(`${dataPath}/SectionAssignmentPair.txt`);
// }
