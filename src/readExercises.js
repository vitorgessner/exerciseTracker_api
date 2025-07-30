import fs from 'fs/promises';

export default async function () {
    try {
        const data = await fs.readFile(process.cwd() + '/exercises.json');
        return JSON.parse(data);
    } catch(e) {
        console.log(e);
    }
}