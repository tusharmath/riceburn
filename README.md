[![Build Status](https://travis-ci.org/kenotron/riceburn.svg?branch=master)](https://travis-ci.org/kenotron/riceburn)

# riceburn
Mod that code!

This package allows you to write simple code mods. It allows you to transform JSON, Typescript and plain text files.

# Installation

```
npm i -D riceburn
```

# Usage

This library is meant to be used as a library inside a node utility. The fluent style API and can be chained. The file matching is provided by the glob utility. See the [glob documentation](https://github.com/isaacs/node-glob) for details on what can be passed into the matcher syntax.

## The API ##

```typescript
// The JSON object is passed into the callback, it expects a serializable object to be written to disk
mod('some file pattern').asJson((json) => {
    //...
});

// The text is given to a callback, return a transformed text to overwrite the original file
mod('some file pattern').asText((text) => {
    //...
});

// This mod uses the transformer API from Typescript. Provide a visitor function as a callback
mod('some file pattern').asTypescript((node) => {
    //...
});
```

## To modify text ##
```typescript
import mod from 'riceburn';

mod('config.txt').asText((text) => {
    return text.replace('hello', 'world');
});
```

## To modify JSON ##
```typescript
import mod from 'riceburn';

interface PackageJson {
    version: string;
}

mod('package.json').asJson((json: PackageJson) => { // JSON can be typed
    json.version = "1.0.0"; // Change the JSON
    return json;    // Important: be sure to return a serializable JSON
}, 2); // The API also can take in an optional number of spaces for indentation
```

## To modify Typescript ##
```typescript
import mod from 'riceburn';

mod('src/test.ts')
    .asTypescript((node: ts.Node) => {
        switch(node.kind) {
            case ts.SyntaxKind.VariableDeclaration:
                return ts.createVariableDeclaration('hi', ts.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword));
        }
        return node;
    });

```
