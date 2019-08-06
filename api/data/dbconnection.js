var MongoClient = require('mongodb').MongoClient;
// connection string protocol://host:port/dbname
var dburl = 'mongodb://localhost:27017/meanhotel';

var _connection = null;
var open = function(){
    MongoClient.connect(dburl, function(err, db){
        if (err){
            console.log("DB connection failed");
            return;
        }
        _connection = db;
        console.log("DB connection open", db);
    });
};

var get = function(){
    return _connection;
};

module.exports = {
    open:open,
    get:get
};