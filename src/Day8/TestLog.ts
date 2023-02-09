export const TestLog = (MapForest) => {
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

  console.log(
    "First: ",
    MapForest.Forest[1][2].scenicScore,
    "Second:",
    MapForest.Forest[3][2].scenicScore
  );
};
