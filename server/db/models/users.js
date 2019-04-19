var mongoose = require('mongoose');

var user = mongoose.model('users', {
    password: {
        type: String,
        required: true,
        minlength: 1
    }, email: {
        type: String,
        required: true,
        minlength: 3,
        trim: true
    }
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