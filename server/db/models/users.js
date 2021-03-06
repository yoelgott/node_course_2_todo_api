const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcryptjs = require('bcryptjs');

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

user_schema.statics.find_by_token = function (token) {
    var User = this;
    var decoded;

    try{
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
        // return new Promise((resolve, reject) => {
        //     reject();
        // });
        return Promise.reject('could not find user');
    };

    return User.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    });
};

user_schema.pre('save', function (next) {
    var user = this;

    if(user.isModified('password')){
        var pass = user.password;
        bcryptjs.genSalt(10, (err, salt) => {
            bcryptjs.hash(pass, salt, (err, hash) => {
                user.password = hash;
                next();
            });
        });
    }else{
        next();
    };
});

user_schema.methods.toJSON = function(){
    var user = this;
    var user_object = user.toObject();

    return _.pick(user_object, ['_id', 'email']);
};

user_schema.methods.generate_auth_token = function () {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id: user._id.toHexString(), access}, process.env.JWT_SECRET).toString();

    user.tokens = user.tokens.concat([{access, token}]);

    return user.save().then(() => {
        return token;
    });
};

user_schema.methods.remove_token = function (token) {
    var user = this;
    return user.update({
        $pull: {
            tokens: {token}
        }
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