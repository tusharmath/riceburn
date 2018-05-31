import {Visitor, TypescriptParams} from './typescript';

export interface ModHandlers<T> {
    asJson: (cb: (json: T) => T) => ModHandlers<T>;
    asText: (cb: (text: string) => string) => ModHandlers<T>;
    asTypescript: (visitor: Visitor, params?: TypescriptParams) => ModHandlers<T>;
}
