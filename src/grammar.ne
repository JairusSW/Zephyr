@preprocessor typescript
@{%
import Long from "long";
import { BinaryExpression, FloatLiteralExpression, ProgramNode, ExpressionStatement } from "./ast.js";
%}

ENTRY -> OWS Statement OWS {% (d, start) => new ProgramNode(d[1], start) %}

Statement -> (ExpressionStatement) {% d => d[0][0] %}

ExpressionStatement -> ADD {% (d, start) => new ExpressionStatement(d[0], start)%}

BinaryExpression[CURRENT, OP, NEXT] -> $NEXT {% (d) => d[0][0] %}
  | $CURRENT RWS $OP RWS $NEXT {% (d, start) => {
    return new BinaryExpression(d[0][0], d[2][0], d[4][0], start!);
  } %}

ADD -> BinaryExpression[ADD, ("+" | "-"), PROD] {% d => d[0] %}
PROD -> BinaryExpression[PROD, ("*" | "/"), NUM] {% d => d[0] %}

WS -> "\r" | "\n" | " " | "\t"

OWS -> WS:*
RWS -> WS:+

NUM -> (INT | FLOAT) {% d => d[0][0] %}
# Integer
# TODO: Add signed integers
# TODO: Allow underscore markings
INT -> "-":? [1-9] [0-9] [0-9] ("_" [0-9] [0-9] [0-9]):+ {% (d, start) => {
      d[0] // "-" | undefined
      d[1] // [1-9]
      d[2] // [0-9]
      d[3] // [0-9]
      d[4] // Array<["_", [0-9], [0-9], [0-9]]>
      return new IntegerLiteralExpression(
        Long.fromString(`${d[0] || ""}${d[1]}${d[2]}${d[3]}${d[4].map(e => e.join("")).join("")}`),
        start,
      );
    } %}
    | "-":? [1-9] [0-9] ("_" [0-9] [0-9] [0-9]):+ {%
    %}
    | "-":? [1-9] ("_" [0-9] [0-9] [0-9]):+ {%
    %}
    | "-":? [1-9] [0-9]:+ {%
    %}
    | "-":? "0":? {%
    %}


FLOAT -> [1-9] [0-9]:* "." [0-9]:+ {% (d, start) => {
        let firstChar = d[0]; // [1-9]
        let rest = d[1].join("") // [0-9][]
        // d[2] // "."
        let rhsRest = d[3].join("") // [0-9][]
        return new FloatLiteralExpression(parseFloat(`${firstChar}${rest}.${rhsRest}`), start);
      }%}
      | "0." [0-9]:+ {% (d, start) => {
        let firstChar = d[0]; // "0."
        let rest = d[1].join("") // [0-9][]
        return new FloatLiteralExpression(parseFloat(`0.${rest}`), start);
      } %}
      | "NaN" {% (d, start) => new FloatLiteralExpression(NaN, start) }
      | "Infinity" {% (d, start) => new FloatLiteralExpression(Infinity, start) }