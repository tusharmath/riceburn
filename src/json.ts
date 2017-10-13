import {readFileAsync, writeFileAsync} from './utils';

export async function jsonHandler<T = any>(matches: Promise<string[]>, cb: (json: any) => any, spaceIndents: number = 2) {
    let json: T;
    let newJson: T;
    let outputString: string;
    let inputString: string;

    (await matches).forEach(async match => {
        inputString = await readFileAsync(match);

        try {
            json = JSON.parse(inputString);
        } catch {
            console.error("invalid JSON");
        }
    
        if (cb) {
            newJson = cb(json);
            outputString = JSON.stringify(newJson, null, spaceIndents);
            
            if (outputString !== inputString) {
                await writeFileAsync(match, outputString);
            }
        }
    });
}