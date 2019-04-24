const expect = require('expect');
const request = require('supertest');
const {ObjectId} = require('mongodb');

var {app} = require('./../server');
const {Todo} = require('./../db/models/todo');

// const todos_ = [{
//     __id: new ObjectId(),
//     text: 'eat supper'
// }, {
//     __id: new ObjectId(),
//     text: 'play'
// }];


// beforeEach((done) => {
//     Todo.remove({}).then(() => {
//         return Todo.insertMany(todos_);
//     }).then(() => done());
// });


describe('Post /todos', () => {
    it('should create a new todo', (done) => {
        Todo.find().then((res) => {
            var len_todo = res.length;

    
            var text = 'eat lunch';

            request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((rest) => {
                expect(rest.body.text).toBe(text);
            })
            .end((err, response) => {
                if(err) {
                    return done(err);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(len_todo + 1);
                    expect(todos[todos.length-1].text).toBe(text);
                    done();
                }).catch((e) => done(e));
            });
        });
    });
    it('should not create any todos', (done) => {
        request(app)
        .post('/todos')
        .send({})
        .expect(400)
        .end((err, res) => {
            if(err){
                return done(err);
            }else{
                return done();
            };
        });
    });

    describe('GET /todos/:id', () => {
        it('should return todo doc', (done) => {
            request(app)
            .get(`/todos/5cbd55a8b148da0170e014bb`)
            // .expect(200)
            .expect((res) => {
                expect(res.text).toBe('play');
            })
            .end(done);
        });
        // it('should return a ')
    });

});
