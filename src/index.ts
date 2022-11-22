import grammar from "./grammar.js";
import nearly from "nearley";
const { Grammar, Parser } = nearly;

let g = Grammar.fromCompiled(grammar);
let p = new Parser(g, {});

p.feed("1 * 2 + 3");
if (p.results.length > 1) {
    console.error("Ambiguous parse tree.");
    console.log(p);
} else {
    console.log(p.results[0]);
}
