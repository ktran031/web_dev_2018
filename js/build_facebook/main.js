
const database = [
    {
        username: 'cody',
        password: '321'
    },
    {
        username: 'sally',
        password: '123'
    },
    {
        username: 'ingrid',
        password: '777'
    }
];

const newsFeed = [
    {
        username: 'Bobby',
        timeline: 'So tired from all that learning!'
    },
    {
        username: 'Sally',
        timeline: 'JavaScript is so sexy!'
    },
    {
        username: 'Mitch',
        timeline: 'JavaScript is so awesome!'
    }
];

function isUserValid(username, password) {
    for (var i = 0; i < database.length; i++) {
        if(database[i].username === username && database[i].password === password) {
            return true;
        }
    }
    return false;
}

function signIn(user, pass) {
    if (isUserValid(user, pass)) {
        console.log(newsFeed);
    } else {
        alert('SORRY, WRONG USERNAME AND PASSWORD!');
    }
}

var userNamePrompt = prompt('What is your username?');
var passwordPrompt = prompt('What is your password?');

signIn(userNamePrompt, passwordPrompt);