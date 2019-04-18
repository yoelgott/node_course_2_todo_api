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

    // collection.deleteMany({text: 'eat lunch'}).then((res) => {
    //     console.log(res.deletedCount);
    // }, (err) => {
    //     console.log('couldnt delete data', err);
    // });

    // collection.findOneAndDelete({completed: false}).then((res) => {
    //     console.log(res);
    // });

    collection.deleteMany({name:'yoel'}).then((hel) => {
        console.log(hel.deletedCount);
    });

    collection.findOneAndDelete({
        _id: new ObjectId("5cb7fa55bcb20d2df04549c7")
    }).then((res) => {
        console.log(res);
    });

    client.close();
});