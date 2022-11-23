export abstract class Node {
    constructor(public start: number | undefined) {

    }
}

export abstract class Expression extends Node {

}

export abstract class LiteralExpression extends Expression {
    constructor(start: number | undefined) {
        super(start);
    }
}

export class FloatLiteralExpression extends LiteralExpression {
    constructor(
        public value: number,
        start: number | undefined
    ) {
        super(start);
    }
}

export class BinaryExpression extends Expression {
    constructor(
        public left: Expression,
        public op: string,
        public right: Expression,
        start: number | undefined,
    ) {
        super(start);
    }
}

export abstract class StatementNode extends Node {
    constructor(start: number | undefined) {
        super(start);
    }
}

export class ExpressionStatement extends StatementNode {
    constructor(public expression: Expression, start: number | undefined) {
        super(start);
    }
}

export class ProgramNode extends Node {
    constructor(
        public statement: StatementNode,
        start: number | undefined
    ) {
        super(start);
    }
}