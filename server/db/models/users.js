const mongoose = require('mongoose');
const validator = require('validator');

var user = mongoose.model('user', {
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
    password: [{
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