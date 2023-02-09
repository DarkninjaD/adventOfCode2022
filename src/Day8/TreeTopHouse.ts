/*
how many trees can be seen from the grid.
0 - 9 Tree height. Total tree count ins input.

-All trees on the edge can be seen
-Trees with in the grid can be seen
  -if the trees in any the cardinal direction are small then the given trees around it.

16 Visible on the edge
5 Visible within
21 total.

[3][0][3][7][3]
[2][5][5]{1}[2]
[6][5]{3}[3][2]
[3]{3}[5]{4}[9]
[3][5][3][9][0]

Node link list => maybe?? think mine sweeper but backwards.

*/

import fs, { PathOrFileDescriptor } from "fs";
import { TestLog } from "./TestLog.js";

export const TreeCount = (path: PathOrFileDescriptor) => {
  const treeMap = fs.readFileSync(path, { encoding: "utf-8" }).split(/\n/);
  console.log("===== Tree Count For Advent of Code 2022 in TypeScript ======");
  const MapForest = new Forest(treeMap);
  console.log(
    "==== Forest Info ====",
    "\nForest Width:",
    MapForest.Width,
    "\nForest Length",
    MapForest.Length,
    "\nForest Size:",
    MapForest.Forest.length
  );

  let TreeCount = 0;
  let BestTree = new Tree(0);
  BestTree.scenicScoreTotal = 0;
  const externalTreeCount = (MapForest.Width - 2) * 2 + MapForest.Length * 2;

  MapForest.Forest.forEach((woods, row) =>
    woods.forEach((currentTree, colum) => {
      currentTree.location.row = row;
      currentTree.location.colum = colum;
      if (currentTree.checkAllPath()) {
        TreeCount++;
      }
      if (currentTree.scenicScoreTotal > BestTree.scenicScoreTotal) {
        BestTree = currentTree;
      }
    })
  );

  console.log(
    "This is the amount of internal Trees that count",
    TreeCount - externalTreeCount,
    "\nThis is the amount of external Tree that count",
    externalTreeCount,
    "\nTotal amount of Trees that can be seen is",
    TreeCount,
    "\n\nThe Best Tree in the forest is",
    BestTree.info()
  );

  if (false) TestLog(MapForest);
  // for the use of debugging. (not a great way to test but i didn't want to set up jest)
};

class Forest {
  Forest: Array<Array<Tree>> = [];
  Width: number;
  Length: number;

  constructor(data: Array<string>) {
    this.Length = data.length;
    this.Width = data[0].length;
    data.forEach((enters) => {
      this.Forest.push(this.woodsParser(enters));
    });
    if (this.Forest != null) {
      this.MarkEdges();
      this.TreeMapping();
    }
  }

  woodsParser(data: string) {
    const woods = [];
    let test = data.split("");
    test.forEach((element) => {
      woods.push(new Tree(+element));
    });
    return woods;
  }

  // Isn't it all null so is this needed?
  private MarkEdges() {
    this.Forest[0].forEach((tree) => {
      tree.NTree = null;
    });
    this.Forest[this.Forest.length - 1].forEach((tree) => {
      tree.STree = null;
    });
    this.Forest.forEach((woods) => {
      woods[0].WTree = null;
      woods[woods.length - 1].ETree = null;
    });
  }

  private TreeMapping() {
    this.Forest.forEach((woods, rowCount, Forest) => {
      if (rowCount != 0) {
        woods.forEach((tree, TreeCount) => {
          tree.NTree = Forest[rowCount - 1][TreeCount];
        });
      }

      woods.forEach((tree, treeCount, woods) => {
        if (treeCount != woods.length - 1) {
          tree.ETree = woods[treeCount + 1];
        }
        if (treeCount != 0) {
          tree.WTree = woods[treeCount - 1];
        }
      });

      if (rowCount != Forest.length - 1) {
        woods.forEach((tree, TreeCount) => {
          tree.STree = Forest[rowCount + 1][TreeCount];
        });
      }
    });
  }
}

class Tree {
  treeHeight: Number;
  scenicScore: { North: number; South: number; East: number; West: number };
  scenicScoreTotal: number;
  location: { row: number; colum: number };
  NTree: Tree | null;
  STree: Tree | null;
  ETree: Tree | null;
  WTree: Tree | null;

  constructor(height: Number) {
    this.treeHeight = height;
    this.scenicScore = { North: 0, South: 0, East: 0, West: 0 };
    this.location = { row: 0, colum: 0 };
  }

  info() {
    return `\nTree height: ${this.treeHeight}\nTree scenicScore: ${this.scenicScoreTotal}\nTree location is: row:${this.location.row}, colum:${this.location.colum}`;
  }
  genScenicScore() {
    this.checkPath("North", true);
    this.checkPath("East", true);
    this.checkPath("South", true);
    this.checkPath("West", true);
    this.scenicScoreTotal =
      this.scenicScore.North *
      this.scenicScore.West *
      this.scenicScore.East *
      this.scenicScore.South;
  }

  private isTreeVisible(
    OgTree: Tree,
    headingTree: Tree | null,
    Heading: cardinalDirection,
    count: boolean
  ): boolean {
    if (headingTree != null) {
      if (headingTree.treeHeight >= OgTree.treeHeight) {
        if (count) OgTree.scenicScore[Heading]++;
        return false;
      } else {
        if (count) OgTree.scenicScore[Heading]++;
        return this.checkPath(Heading, count, OgTree, headingTree);
      }
    } else {
      return true;
    }
  }
  checkPath(
    Heading: cardinalDirection,
    count: boolean = false,
    OgTree: Tree = this,
    headingTree: Tree = this
  ): boolean {
    switch (Heading) {
      case "North":
        return this.isTreeVisible(OgTree, headingTree.NTree, Heading, count);
      case "South":
        return this.isTreeVisible(OgTree, headingTree.STree, Heading, count);
      case "East":
        return this.isTreeVisible(OgTree, headingTree.ETree, Heading, count);
      case "West":
        return this.isTreeVisible(OgTree, headingTree.WTree, Heading, count);
    }
  }
  // returns true if any path come back true
  checkAllPath() {
    this.genScenicScore();
    if (
      this.checkPath("North")! ||
      this.checkPath("East")! ||
      this.checkPath("South")! ||
      this.checkPath("West")!
    ) {
      return true;
    } else {
      return false;
    }
  }
}

type cardinalDirection = "North" | "South" | "East" | "West";
