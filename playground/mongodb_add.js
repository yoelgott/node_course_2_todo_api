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

    // const collection = db.collection('Users');
   
    // להוסיף שדות לקולקשנים

    collection.insertOne({
        text: 'some text',
        completed: false
    }, (err, res) => {
        if(err) {
            return console.log('unable to insert to db', err);
        };
        console.log('inserted successfuly');
        console.log(res.ops);
    });

    // const collection = db.collection('Users');
    
    collection.insertOne({
        name: 'yoel',
        age: 45,
        location: 'ohio'
    }, (err, res) => {
        if(err) {
            return console.log('unable to insert to db', err);
        };
        console.log('inserted successfuly');
        console.log(res.ops);
    });

    client.close();
});