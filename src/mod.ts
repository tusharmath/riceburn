import * as ts from 'typescript';
import {readFileAsync, writeFileAsync, globAsync} from './utils';
import {jsonHandler} from './json';
import {textHandler} from './text';
import {tsHandler, Visitor} from './typescript';
import {ModHandlers} from './interfaces';

export default function mod(patternOrPromise: string | Promise<string[]>, prevPromise?: Promise<void>) {
    const globPromise = typeof patternOrPromise == 'string' ? 
        globAsync(patternOrPromise) : 
        patternOrPromise as Promise<string[]>;

    if (!prevPromise) {
        prevPromise = Promise.resolve();
    }

    const handlers: ModHandlers<any> = {
        asJson: <T>(cb: (json: T) => T) => { 
            return mod(globPromise, jsonHandler(globPromise, cb));
        },
        asText: (cb: (text: string) => string) => {
            return mod(globPromise, textHandler(globPromise, cb));
        },
        asTypescript: (visitor: Visitor) => {
            return mod(globPromise, tsHandler(globPromise, visitor));
        }
    };

    return handlers;
}
