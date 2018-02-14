const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

// app.get('/:id', (req, res) => {
//     console.log(req.query);
//     console.log(req.header);
//     console.log(req.params);
//     res.status(404).send('not found');
// });

app.listen(3000);