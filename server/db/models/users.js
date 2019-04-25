const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

var user_schema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minlength: 3,
        trim: true,
        unique: true,
        validate: {
            validator: (value) => {
                return validator.isEmail(value);
            },
            message: '{VALUE} is not a valid email'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

user_schema.methods.toJSON = function(){
    var user = this;
    var user_object = user.toObject();

    return _.pick(user_object, ['_id', 'email']);
};

user_schema.methods.generate_auth_token = function () {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

    user.tokens = user.tokens.concat([{access, token}]);

    user.save().then(() => {
        return token;
    });
};

var user = mongoose.model('users', user_schema);

// var new_user = new user({
//     password: '123',
//     email: 'yoel@gmail'
// });

// new_user.save().then((res) => {
//     console.log('saved the user\n', res);
// }, (e) => {
//     console.log('unable to save user', e)
// });

module.exports = {user};