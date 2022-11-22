export declare abstract class Node {
    start: number | undefined;
    constructor(start: number | undefined);
}
export declare abstract class Expression extends Node {
}
export declare abstract class LiteralExpression extends Expression {
    constructor(start: number | undefined);
}
export declare class NumberLiteralExpression extends LiteralExpression {
    value: number;
    constructor(value: number, start: number | undefined);
}
export declare class BinaryExpression extends Expression {
    left: Expression;
    op: string;
    right: Expression;
    constructor(left: Expression, op: string, right: Expression, start: number | undefined);
}
export declare abstract class StatementNode extends Node {
    constructor(start: number | undefined);
}
export declare class ExpressionStatement extends StatementNode {
    expression: Expression;
    constructor(expression: Expression, start: number | undefined);
}
export declare class ProgramNode extends Node {
    statement: StatementNode;
    constructor(statement: StatementNode, start: number | undefined);
}
//# sourceMappingURL=ast.d.ts.map