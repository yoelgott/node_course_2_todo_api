const {SHA256} = require('crypto-js');

var user = 'i am user numer 2';
var hash = SHA256(user).toString();

console.log(`user: ${user}`);
console.log(`hash: ${hash}`);


var data = {
    id: 4
};

var token = {
    data,
    hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
};

token.data.id = 5;
token.hash = SHA256(JSON.stringify(token.data)).toString();

var result_hash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

if(result_hash === token.hash){
    console.log("data was not changed");
}else{
    console.log('data was changed. do not trust!');
};
