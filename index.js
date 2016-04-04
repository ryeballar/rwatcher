'use strict';

var BProtocol = require('./bprotocol');

module.exports= (options) => {
	return new BProtocol(options);
};
