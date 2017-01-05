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
		{'c':'clean'},			// commandline aliases
		"\tbuild                  Builds the source and places them in the output dir\n"+
		"\t                       eg. 'ergo build'\n"+
		"\t-c, --clean            Removes all files from the output folder beforehand.\n"+
		"\t                       Use with EXTREME caution if on a live server\n" +
//		"\t                       Use use an .ergoignore file to keep some files.\n" + 
		""
 	);

module.exports.build = function(options) {
	return require('ergo-core').build(options);
}
