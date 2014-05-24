'use strict';

var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var ejs = require('ejs');


var app  = express();
app.engine('html', ejs.renderFile);

app.use(morgan('dev')); 					// log every request to the console
app.use(bodyParser()); 						// pull information from html in POST
app.use(methodOverride()); 					// simulate DELETE and PUT
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + '/public')); // set the static files location /public/libs will be /libs for users
app.use('/', express.static(__dirname + '/app'));



app.get('/', function(req, res, next) {
    res.render('index.html', {
        title: ''
    });
});

app.listen(3000);
console.log('Listening at http://localhost:3000');