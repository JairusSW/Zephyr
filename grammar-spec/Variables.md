# Variables

Variables contain things that exist on the stack. They have a type, and they can be readonly
when the variable declaration type is a `const`.

They are defined with the following grammar.

```
VARIABLE_DECLARATION_STATEMENT -> type:("let" | "const") OWS VARIABLE_DECLARATION_LIST OWS ";"

VARIABLE_DECLARATION_LIST -> VARIABLE_DECLARATION 
                           | VARIABLE_DECLARATION OWS "," OWS VARIABLE_DECLARATION_LIST

VARIABLE_DECLARATION -> name:IDENTIFIER OWS (":" type:NAMED_TYPE OWS)? "=" OWS value:EXPRESSION
```

