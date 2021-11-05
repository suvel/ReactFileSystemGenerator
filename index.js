console.log("___ File System Generator___" + "\n\n");

var ip = require("./input.js");

console.log("input to be processed" + "\n\n" + ip);

var fileSystemMap = [];

const getDefaultFileSystem = (folderName) => {
  return {
    files: [],
    subFolders: [],
    folderName: folderName,
  };
};

const getComponentObject = (fSystem, folderName) => {
  if (fSystem.folderName === folderName) return fSystem;
  else {
    return fSystem.find((attribute) => {
      return attribute.folderName === folderName;
    });
  }
};

const addFolder = (fSystem, folderName, newFolder) => {
  const isRoot = fSystem?.length === 0;
  if (isRoot) {
    // when the file system is empty
    fSystem.push(newFolder);
  } else {
    const folderToUpdate = getComponentObject(fSystem, folderName);
    folderToUpdate.subFolders.push(newFolder);
  }
};

const addFiles = (fSystem, folderName, fileName) => {
  const folderToUpdate = getComponentObject(fSystem, folderName);
  folderToUpdate.files.push(fileName);
};

const MainContainer = getDefaultFileSystem("MainContainer");
addFolder(fileSystemMap, "MainContainer", MainContainer);
addFiles(fileSystemMap, "MainContainer", "index.js");
addFiles(fileSystemMap, "MainContainer", "style.css");
const subComponent = getDefaultFileSystem("subComponent");
addFolder(fileSystemMap, "MainContainer", subComponent);
const Text = getDefaultFileSystem("Text");
addFolder(subComponent, "subComponent", Text);
addFiles(Text, "Text", "index.js");
addFiles(Text, "Text", "style.css");
const Button = getDefaultFileSystem("Button");
addFolder(subComponent, "subComponent", Button);
addFiles(Button, "Button", "index.js");
addFiles(Button, "Button", "style.css");

console.log("File System" + "\n\n");
console.log(JSON.stringify(fileSystemMap, "", 2));
console.log("\n\n");
