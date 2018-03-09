const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const app = express();

const database = {
    users : [
        {
            id: '123',
            name: 'Khoi',
            email: 'khoi@gmail.com',
            password: 'cookies',
            entries: 0,
            joined: new Date().getFullYear()
        },
        {
            id: '124',
            name: 'Dice',
            email: 'dice@gmail.com',
            password: 'bananas',
            entries: 0,
            joined: new Date().getFullYear()
        }
    ]
};

// Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
   res.send(database.users);
});

// signin --> POST request because we're posting some data. Responds with success/fail
app.post('/signin', (req, res) => {
    if (req.body.email === database.users[0].email && req.body.password === database.users[0].password) {
        res.json(database.users[0]);
    } else {
        res.status(400).json('error logging in');
    }
});

// register --> Post request. Return with new user
app.post('/register', (req, res) => {
    const { email, name, password} = req.body;
    bcrypt.hash(password, null, null, function(err, hash) {
        console.log(hash);
    });
    database.users.push({
        id: '125',
        name: name,
        email: email,
        entries: 0,
        joined: new Date().getFullYear()
    });
    res.json(database.users[database.users.length - 1]);
});

// profile/:userId --> GET request = user
app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    let found = false;

    database.users.forEach((user) => {
        if (user.id === id) {
            found = true;
            return res.json(user);
        }
    });
    if (!found) {
      res.status(404).json('no such user');
    }
});

// image --> PUT = user
app.put('/image', (req, res) => {
    const { id } = req.body;
    let found = false;

    database.users.forEach((user) => {
        if (user.id === id) {
            found = true;
            user.entries++;
            return res.json(user.entries);
        }
    });
    if (!found) {
        res.status(404).json('no such user');
    }
});

// bcrypt.hash("bacon", null, null, function(err, hash) {
//     // Store hash in your password DB.
// });
//
// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });

app.listen(3001, () => {
    console.log('app is running on port 3001');
});

/*
/ --> res  = this is working
/signin --> POST request because we're posting some data = success/fail
/register --> Post request = user
/profile/:userId --> GET request = user
/image --> PUT = user
 */