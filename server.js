
var express = require('express')
var routes = require('./lib/routes')
var bodyParser = require('body-parser')

var PORT = process.env.PORT || 3000;

var urlencodedParser = bodyParser.urlencoded({ extended: true })
var jsonParser = bodyParser.json({type : '*/*'})

var app = express()
app.use(urlencodedParser)
app.use(jsonParser)

app.use(routes);

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});