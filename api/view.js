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
		{						// commandline aliases:
			 'p': 'port'
 			,'w': 'watch'
 			,'b': 'build'
 			,'c': 'clean'
		},			
		"\tview                   Starts the local webserver running\n"+
		"\t                       eg. 'ergo view'\n"+
		"\t-p81, --port=81        Changes the port to use port 81, (by default it's 8181)\n" +
		"\t-w, --watch            Watches the source folder for changes & rebuild.\n" +
		"\t-b, --build            Does an initial build.\n" +
		"\t-c, --clean            Does a clean with every build.\n" +
		"" 		
 	);

module.exports.view = function(options) {
	return require('ergo-core').view(options);
}
