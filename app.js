const path = require("node:path");
const { readdir } = require("fs/promises");
const { rename } = require("fs");

async function bulkRenameFiles(directory, title, startIndex = 1, whiteList) {
  const files = await readdir(directory);
  const whiteListJoin = whiteList.join(" ");
  let i = startIndex;
  if (!directory) {
    console.log("No directory specified");
    return;
  }
  files.forEach((el) => {
    const extname = path.extname(el);

    // Whitelist checker
    console.log(whiteListJoin);
    console.log();
    if (
      (whiteListJoin.length > 0 && whiteListJoin.includes(el)) ||
      whiteListJoin.includes(el.slice(0, -extname.length))
    ) {
      console.log("test");
      return;
    }

    rename(
      path.join(__dirname, directory, el),
      path.join(__dirname, directory, `${title + `(${i})` + extname}`),
      (err) => {
        if (err) throw err;
      }
    );
    i++;
  });

  const filesNew = await readdir(directory);
  console.log("Rename complete");
  console.log(filesNew);
}
bulkRenameFiles("./toRename", "test", 264, ["script"]);
