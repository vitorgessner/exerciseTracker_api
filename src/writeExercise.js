import fs from 'fs/promises';

export default async function (data) {
    try {
        await fs.writeFile(process.cwd() + '/exercises.json', JSON.stringify(data), {flag: 'w'});
        return {success: 'Exercise created'};
    } catch(e) {
        console.log(e);
    }
}