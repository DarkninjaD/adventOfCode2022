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

export const TreeCount = (path: PathOrFileDescriptor) => {
  const treeMap = fs.readFileSync(path, { encoding: "utf-8" }).split(/\n/);
  console.log("===== Tree Count For Advent of Code 2022 in TypeScript ======");
  const MapForest = new Forest(treeMap);
  // console.log("===== This is the whole map:", MapForest.Forest, " ==========");
  console.log(
    "==== Forest Info ====",
    "\nForest Width:",
    MapForest.Width,
    "\nForest Length",
    MapForest.Length,
    "\nForest Size:",
    MapForest.Forest.length
  );

  let internalTreeCount = 0;
  let externalTreeCount = (MapForest.Width - 2) * 2 + MapForest.Length * 2;

  MapForest.Forest.forEach((elm) =>
    elm.forEach((tree) => {
      if (tree.checkAllPath()) {
        // console.log("This is a tree i can see", tree);
        internalTreeCount++;
      }
    })
  );
  console.log(
    " This is the amount of internal Trees that count",
    internalTreeCount,
    "\n This is the amount of external Tree that count",
    externalTreeCount,
    "\n Total amount of Trees that can be seen is",
    internalTreeCount + externalTreeCount
  );

  console.log(
    "\nTest 1",
    "\nPath North should be false =",
    MapForest.Forest[1][1].checkPath("North"),
    "\nPath East  should be true =",
    MapForest.Forest[1][1].checkPath("East"),
    "\nPath South should be true =",
    MapForest.Forest[1][1].checkPath("South"),
    "\nPath West  should be false =",
    MapForest.Forest[1][1].checkPath("West"),
    "this Tree should be Visible ie true",
    MapForest.Forest[1][1].checkAllPath()
  );

  console.log(
    "\nTest 2",
    "\nPath North should be false =",
    MapForest.Forest[1][2].checkPath("North"),
    "\nPath East  should be false =",
    MapForest.Forest[1][2].checkPath("East"),
    "\nPath South should be true =",
    MapForest.Forest[1][2].checkPath("South"),
    "\nPath West  should be true =",
    MapForest.Forest[1][2].checkPath("West"),
    "this Tree should be Visible ie true",
    MapForest.Forest[1][2].checkAllPath()
  );

  console.log(
    "\nTest 3",
    "\nPath North should be true =",
    MapForest.Forest[1][3].checkPath("North"),
    "\nPath East  should be true =",
    MapForest.Forest[1][3].checkPath("East"),
    "\nPath South should be true =",
    MapForest.Forest[1][3].checkPath("South"),
    "\nPath West  should be true =",
    MapForest.Forest[1][3].checkPath("West"),
    "this Tree should not be Visible ie false",
    MapForest.Forest[1][3].checkAllPath()
  );

  console.log(
    "\nTest 4",
    "\nPath North should be true =",
    MapForest.Forest[2][1].checkPath("North"), // 5 -> 5 -> 0
    "\nPath East  should be false =",
    MapForest.Forest[2][1].checkPath("East"),
    "\nPath South should be true =",
    MapForest.Forest[2][1].checkPath("South"),
    "\nPath West  should be true =",
    MapForest.Forest[2][1].checkPath("West"),
    "this Tree should be Visible ie true",
    MapForest.Forest[2][1].checkAllPath()
  );

  console.log(
    "\nTest 5",
    "\nPath North should be true =",
    MapForest.Forest[2][2].checkPath("North"),
    "\nPath East  should be true =",
    MapForest.Forest[2][2].checkPath("East"), // 3 -> 3 -> 2
    "\nPath South should be true =",
    MapForest.Forest[2][2].checkPath("South"),
    "\nPath West  should be true =",
    MapForest.Forest[2][2].checkPath("West"),
    "this Tree should not be Visible ie false",
    MapForest.Forest[2][2].checkAllPath()
  );

  console.log(
    "\nTest 6",
    "\nPath North should be true =",
    MapForest.Forest[2][3].checkPath("North"),
    "\nPath East  should be false =",
    MapForest.Forest[2][3].checkPath("East"),
    "\nPath South should be true =",
    MapForest.Forest[2][3].checkPath("South"),
    "\nPath West  should be true =",
    MapForest.Forest[2][3].checkPath("West"),
    "this Tree should be Visible ie true",
    MapForest.Forest[2][3].checkAllPath()
  );
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
  NTree: Tree | null;
  STree: Tree | null;
  ETree: Tree | null;
  WTree: Tree | null;

  constructor(height: Number) {
    this.treeHeight = height;
  }

  private isTreeVisible(
    OgTree: Tree,
    headingTree: Tree | null,
    Heading: cardinalDirection
  ): boolean {
    if (headingTree != null) {
      if (headingTree.treeHeight >= OgTree.treeHeight) {
        return false;
      } else {
        return this.checkPath(Heading, OgTree, headingTree);
      }
    } else {
      return true;
    }
  }
  checkPath(
    Heading: cardinalDirection,
    OgTree: Tree = this,
    headingTree: Tree = this
  ): boolean {
    switch (Heading) {
      case "North":
        return this.isTreeVisible(OgTree, headingTree.NTree, Heading);
      case "South":
        return this.isTreeVisible(OgTree, headingTree.STree, Heading);
      case "East":
        return this.isTreeVisible(OgTree, headingTree.ETree, Heading);
      case "West":
        return this.isTreeVisible(OgTree, headingTree.WTree, Heading);
    }
  }
  // returns true if any path come back true
  checkAllPath() {
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
