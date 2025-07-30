import fs from 'fs/promises';

export default async function () {
    try {
        const data = await fs.readFile(process.cwd() + '/users.json');
        return JSON.parse(data);
    } catch(e) {
        console.log(e);
    }
}