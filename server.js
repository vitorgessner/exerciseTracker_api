const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const port = 3000;

let num = 0;
const readUsers = require(__dirname + '/src/readUsers.js').default;
const writeUser = require(__dirname + '/src/writeUser.js').default;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/src/index.html')
})

app.get('/api/users', async (req, res) => {
    const users = await readUsers();
    return res.send(users)
})

app.post('/api/users', async (req, res) => {
    const username = req.body.username;
    const _id = num++;

    const users = await readUsers();
    if (!users) {
        await writeUser([{_id, username}]);
        return res.json({_id, username});
    }
    users.push({_id, username});
    await writeUser(users);
    return res.json({_id, username})

})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})