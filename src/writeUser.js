import fs from 'fs/promises';

export default async function (data) {
    try {
        await fs.writeFile(process.cwd() + '/users.json', JSON.stringify(data), {flag: 'w'});
        return {success: 'User created'};
    } catch(e) {
        console.log(e);
    }
}