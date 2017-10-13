/// <reference types="glob" />
import * as glob from 'glob';
export declare const globAsync: (pattern: string, options?: glob.IOptions | undefined) => Promise<string[]>;
export declare const readFileAsync: (file: string) => Promise<string>;
export declare const writeFileAsync: (file: string, data: string) => Promise<string>;
