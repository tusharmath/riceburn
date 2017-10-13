import * as ts from 'typescript';
export interface Visitor {
    (node: ts.Node): ts.Node;
}
export declare function tsHandler(matches: Promise<string[]>, visitor: Visitor, spaceIndents?: number): Promise<void>;
