var model = require('./lib/mg_model.js')
var util = require('util')

var data = {io_username: "Jonathan", io_password: "123", io_deleted: false};



var user = new model.User(data)




model.User.getByUsername('nathan', function(result){
    console.log('Result: ' + result.get('io_username'))
});


