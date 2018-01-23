const todos = [
    'clean room',
    'brush teeth',
    'exercise',
    'study javascript',
    'eat healthy'
];

/************
For Loops (Used 90% of the time)
***********/

// how can we add a '!' after all these todos?
// for (var i = 0; i < todos.length; i++) {
//     todos[i] = todos[i] + "!";
// }

/************
ForEach Loops (ES6)
***********/
todos.forEach(function(todo, index) {
   todo = todo + '!';
   console.log(todo, index+1);
});

function logTodos(todo, i) {
    console.log('from function logTodos,', todo, i);
}
todos.forEach(logTodos);

// how can we clear out all of the todos?
// const todosLength = todos.length;
// for (var i = 0; i < todosLength; i++) {
//     todos.pop();
// }

/************
While Loops
***********/
// let counterOne = 0;
// while (counterOne <= 10) {
//     console.log(counterOne);
//     counterOne++;
// }

/************
Do While Loops
***********/
// let counterTwo = 0;
// do {
//     console.log(counterTwo);
//     counterTwo++;
// } while (counterTwo < 10);