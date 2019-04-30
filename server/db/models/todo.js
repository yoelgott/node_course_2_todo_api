var mongoose = require('mongoose');

var Todo = mongoose.model('Todo' ,{
    text: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    completed_at: {
        type: Number,
        default: null
    },
    _creator: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
});

// var new_todo = new Todo({
//     text: '    hello world   '
// });

// new_todo.save().then((res) => {
//     console.log('saved todo\n', res);    
// }, (e) => {
//     console.log('unable to save', e);   
// });

module.exports = {Todo};