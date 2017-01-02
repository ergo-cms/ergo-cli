/**
 * @license MIT
 * Copyright (c) 2016 Craig Monro (cmroanirgo)
 **/


/*
* This is the public api for 'init'
* Returns a Promise
*/

module.exports = require('./api-base')(
 		'build', 				// this api method name
 		undefined, 				// no required parameters
		undefined,			// commandline aliases
		"\tbuild                  Builds the source and places them in the output dir\n"+
		"\t                       eg. 'ergo build'\n"+
		"" 		
 	);

module.exports.build = function(options) {
	return require('ergo-core').build(options);
}
