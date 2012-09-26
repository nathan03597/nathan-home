var mongodb = require('mongodb'), 
    Db = mongodb.Db,
    Connection = mongodb.Connection,
    Server = mongodb.Server,
    BSON = mongodb.BSONPure,
    connect = mongodb.connect;
    
var inherits = require('util').inherits;

var host = process.env['MONGO_NODE_DRIVER_HOST'] != null ? process.env['MONGO_NODE_DRIVER_HOST'] : 'localhost';
var port = process.env['MONGO_NODE_DRIVER_PORT'] != null ? process.env['MONGO_NODE_DRIVER_PORT'] : Connection.DEFAULT_PORT;

var mongoServer = new Server(host, port, {});
console.log("Connecting to " + host + ":" + port);
var Client = new Db('test', mongoServer,{});

/**
 * Base object for models
 */
 
function Model(collection, data) {
    if (!collection) { throw Error('Collection name should be specified! ')}
    data = data || {};
    this.data = data;
    this.collection_name = collection;
    this.client = Client;
}

Model.prototype.get = function(key) {
  if (key == 'id') return this.data['_id'] ? this.data['_id'].toString() : null;
  return this.data[key];
}

Model.prototype.set = function(key, value) {
  if (value == undefined) {
    if (this.data._id)
      key._id = this.data._id;
    this.data = key;
    return;
  }
  return this.data[key] = value;
}

Model.prototype.save = function(callback) {
    var self = this;
    self.client.open(function(err, db){
        db.collection(self.collection_name, function(err, collection){
            collection.insert(self.data);
            db.close();
            callback(null);
        });
    });
}

Model.prototype.remove = function(callback) {
    var self = this;
    self.client.open(function(err, db){
        db.collection(self.collection_name, function(err, collection){
            collection.update({io_username: self.data.io_username}, {io_deleted: true});
            db.close();
            callback(null);
        });
    });
}



/**
 * User Model
 */
function User(data) {
  Model.call(this, 'io_user', data);
}
inherits(User, Model);

User.getByUsername = function(username, callback) {
    Client.open(function(err, db) {
        db.collection('io_user', function(err, collection){
            collection.findOne({io_username: username}, function(err, item){
                db.close();
                callback(new User(item))
             });
        });
    });
};

exports.User = User;
