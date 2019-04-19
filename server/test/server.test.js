const expect = require('expect');
const request = require('supertest');

var {app} = require('./../server');
const {Todo} = require('./../db/models/todo');

// beforeEach((done) => {
//     Todo.remove({}).then(() => done());
// });

describe('Post /todos', () => {
    it('should create a new todo', (done) => {
        Todo.find().then((res) => {
            var len_todo = res.length;

    
            var text = 'eat lunch';

            request(app)
            .post('/todos')
            .send({
                text
            })
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
    it('should nor  create any todo', (done) => {
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
});
