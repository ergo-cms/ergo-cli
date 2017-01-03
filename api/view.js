/**
 * @license MIT
 * Copyright (c) 2016 Craig Monro (cmroanirgo)
 **/


/*
* This is the public api for 'init'
* Returns a Promise
*/

module.exports = require('./api-base')(
 		'view', 				// this api method name
 		undefined, 				// no required parameters
		{'p': 'port'},			// commandline aliases
		"\tview                   Starts the local webserver running\n"+
		"\t                       eg. 'ergo view'\n"+
		"\t-p81, --port=81        Changes the port to use port 81, (by default it's 8181)\n" +
		"" 		
 	);

module.exports.view = function(options) {
	return require('ergo-core').view(options);
}
