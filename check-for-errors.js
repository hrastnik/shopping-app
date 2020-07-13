const exec = require("child_process").execSync;
const path = require("path");

const eslintPath = path.join(__dirname, "node_modules", ".bin", "eslint");
const tscPath = path.join(__dirname, "node_modules", ".bin", "tsc");

// const targetFileList = findFilesByExtension("src", [".ts", ".tsx"]);
// const targetFileString = targetFileList.join(" ");
try {
  exec(`${eslintPath} . --max-warnings 0`, { stdio: "inherit" });
  console.log("ESLint check completed with no errors.");

  exec(tscPath, { stdio: "inherit" });
  console.log("TypeScript check completed with no errors.");
} catch (error) {
  process.exit(-1);
}
