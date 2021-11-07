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

const fileSystemLines = ip.split("\n");

let currentCursor = fileSystemMap;
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

fileSystemLines.forEach((line, index) => {
  const string = line.trim();
  const { isKeyword, insideSubComponent } =
    checkIsKeywordAndInsideSubComponent(string);

  const folderName = string;

  if (isKeyword) {
    if (insideSubComponent) {
      const component = getDefaultFileSystem(subFolderName);
      addFolder(currentCursor, previousFolderName, component);
      currentCursor = component;
    } else {
      currentCursor = fileSystemMap;
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
console.log(JSON.stringify(fileSystemMap, "", 2));
console.log("\n\n");
