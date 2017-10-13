import * as fs from 'fs';
import * as glob from 'glob';

export const globAsync = (pattern: string, options?: glob.IOptions) => {
    return new Promise<string[]>((resolve, reject) => {
        glob(pattern, options!, (err: Error, matches: string[]) => {
            if (err) {
                return reject(err);
            } else {
                return resolve(matches);
            }
        });
    });
}

export const readFileAsync = (file: string) => {
    return new Promise<string>((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if (err) {
                return reject(err);
            } else {
                return resolve(data.toString());
            }
        });
    });
}

export const writeFileAsync = (file: string, data: string) => {
    return new Promise<string>((resolve, reject) => {
        fs.writeFile(file, data, (err) => {
            if (err) {
                return reject(err);
            } else {
                return resolve();
            }
        });
    });
}
