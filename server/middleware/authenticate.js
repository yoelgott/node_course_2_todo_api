const {user} = require('./../db/models/users');

var authenticate = (req, res, next) => {
    var token = req.header('x-auth');

    user.find_by_token(token).then((doc) => {
        if(!doc){
            return Promise.reject('something went wrong');
        };

        req.user = doc;
        req.token = token;
        next();
    }, (e) => {
        res.status(401).send(e);
    });
};

module.exports = {authenticate};