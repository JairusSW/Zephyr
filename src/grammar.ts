// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
// Bypasses TS6133. Allow declared but unused functions.
// @ts-ignore
function id(d: any[]): any { return d[0]; }

  import { BinaryExpression, NumberLiteralExpression, ProgramNode, ExpressionStatement } from "./ast.js";

interface NearleyToken {
  value: any;
  [key: string]: any;
};

interface NearleyLexer {
  reset: (chunk: string, info: any) => void;
  next: () => NearleyToken | undefined;
  save: () => any;
  formatError: (token: never) => string;
  has: (tokenType: string) => boolean;
};

interface NearleyRule {
  name: string;
  symbols: NearleySymbol[];
  postprocess?: (d: any[], loc?: number, reject?: {}) => any;
};

type NearleySymbol = string | { literal: any } | { test: (token: any) => boolean };

interface Grammar {
  Lexer: NearleyLexer | undefined;
  ParserRules: NearleyRule[];
  ParserStart: string;
};

const grammar: Grammar = {
  Lexer: undefined,
  ParserRules: [
    {"name": "ENTRY", "symbols": ["OWS", "Statement", "OWS"], "postprocess": (d, start) => new ProgramNode(d[1], start)},
    {"name": "Statement$subexpression$1", "symbols": ["ExpressionStatement"]},
    {"name": "Statement", "symbols": ["Statement$subexpression$1"], "postprocess": d => d[0][0]},
    {"name": "ExpressionStatement", "symbols": ["ADD"], "postprocess": (d, start) => new ExpressionStatement(d[0], start)},
    {"name": "ADD$macrocall$2", "symbols": ["ADD"]},
    {"name": "ADD$macrocall$3$subexpression$1", "symbols": [{"literal":"+"}]},
    {"name": "ADD$macrocall$3$subexpression$1", "symbols": [{"literal":"-"}]},
    {"name": "ADD$macrocall$3", "symbols": ["ADD$macrocall$3$subexpression$1"]},
    {"name": "ADD$macrocall$4", "symbols": ["PROD"]},
    {"name": "ADD$macrocall$1", "symbols": ["ADD$macrocall$4"], "postprocess": (d) => d[0][0]},
    {"name": "ADD$macrocall$1", "symbols": ["ADD$macrocall$2", "RWS", "ADD$macrocall$3", "RWS", "ADD$macrocall$4"], "postprocess":  (d, start) => {
          return new BinaryExpression(d[0][0], d[2][0], d[4][0], start!);
        } },
    {"name": "ADD", "symbols": ["ADD$macrocall$1"], "postprocess": d => d[0]},
    {"name": "PROD$macrocall$2", "symbols": ["PROD"]},
    {"name": "PROD$macrocall$3$subexpression$1", "symbols": [{"literal":"*"}]},
    {"name": "PROD$macrocall$3$subexpression$1", "symbols": [{"literal":"/"}]},
    {"name": "PROD$macrocall$3", "symbols": ["PROD$macrocall$3$subexpression$1"]},
    {"name": "PROD$macrocall$4", "symbols": ["NUM"]},
    {"name": "PROD$macrocall$1", "symbols": ["PROD$macrocall$4"], "postprocess": (d) => d[0][0]},
    {"name": "PROD$macrocall$1", "symbols": ["PROD$macrocall$2", "RWS", "PROD$macrocall$3", "RWS", "PROD$macrocall$4"], "postprocess":  (d, start) => {
          return new BinaryExpression(d[0][0], d[2][0], d[4][0], start!);
        } },
    {"name": "PROD", "symbols": ["PROD$macrocall$1"], "postprocess": d => d[0]},
    {"name": "WS", "symbols": [{"literal":"\r"}]},
    {"name": "WS", "symbols": [{"literal":"\n"}]},
    {"name": "WS", "symbols": [{"literal":" "}]},
    {"name": "WS", "symbols": [{"literal":"\t"}]},
    {"name": "OWS$ebnf$1", "symbols": []},
    {"name": "OWS$ebnf$1", "symbols": ["OWS$ebnf$1", "WS"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "OWS", "symbols": ["OWS$ebnf$1"]},
    {"name": "RWS$ebnf$1", "symbols": ["WS"]},
    {"name": "RWS$ebnf$1", "symbols": ["RWS$ebnf$1", "WS"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "RWS", "symbols": ["RWS$ebnf$1"]},
    {"name": "NUM$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "NUM$ebnf$1", "symbols": ["NUM$ebnf$1", /[0-9]/], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "NUM", "symbols": ["NUM$ebnf$1"], "postprocess": (d, start) => new NumberLiteralExpression(parseInt(d.join("")), start)}
  ],
  ParserStart: "ENTRY",
};

export default grammar;
