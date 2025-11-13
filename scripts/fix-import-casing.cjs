const fs = require("fs");
const path = require("path");

const SRC = path.resolve(__dirname, "..", "src");
const exts = [".js", ".jsx", ".ts", ".tsx"];

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

function resolveActualPath(filePath) {
  // Walk up and pick actual casing for each segment
  const parts = path.resolve(filePath).split(path.sep).filter(Boolean);
  const root = path.parse(path.resolve(filePath)).root; // e.g., C:\
  let cur = root;
  for (let i = 0; i < parts.length; i++) {
    const segment = parts[i];
    const entries = fs.readdirSync(cur);
    const found = entries.find(
      (e) => e.toLowerCase() === segment.toLowerCase()
    );
    if (!found) return null;
    cur = path.join(cur, found);
  }
  return cur;
}

function resolveImport(baseFile, importPath) {
  if (!importPath.startsWith(".")) return null;
  const baseDir = path.dirname(baseFile);
  let resolved = path.resolve(baseDir, importPath);
  if (fs.existsSync(resolved) && fs.statSync(resolved).isFile())
    return resolved;
  for (const ext of exts) {
    if (fs.existsSync(resolved + ext)) return resolved + ext;
  }
  for (const ext of exts) {
    if (fs.existsSync(path.join(resolved, "index" + ext)))
      return path.join(resolved, "index" + ext);
  }
  return null;
}

function toPosix(p) {
  return p.split(path.sep).join("/");
}

const importRe =
  /(import\s+(?:[\s\S]+?)\s+from\s+['"](.+?)['"])|(require\(['"](.+?)['"]\))/g;

const files = readFiles(SRC).filter((f) => exts.includes(path.extname(f)));
let changedFiles = 0;
for (const file of files) {
  let content = fs.readFileSync(file, "utf8");
  let m;
  let updated = content;
  importRe.lastIndex = 0;
  while ((m = importRe.exec(content))) {
    const imp = m[2] || m[4];
    if (!imp || !imp.startsWith(".")) continue;
    const resolved = resolveImport(file, imp);
    if (!resolved) continue;
    const actual = resolveActualPath(resolved);
    if (!actual) continue;
    // compute relative path from file dir to actual, without extension
    const rel = path.relative(path.dirname(file), actual);
    let relNoExt = rel;
    for (const ext of exts) {
      if (relNoExt.endsWith(ext)) relNoExt = relNoExt.slice(0, -ext.length);
    }
    // normalize to posix-style import path
    let importPathFixed = toPosix(relNoExt);
    if (!importPathFixed.startsWith("."))
      importPathFixed = "./" + importPathFixed;
    // replace the import only if different in a case-sensitive way
    if (importPathFixed !== imp) {
      // build regex to replace the specific import string occurrence
      const esc = imp.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
      const replRegex = new RegExp(`(['\"])${esc}(['\"])`, "g");
      updated = updated.replace(replRegex, `$1${importPathFixed}$2`);
    }
  }
  if (updated !== content) {
    fs.writeFileSync(file, updated, "utf8");
    changedFiles++;
    console.log("Updated imports in", file);
  }
}
console.log("Done. Files updated:", changedFiles);
