const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(bodyParser.json());

const USERS_FILE = path.join(__dirname, 'users.txt');

const readUsersFromFile = () => {
    if (!fs.existsSync(USERS_FILE)) return [];
    const usersData = fs.readFileSync(USERS_FILE, 'utf8');
    return usersData ? JSON.parse(usersData) : [];
};

const writeUsersToFile = (users) => {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
};

// Sign Up Endpoint
app.post('/api/signup', async (req, res) => {
    const { username, email, password } = req.body;
    const users = readUsersFromFile();
    if (users.find(user => user.username === username)) {
        return res.status(400).json({ message: 'Username already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { username, email, password: hashedPassword };
    users.push(newUser);
    writeUsersToFile(users);
    res.sendStatus(201);
});

// Login Endpoint
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    const users = readUsersFromFile();
    const user = users.find(user => user.username === username);
    if (!user) return res.sendStatus(401);
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.sendStatus(401);
    const token = jwt.sign({ userId: user.username }, 'secret');
    res.json({ token });
});

// Start server
app.listen(3000, () => console.log('Server started on port 3000'));
