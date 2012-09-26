var mongo = require('mongodb'),
  Server = mongo.Server,
  Db = mongo.Db,
Grid = mongo.Grid
ObjectID = mongo.ObjectID;

var fs = require('fs');

var server = new Server('localhost', 27017, {auto_reconnect: true});
var db = new Db('test', server);

db.open(function(err, db) {
  if(!err) {
      /*
    var grid = new Grid(db, 'document');
    fileId = new ObjectID("50629d4fd93a4d2827000001");
    grid.get(fileId, function(err, data){
        console.log("Retrieved data: " + data);
         db.close();
    })
   
     */
     // Read the filesize of file on disk (provide your own)
    var fileSize = fs.statSync('./public/images/404.png')
        .size;
    // Read the buffered data for comparision reasons
    var data = fs.readFileSync('./public/images/404.png');
    

    grid.put(data, {metadata:{category:'image'}, content_type: 'image/png', filename: '404.png'}, function(err, fileInfo) {
      if(!err) {
        console.log("Finished writing file to Mongo");
        db.close();
      }
    });

  }
});


