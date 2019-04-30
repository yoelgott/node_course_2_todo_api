const _ = require('lodash');
const express = require('express');
const body_parser = require('body-parser');
const ObjectId = require('mongoose').Types.ObjectId;
const bcryptjs = require('bcryptjs');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./db/models/todo');
var {user} = require('./db/models/users');
var {authenticate} = require('./middleware/authenticate');

var app = express();

const port = process.env.PORT || 3000;

app.use(body_parser.json());

app.post('/todos', authenticate, (req, res) => {
    var new_todo = new Todo({
        text: req.body.text,
        _creator: req.user._id
    });

    new_todo.save().then((doc) => {
        console.log('saved it\n');
        res.send(doc)
    }, (e) => {
        console.log("was unable to save");
        res.status(400).send(e);
    });
});     

app.get('/todos', authenticate, (req, res) => {
    Todo.find({
        _creator: req.user._id
    }).then((todos) => {
        console.log(todos)
        res.send({todos});
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/todos/:id', authenticate, (req, res) => {
    var id = req.params.id;
    var user_id = req.user._id;

    if (!ObjectId.isValid(id)) {
        return res.send('id not valid');
    };

    Todo.findOne({
        _id: id,
        _creator: user_id
    }).then((todo) => {
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

app.delete('/todos/:id', authenticate, (req, res) => {
    var id = req.params.id;
    var user_id = req.user._id;

    if (!ObjectId.isValid(id)) {
        return res.send('id not valid');
    };

    Todo.findOneAndDelete({
        _id: id,
        _creator: user_id
    }).then((todo) => {
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

app.patch('/todos/:id', authenticate, (req, res) => {
    var id = req.params.id;
    var user_id = req.user._id;
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

    Todo.findOneAndUpdate({
        _id: id,
        _creator: user_id
    }, {$set: body}, {new: true}).then((todo) => {
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

app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});

app.post('/users/login', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);

    user.findOne({email: body.email}).then((user_) => {
        bcryptjs.compare(body.password, user_.password, (err, boo) => {
            if(boo){
               return user_.generate_auth_token().then((token) => {
                    res.header('x-auth', token).send(body);
                });
                // res.send(user_.tokens[0].token);
            };
            res.status(400).send('wrong password');
        });
    }).catch((e) => {
        res.status(400).send('wrong email');
    });
});

app.delete('/users/me/token', authenticate, (req, res) => {
    req.user.remove_token(req.token).then(() => {
        res.status(200).send('logged out successfuly', doc);
    }, () => {
        res.status(400).send('wrong token');
    });
});

app.listen(port, () => {
    console.log(`started on port ${port}`);
});

module.exports = {app};
