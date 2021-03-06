const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('getting root!');
});

app.get('/profile', (req, res) => {
    res.send('getting profile!');
});

app.post('/profile', (req, res) => {
    console.log(req.body);
    const user = {
        name: 'Sally',
        hobby: 'Soccer'
    };
    res.send('Success!');
});

app.listen(3000);