import { SortSack } from "./Day3/SortSack.js";
import { CaloriesCount } from "./Day1/CaloriesCount.js";
import { RPSScoreCard } from "./Day2/RPSScoreCard.js";
import { decoupleWork } from "./Day4/decoupleWork.js";
import { CargoCrane } from "./Day5/CargoCrane.js";
import { ElfSignalDecoder } from "./Day6/ElfSignalDecoder.js";
import { TreeCount } from "./Day8/TreeTopHouse.js";
import { ElfosDiskClean } from "./Day7/ElfosDiskClean.js";
import { PlanckSnake } from "./Day9/PlanckSnake.js";

const sample = 1;
const Day: number = 8;
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
    case 6:
      ElfSignalDecoder(`${dataPath}/ElfSignal.txt`);
      break;
    case 7:
      ElfosDiskClean(`${dataPath}/ElfosOutput.txt`);
    case 8:
      TreeCount(`${dataPath}/Day8/Day8_data.txt`);
      break;
    case 9:
      PlanckSnake(`$${dataPath}/Day9/realPath.txt`);
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
    case 6:
      break;
    case 7:
      ElfosDiskClean(`${dataPath}/sampleElfosOutput.txt`);
      break;
    case 8:
      TreeCount(`${dataPath}/Day8/Day8_example.txt`);
      break;
    case 9:
      PlanckSnake(`${dataPath}Day9/examplePath.txt`);
      break;
  }
}
