#!/usr/bin/env node
import grammar from "./grammar.js";
import nearly from "nearley";
import fs from "fs";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const { Grammar, Parser } = nearly;
let g = Grammar.fromCompiled(grammar);
let p = new Parser(g, {});
let file = fs.readFileSync(process.argv[2], "utf8");
p.feed(file.toString());
if (p.results.length > 1) {
    console.error("Ambiguous parse tree.");
    console.log(p);
}
else {
    console.log(p.results[0]);
}
//# sourceMappingURL=index.js.map