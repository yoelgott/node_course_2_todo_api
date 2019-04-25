const _ = require('lodash');
const express = require('express');
const body_parser = require('body-parser');
const ObjectId = require('mongoose').Types.ObjectId;

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./db/models/todo');
var {user} = require('./db/models/users');

var app = express();

const port = process.env.PORT || 3000;

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

app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectId.isValid(id)) {
        return res.send('id not valid');
    };

    if(_.isBoolean(body.completed) && body.completed){
        body.completed_at = new Date().getTime();
    }else{
        body.completed = false;
        body.completed_at = null;
    };

    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
        if(!todo){
            return res.status(404).send();
        }

        console.log(`updated!\n${todo}`);
        res.send(todo);
    }).catch((e) => {
        res.status(400).send();
    });
});

app.post('/users', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);

    var new_user = new user(body);

    new_user.save().then((doc) => {
        console.log('saved it!');
        return new_user.generate_auth_token();
    }).then((token) => {
        res.header("x-auth", token).send(new_user);
    }).catch((e) => {
        console.log('could not save it', e);
        res.status(400).send(e);
    });
});

app.listen(port, () => {
    console.log(`started on port ${port}`);
});

module.exports = {app};
