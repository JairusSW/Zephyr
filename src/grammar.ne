@preprocessor typescript
@{%
  import { BinaryExpression, NumberLiteralExpression, ProgramNode, ExpressionStatement } from "./ast.js";
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

NUM -> [0-9]:+ {% (d, start) => new NumberLiteralExpression(parseInt(d.join("")), start) %}
