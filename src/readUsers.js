import fs from 'fs/promises';

export async function readUsers () {
    try {
        const data = await fs.readFile(process.cwd() + '/users.json');
        return JSON.parse(data);
    } catch(e) {
        console.log(e);
    }
}

export async function readUserById (id) {
    try {
        const data = await fs.readFile(process.cwd() + '/users.json');
        const users = JSON.parse(data);
        for (let user of users) {
            if (user._id === id) {
                return user;
            }
        }
        return null;
    } catch(e) {
        console.log(e);
    }
}