var input = require("./input.js");

var rootFileSystemMap = [];

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
  const isRoot = fSystem === rootFileSystemMap;
  let isAvailable = false;
  if (fSystem.length > 0) {
    isAvailable = fSystem?.some((data) => data.folderName === folderName);
  }
  if (isRoot && !isAvailable) {
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

const fileSystemInstructions = input.split("\n");

let currentCursor = rootFileSystemMap;
let previousFolderName = undefined;

let insideSubComponent = false;
const checkIsKeywordAndInsideSubComponent = (string) => {
  let isKeyword = false;
  if (string === "[") {
    insideSubComponent = true;
    isKeyword = true;
  }
  if (string === "]") {
    insideSubComponent = false;
    isKeyword = true;
  }
  return { isKeyword, insideSubComponent };
};

const subFolderName = "subComponent";

fileSystemInstructions.forEach((InstructionLine) => {
  const string = InstructionLine.trim();
  const { isKeyword, insideSubComponent } =
    checkIsKeywordAndInsideSubComponent(string);

  const folderName = string;

  if (isKeyword) {
    if (insideSubComponent) {
      const subComponentFileSystem = getDefaultFileSystem(subFolderName);
      addFolder(currentCursor, previousFolderName, subComponentFileSystem);
      currentCursor = subComponentFileSystem;
    } else {
      currentCursor = rootFileSystemMap;
    }
  }

  if (!isKeyword) {
    if (insideSubComponent) {
      const component = getDefaultFileSystem(folderName);
      addFolder(currentCursor, subFolderName, component);
      addFiles(component, folderName, "index.js");
      addFiles(component, folderName, "style.css");

      console.log({ currentCursor, folderName });
    } else {
      const container = getDefaultFileSystem(folderName);
      addFolder(currentCursor, folderName, container);
      addFiles(currentCursor, folderName, "index.js");
      addFiles(currentCursor, folderName, "style.css");
    }
    previousFolderName = folderName;
  }
});

console.log("File System" + "\n\n");
console.log(JSON.stringify(rootFileSystemMap, "", 2));
console.log("\n\n");
