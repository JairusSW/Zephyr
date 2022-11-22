export class Node {
    start;
    constructor(start) {
        this.start = start;
    }
}
export class Expression extends Node {
}
export class LiteralExpression extends Expression {
    constructor(start) {
        super(start);
    }
}
export class NumberLiteralExpression extends LiteralExpression {
    value;
    constructor(value, start) {
        super(start);
        this.value = value;
    }
}
export class BinaryExpression extends Expression {
    left;
    op;
    right;
    constructor(left, op, right, start) {
        super(start);
        this.left = left;
        this.op = op;
        this.right = right;
    }
}
export class StatementNode extends Node {
    constructor(start) {
        super(start);
    }
}
export class ExpressionStatement extends StatementNode {
    expression;
    constructor(expression, start) {
        super(start);
        this.expression = expression;
    }
}
export class ProgramNode extends Node {
    statement;
    constructor(statement, start) {
        super(start);
        this.statement = statement;
    }
}
//# sourceMappingURL=ast.js.map