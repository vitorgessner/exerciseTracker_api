const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const port = 3000;

let numUsers = 0;
let numExercises = 0;
const {readUsers, readUserById} = require(__dirname + '/src/readUsers.js');
const writeUser = require(__dirname + '/src/writeUser.js').default;
const readExercises = require(__dirname + '/src/readExercises.js').default;
const writeExercise = require(__dirname + '/src/writeExercise.js').default;

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
    const _id = numUsers++;

    const users = await readUsers();
    if (!users) {
        await writeUser([{_id, username}]);
        return res.json({_id, username});
    }
    users.push({_id, username});
    await writeUser(users);
    return res.json({_id, username})

})

app.get('/api/users/:_id/exercises', async (req, res) => {
    const exercises = await readExercises();
    return res.send(exercises);
});

app.post('/api/users/:_id/exercises', async (req, res) => {
    let {_id, description, duration, date} = req.body;
    _id = Number(_id);
    date = date === '' ? new Date().toDateString() : new Date(date).toDateString();
    duration = Number(duration);

    const {username} = await readUserById(_id);
    
    const exercises = await readExercises();
    if (!exercises) {
        await writeExercise([{_id, username, description, duration, date}]);
        return res.json({_id, username, description, duration, date});
    }
    exercises.push({_id, username, description, duration, date});
    await writeExercise(exercises);
    return res.json({_id, username, description, duration, date});
})

app.get('/api/users/:_id/logs', async (req, res) => {
    const from = new Date(req.query.from).getTime() || new Date('0001-01-01').getTime();
    const to = new Date(req.query.to).getTime() || new Date('9999-01-01').getTime();
    const limit = Number(req.query.limit);
    let _id = req.params._id;
    _id = Number(_id);
    const {username} = await readUserById(_id);
    const exercises = await readExercises();
    const log = [];
    let count = 0;
    for (let exercise of exercises) {
        if (count >= limit) {
                break;
            }
            const timestamp = new Date(exercise.date).getTime();
        if (exercise._id === _id && from < timestamp && to > timestamp) {
            count++
            const {description, duration, date} = exercise;
            log.push({description, duration, date});
        }
    }
    res.send({username, count, _id, log})
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})