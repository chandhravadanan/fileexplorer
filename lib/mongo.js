
var mongoose = require('mongoose');
var config = require('./config.json');

var connstring = "mongodb://"+config.mongouser+":"+config.mongopassword+"@"+config.mongohost+":"+config.mongoport+"/explorer";

mongoose.connect(connstring, { useNewUrlParser: true, useUnifiedTopology: true })

var db = mongoose.connection;
db.on('error', (err)=>{
    console.log('mongo conn err', err)
});

db.once('open', ()=>{
  console.log("mongo connection established");
});

module.exports = mongoose

