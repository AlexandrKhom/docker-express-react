const express = require('express');
const { User } = require('./db')
const cors = require('cors');
require('dotenv').config({ path: '../.env' })
const { connectionDB } = require('./config/mongo.config');


const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));


const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
}

app.use(cors(corsOptions))

app.get('/home', (req, res) => {
    res.send('API is working')
})

app.get('/users', async (req, res) => {
    const users = await User.find();
    res.json(users)
})

app.post('/users', async (req, res) => {
    const user = await User.create(req.body);
    res.json(user)
})

const start = async () => {
    try {
        await connectionDB()
        await app.listen(+process.env.BACKEND_PORT)
        console.log(`Server listening on ${+process.env.BACKEND_PORT} port`)
    } catch (e) {
        console.log('Something went wrong...')
        console.log(e);
    }
}

start()