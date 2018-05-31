import * as ts from 'typescript';
import * as glob from 'glob';
import {jsonHandler} from './json';
import {textHandler} from './text';
import {tsHandler, Visitor, TypescriptParams} from './typescript';
import {ModHandlers} from './interfaces';


export default function mod(pattern: string) {
    const fileList = glob.sync(pattern);

    const handlers: ModHandlers<any> = {
        asJson: <T>(cb: (json: T) => T, indent?: number) => {
            jsonHandler(fileList, cb, indent);
            return mod(pattern);
        },
        asText: (cb: (text: string) => string) => {
            textHandler(fileList, cb);
            return mod(pattern);
        },
        asTypescript: (visitor: Visitor, params?: TypescriptParams) => {
            tsHandler(fileList, visitor, params);
            return mod(pattern);
        }
    };

    return handlers;
}
