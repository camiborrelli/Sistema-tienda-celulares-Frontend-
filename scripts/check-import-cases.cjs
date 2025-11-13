const fs = require("fs");
const path = require("path");

const SRC = path.resolve(__dirname, "..", "src");
const exts = [".js", ".jsx", ".ts", ".tsx", ".css", ".json"];

function readFiles(dir) {
  const res = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const it of items) {
    if (it.isDirectory()) {
      if (it.name === "node_modules" || it.name === "dist") continue;
      res.push(...readFiles(path.join(dir, it.name)));
    } else {
      res.push(path.join(dir, it.name));
    }
  }
  return res;
}

function fileExistsCaseSensitive(filePath) {
  // Walk up directories and compare entries
  const parts = path.resolve(filePath).split(path.sep).filter(Boolean);
  let cur = path.isAbsolute(filePath) ? path.sep : "";
  for (let i = 0; i < parts.length; i++) {
    const p = parts[i];
    const dir = i === 0 && cur === "" ? path.sep : path.join(cur);
    // list entries of dir parent
    const parent = dir === path.sep ? path.sep : dir;
    let entries;
    try {
      entries = fs.readdirSync(parent);
    } catch (e) {
      return false;
    }
    const found = entries.find((e) => e === p);
    if (!found) return false;
    cur = path.join(parent, found);
  }
  return true;
}

function resolveImport(baseFile, importPath) {
  if (!importPath.startsWith(".")) return null; // skip packages
  const baseDir = path.dirname(baseFile);
  let resolved = path.resolve(baseDir, importPath);
  if (fs.existsSync(resolved) && fs.statSync(resolved).isFile())
    return resolved;
  for (const ext of exts) {
    if (fs.existsSync(resolved + ext)) return resolved + ext;
  }
  // index files
  for (const ext of exts) {
    if (fs.existsSync(path.join(resolved, "index" + ext)))
      return path.join(resolved, "index" + ext);
  }
  return null;
}

const files = readFiles(SRC).filter((f) => exts.includes(path.extname(f)));
let issues = [];
const importRe =
  /import\s+(?:[\s\S]+?)\s+from\s+['\"](.+?)['\"]|require\(['\"](.+?)['\"]\)/g;

function stripComments(code) {
  return code
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/(^|\n)\s*\/\/.*(?=\n|$)/g, "\n");
}

for (const file of files) {
  const raw = fs.readFileSync(file, "utf8");
  const content = stripComments(raw);
  let match;
  while ((match = importRe.exec(content))) {
    const imp = match[1] || match[2];
    if (!imp) continue;
    if (!imp.startsWith(".")) continue; // skip packages
    const resolved = resolveImport(file, imp);
    if (!resolved) {
      issues.push({ file, imp, reason: "could not resolve" });
      continue;
    }
    const cs = fileExistsCaseSensitive(resolved);
    if (!cs) {
      issues.push({
        file,
        imp,
        resolved,
        reason: "case mismatch or path casing differs",
      });
    }
  }
}

if (issues.length === 0) {
  console.log("No case-sensitivity import issues detected.");
  process.exit(0);
}

console.log("Detected potential import issues (case-sensitive):");
for (const it of issues) {
  console.log("- File:", it.file);
  console.log("  Import:", it.imp);
  console.log("  Resolved:", it.resolved || "(not resolved)");
  console.log("  Reason:", it.reason);
}
process.exit(1);
