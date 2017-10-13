import { ModHandlers } from './interfaces';
export declare function mod(patternOrPromise: string | Promise<string[]>, prevPromise?: Promise<void>): ModHandlers<any>;
