const {SHA256} = require('crypto-js');
const bcryptjs = require('bcryptjs');

var password = '123abc';

// bcryptjs.genSalt(10, (err, salt) => {
//     bcryptjs.hash(password, salt, (err, hash) => {
//         console.log(hash);
//     });
// });

var hash = '$2a$10$2ifGM4mOZWEBwTPpUV/t2.WjmWKD0.vDWvamkH4Kq6qw0rOjoSp2e';

bcryptjs.compare(password, hash, (err, res) => {
    console.log(res);
});


// var user = 'i am user numer 2';
// var hash = SHA256(user).toString();

// console.log(`user: ${user}`);
// console.log(`hash: ${hash}`);


// var data = {
//     id: 4
// };

// var token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// };

// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(token.data)).toString();

// var result_hash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

// if(result_hash === token.hash){
//     console.log("data was not changed");
// }else{
//     console.log('data was changed. do not trust!');
// };
