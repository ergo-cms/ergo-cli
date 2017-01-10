/**
 * @license MIT
 * Copyright (c) 2016 Craig Monro (cmroanirgo)
 **/


/*
* This is the public api for 'init'
* Returns a Promise
*/

module.exports = require('./api-base')(
 		'watch', 				// this api method name
 		undefined, 				// no required parameters
		{						// commandline aliases:
 			 'b': 'build'
 			,'c': 'clean'
		},			
		"\twatch                  Watches the source tree for changes & rebuilds\n"+
		"\t                       eg. 'ergo watch'\n"+
		"\t-b, --build            Does an initial build.\n" +
		"\t-c, --clean            Does a clean with every build.\n" +
		"" 		
 	);

module.exports.watch = function(options) {
	return require('ergo-core').watch(options);
}
