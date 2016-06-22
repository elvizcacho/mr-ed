var Subscribers = require('./subscribers');
var Events = require('./events');
var fs = require('fs');
var config = JSON.parse(fs.readFileSync(__dirname + '/config.json', 'utf-8'));
var EventEmitter = require('events').EventEmitter;
var emitter = new EventEmitter();

function Ed() {}

Ed.prototype.router = function(app) {
	app.post('/events/:event', function(req, res, next) {
		emitter.emit(req.params.event, req.body.new, req.body.old);
		res.send({
			msg: 'ok'
		});
	});
	console.log('Ed\'s native emitter activated');
};

Events.emitter = emitter;
Ed.prototype.subscribers = Subscribers;
Ed.prototype.events = Events;

Ed.prototype.connect = function() {
	var data;
	var app;
	if (arguments.length === 1) {
		data = arguments[0];
	} else if (arguments.length === 2) {
		data = arguments[0];
		app = arguments[1];
		this.router(app);
	}
	if (!data.token) throw new Error('Not token provided');
	if (!data.env) throw new Error('Not env provided');
	if (!(data.env === 'dev' || data.env === 'live' || data.env === 'production' || data.env === 'local' || data.env === 'development')) throw new Error('Env value wrong. Try dev live or local');
	this.token = data.token;
	this.env = data.env;
	this.url = config.url[this.env];
	this.subscribers.init(this.token, this.url);
	this.events.init(this.token, this.url);
};



module.exports = new Ed();
