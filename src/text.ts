import {readFileAsync, writeFileAsync} from './utils';

export async function textHandler<T = any>(matches: Promise<string[]>, cb: (text: string) => any, spaceIndents: number = 2) {
    let json: T;
    let newJson: T;
    let outputString: string;
    let inputString: string;

    (await matches).forEach(async match => {
        inputString = await readFileAsync(match);
   
        if (cb) {
            outputString = cb(inputString);
            
            if (outputString !== inputString) {
                await writeFileAsync(match, outputString);
            }
        }
    });
}