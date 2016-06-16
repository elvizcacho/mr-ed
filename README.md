# Mr. Ed
Easiest way to subscribe to Mercadoni's events

## How to use

1. Install the module:
```javascript
npm mr-ed --save
```
2. Initialise the module.
```javascript
//import the module to your project (where you initialise your node server)
var ed = require('mr-ed');
//connect to ED
ed.connect({
	token: 'token_provided_by_mercadoni',
	env: 'local|development|live|dev|production'
}, app); // app is an optional parameter that you can use to integrate this module with express (app is an express app) and let ed handle the events for you.
```

## Events

#### Listen for an event
```javascript
ed.events.emitter.on('event_name' , function(data){
 ...	
});
```
__Note:__ This emitter will be only available if you integrate express with ED. As there will be a route /events/:event where the webhooks will be received

By default, the events below exists in ED and any app can subscribe to them:
* order_all_delivered
* order_completed
* order_cancel
* order_checkout
* order_pending_verification
* retailer_product_checkout
* retailer_product_order_pre_taken
* retailer_product_order_taken
* retailer_product_shopping
* retailer_product_shopping_done
* retailer_product_gets_out_of_retailer
* retailer_product_arrive_to_client
* retailer_product_cancel
* retailer_product_reset_to_processing
* retailer_product_has_been_rated


## Subscribers

#### Get my info account
```javascript
ed.subscribers.me(function(err, me){
 ...	
});
```

## License
[MIT](https://github.com/elvizcacho/slack-easy-notifier/blob/master/LICENSE)

