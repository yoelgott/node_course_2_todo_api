// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectId} = require('mongodb');

// var obj_id = new ObjectId();
// console.log(obj_id.getTimestamp());

const myDb = 'ToDoApp';

MongoClient.connect('mongodb://localhost:27017', (err, client) => {
    if(err){
        console.log(err);
        return console.log('unable to connect to server');
    };
    console.log('connected to server suuccessfuly');

    const db = client.db(myDb);

    // const collection = db.collection('ToDos');

    const collection = db.collection('Users');

    collection.findOneAndUpdate({_id: new ObjectId("5cb80d094844b01218be1008")}, {
        $inc: {age:1},
        $set: {name: 'sara'}
    }, {returnOriginal: false})
    .then((res) => {
        console.log(res);
    });

    client.close();
});