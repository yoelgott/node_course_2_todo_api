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

    const collection = db.collection('ToDos');

    // const collection = db.collection('Users');

    // לחפש בתור הדיבי

    collection.find({completed: true}).toArray().then((docs) => {
        console.log('ToDos');
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('unable to fetch ToDos', err);
    });
    
    collection.find().count().then((num) => {
        console.log('ToDos');
        console.log(num);
    }, (err) => {
        console.log('unable to fetch ToDos', err);
    });


    client.close();
});