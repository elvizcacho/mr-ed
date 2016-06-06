var Subscribers = require('./subscribers');
var Events = require('./events');
var fs = require('fs');
var config = JSON.parse(fs.readFileSync('./config.json', 'utf-8'));

function Ed() {}

Ed.prototype.connection = function(data) {
	if (!data.token) throw new Error('Not token provided');
	if (!data.env) throw new Error('Not env provided');
	if (data.env !== 'dev' || data.env !== 'live' || data.env !== 'production' || data.env !== 'local' || data.env !== 'development') throw new Error('Env value wrong. Try dev live or local');
	this.token = data.token;
	this.env = data.env;
	this.url = config[this.env];
};

Ed.prototype.Subscribers = Subscribers;
Ed.prototype.Events = Events;

module.exports = new Ed();
