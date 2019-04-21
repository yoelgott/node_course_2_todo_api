const {mongoose} = require('C:/Users/yoelg/OneDrive/Desktop/node_js/applications/course/node_todo_api/server/db/mongoose.js');
const {Todo} = require('C:/Users/yoelg/OneDrive/Desktop/node_js/applications/course/node_todo_api/server/db/models/todo.js');
const {user} = require('C:/Users/yoelg/OneDrive/Desktop/node_js/applications/course/node_todo_api/server/db/models/users');

var id = '5cb9646d9cf2ff188435b7bb';

user.findById(id).then((users) => {
    if (!users){
        return console.log('id not found');
    };
    console.log(('ID', users));
}, (e) => {
    console.log(e);
});
