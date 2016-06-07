var request = require('request');

function Subscribers() {}

Subscribers.prototype.init = function(token, url) {
	this.token = token;
	this.url = url;
};

Subscribers.prototype.me = function(cb) {
	request({
		url: this.url + 'subscribers/me?token=' + this.token,
		method: 'GET',
		json: true
	}, function(err, res, body) {
		cb(err, body);
	});
};

module.exports = new Subscribers();
