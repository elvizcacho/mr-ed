var request = require('request');

var isStateMachineEvent = function(name) {
	return (
		name === 'order_completed' ||
		name === 'order_all_delivered' ||
		name === 'order_cancel' ||
		name === 'order_checkout' ||
		name === 'order_pending_verification' ||
		name === 'retailer_product_checkout' ||
		name === 'retailer_product_order_pre_taken' ||
		name === 'retailer_product_order_taken' ||
		name === 'retailer_product_shopping' ||
		name === 'retailer_product_shopping_done' ||
		name === 'retailer_product_gets_out_of_retailer' ||
		name === 'retailer_product_arrive_to_client' ||
		name === 'retailer_product_cancel' ||
		name === 'retailer_product_reset_to_processing'
	);
};

function Events() {}

Events.prototype.init = function(token, url) {
	this.token = token;
	this.url = url;
};

Events.prototype.trigger = function(name, data, cb) {
	var url = this.url + ((isStateMachineEvent(name)) ? 'orders/change_status' : 'events/trigger');
	data.name = name;
	request({
		url: url + '?token=' + this.token,
		method: 'POST',
		json: true,
		body: JSON.parse(JSON.stringify(data))
	}, function(err, res, body) {
		if (body) body.responseStatusCode = res.statusCode;
		cb(err, body);
	});
};

module.exports = new Events();
