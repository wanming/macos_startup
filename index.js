#!/usr/bin/env node

const os = require("os");
const plist = require("plist");
const fs = require("fs");
const cp = require("child_process");

const dirs = [
  "/Library/LaunchDaemons", // Runs when the system starts and also runs when the user is not logged in
  "/Library/LaunchAgents", // Run after user log in
  `${os.homedir()}/Library/LaunchAgents`, // User-defined user startup items
  "/System/Library/LaunchDaemons", // The system's own startup items
  "/System/Library/LaunchAgents", // The system's own startup items
];

// keep plist library from printing parse error
const warn = console.warn;
const error = console.error;

console.warn = console.error = function () {};

const autoStartList = [];
const parseErrorList = [];
dirs.forEach((dir) => {
  const existed = fs.existsSync(dir);
  if (!existed) {
    return;
  }

  fs.readdirSync(dir).forEach((file) => {
    if (file.endsWith(".plist")) {
      const filePath = `${dir}/${file}`;
      if (file.startsWith("com.apple")) {
        return;
      }
      if (!file.endsWith(".plist")) {
        return;
      }
      const content = fs.readFileSync(filePath, "utf8");
      try {
        const obj = plist.parse(content);
        if (obj.KeepAlive || obj.RunAtLoad) {
          autoStartList.push(filePath);
        }
      } catch (e) {
        parseErrorList.push(filePath);
      }
    }
  });
});

console.log("AutoStart:");
autoStartList.forEach((file) => {
  console.log("    ", file);
});
console.log("");
console.log("ParseError:");
parseErrorList.forEach((file) => {
  console.log("    ", file);
});
