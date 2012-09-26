var util = require('util');
var fs = require('fs');
var mongo = require('mongodb'),
  Server = mongo.Server,
  Db = mongo.Db,
Grid = mongo.Grid
ObjectID = mongo.ObjectID;

var server = new Server('localhost', 27017, {auto_reconnect: true});
var db = new Db('test', server);

exports.fileupload = function(req, res){
    var file = req.files.uploadFile;
    if(file) {
        var grid = new Grid(db, 'document');
        var fileSize = file.size;
        var data = fs.readFileSync(file.path);
        grid.put(data, {metadata:{category:'image'}, content_type: file.type, filename: file.name.replace(' ', '_')}, function(err, fileInfo) {
          if(!err) {
            console.log("Finished writing file to Mongo");
            res.writeHead(200, {});
            res.end("Success");
            db.close();
          }
        });
    } else {
        res.writeHead(400, {});
        res.end();
    }
     
}


exports.formpage = function(req, res){
  res.render("fileupload", {title: "File Upload"});
};
