import * as ts from 'typescript';
import * as fs from 'fs';
import * as path from 'path';

function getSourceFile(file: string, content: string) {
    const normalizedFile = path.normalize(file).replace(/\\/g, '/');
    return ts.createSourceFile(normalizedFile, content, ts.ScriptTarget.ES5, true);
}

function createEmptySourceFile(file: string) {
    getSourceFile(file, '');
}

export interface Visitor {
    (node: ts.Node): ts.Node;
}

export async function tsHandler(matches: string[], visitor: Visitor) {
    let sourceFile: ts.SourceFile;
    let newSourceFile: ts.Node;
    let content: string;
    let newContent: string;

    const compilerOptions = {
        strict: true,
        noEmitOnError: true,
        target: ts.ScriptTarget.ES5
    };

    matches.forEach(async match => {
        content = fs.readFileSync(match).toString();

        try {
            sourceFile = getSourceFile(match, content);
        } catch {
            console.error("invalid Typescript file");
        }

        if (visitor) {
            const transformer = (context: ts.TransformationContext) => {
                function visitNode(node: ts.Node): ts.Node {
                    const newNode = visitor(node);
                    return ts.visitEachChild(newNode, visitNode, context)
                }

                return (file: ts.SourceFile) => {
                    return ts.visitEachChild(file, visitNode, context);
                };
            };
            const transformed = ts.transform(sourceFile, [transformer], compilerOptions);
            const printer = ts.createPrinter({ newLine: ts.NewLineKind.CarriageReturnLineFeed }, {
                onEmitNode: transformed.emitNodeWithNotification,
                substituteNode: transformed.substituteNode
            });
            newContent = printer.printBundle(ts.createBundle(transformed.transformed));
            transformed.dispose();

            if (newContent !== content) {
                fs.writeFileSync(match, newContent);
            }
        }
    });
}