'use strict';

// set up ========================
var express = require('express'),
	ejs = require('ejs');

var styleguide = require('./routes/home.js');

var app = express();

// PROD && DEV
app.configure(function() {
	app.set('views', __dirname + '/views');
	app.set('assets', __dirname + '/public');

	app.engine('html', ejs.renderFile);
	app.use(express.static(__dirname + '/app'));
});

app.get('*', styleguide.index);

app.listen(3000);
console.log('Listening at http://localhost:3000');