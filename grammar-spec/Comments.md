# Comments

Comments are used to describe a section of code, and they have the following grammar.

## Grammar

```
COMMENT -> SINGLE_LINE_COMMENT | BLOCK_COMMENT

SINGLE_LINE_COMMENT -> "//" comment:(.*)? "\n"

BLOCK_COMMENT -> "/*" comment:(^"*/") "*/"
```

Comments are effectively ignored, but part of the parse tree as the next available statement in an array.
