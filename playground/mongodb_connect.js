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

    // var name_val = 'yoel';
    // collection.find({name:name_val}).count().then((num) => {
    //     console.log(`in users collection there is *${num}* name prperties of "${name_val}"`);
    // }, (err) => {
    //     console.log('unable to fetch data', err);
    // });

    //לחפש בתור הדיבי

    // collection.find({completed: true}).toArray().then((docs) => {
    //     console.log('ToDos');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
    //     console.log('unable to fetch ToDos', err);
    // });
    
    // collection.find().count().then((num) => {
    //     console.log('ToDos');
    //     console.log(num);
    // }, (err) => {
    //     console.log('unable to fetch ToDos', err);
    // });

    //להוסיף שדות לקולקשנים

    // collection.insertOne({
    //     text: 'some text',
    //     completed: false
    // }, (err, res) => {
    //     if(err) {
    //         return console.log('unable to insert to db', err);
    //     };
    //     console.log('inserted successfuly');
    //     console.log(res.ops);
    // });

    // const collection = db.collection('Users');
    
    // collection.insertOne({
    //     name: 'yoel',
    //     age: 45,
    //     location: 'ohio'
    // }, (err, res) => {
    //     if(err) {
    //         return console.log('unable to insert to db', err);
    //     };
    //     console.log('inserted successfuly');
    //     console.log(res.ops);
    // });

    client.close();
});