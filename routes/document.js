/*
 * GET Documents
 */
 
var MongoPool = require('../lib/mongo-pool').MongoPool,
    mongo = require('mongodb'),
    Grid = mongo.Grid;
    
var pool = new MongoPool({db: 'test', poolSize: 10});
    
exports.document = function(req, res){
    pool.getClient(function(client) {
        client.collection('document.files', function(err, collection) {
            collection.findOne({filename: req.params['filename']}, function(err, result){
                if(!result){
                    res.writeHead(404, {});
                    res.end();
                    pool.release(client);
                } else {
                    var grid = new Grid(client, 'document');
                    fileId = result._id;
                    grid.get(fileId, function(err, data){
                        console.info("Retrieved File: " + result.filename);
                        res.writeHead(200, {'Content-Type': result.contentType, 'Content-Length' : result.length});
                        res.end(data);
                        pool.release(client);
                        });
                }
             });
           pool.release(client);
        });
    });
};
