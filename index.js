'use strict';

var BProtocol = require('./bprotocol');

module.exports= (source, options) => {
	return new BProtocol(source, options);
};
