var express = require('express');
var body_parser = require('body-parser');
const ObjectId = require('mongoose').Types.ObjectId;

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./db/models/todo');
var {user} = require('./db/models/users');

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

app.get('/todos/:id', (req, res) => {
    var id = req.params.id;

    if (!ObjectId.isValid(id)) {
        return res.send('id not valid');
    };

    Todo.findById(id).then((todo) => {
        if(todo){
            console.log(todo);
            res.send(todo);    
        } else{
            console.log('id not found');
            res.status(400).send('id not found');    
        };
        
    }, (e) => {
        console.log(e);
        res.status(400).send(e);
    });
});

app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;

    if (!ObjectId.isValid(id)) {
        return res.send('id not valid');
    };

    Todo.findByIdAndDelete(id).then((todo) => {
        if(!todo){
            console.log('id not found');
            return res.status(400).send('id not found');
        };

        console.log(todo);
        res.send(todo);
    }).catch((e) => {
        console.log(e);
        res.status(400).send('something went wrong');
    });
});

app.listen(3000, () => {
    console.log('started on port 3000');
});

module.exports = {app};