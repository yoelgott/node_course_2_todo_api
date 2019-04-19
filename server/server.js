var express = require('express');
var body_parser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./db/models/todo');
var {User} = require('./db/models/users');

var app = express();

app.use(body_parser.json());

app.post('/todos', (req, res) => {
    var new_todo = new Todo({
        text: req.body.text
    });

    new_todo.save().then((doc) => {
        console.log('saved it\n');
        res.send(doc)
    }, (e) => {
        console.log("was unable to save");
        res.status(400).send(e);
    });
});     

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        console.log(todos)
        res.send({todos});
    }, (e) => {
        res.status(400).send(e);
    });
});

app.listen(3000, () => {
    console.log('started on port 3000');
});

module.exports = {app};