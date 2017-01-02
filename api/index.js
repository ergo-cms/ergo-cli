
/**
 * @license MIT
 * Copyright (c) 2016 Craig Monro (cmroanirgo)
 **/
var _  = require('ergo-utils')._;
var l  = require('ergo-utils').log.module('ergo-cli-api');
var fs = require('fs');
var path = require('path');


/*
Each file in this dir is expected to be a 'public' commandline api.

As such, the expected interface for each is defined in api-base.js
*/

module.exports = buildApi();

function buildApi() {
	var api = {};
	l.logd('building api')
	fs.readdirSync(__dirname).forEach(function(file) {
		if (file!='index.js' && file!='api-base.js') { // this file
			file = path.basename(file, '.js'); // chop off the .js
			l.logd('including api: ' + file)
			try { 
				api[file] = require('./'+file);
			}
			catch(e) {
				l.loge("Failed to load api for '"+file+"': \n" + _.niceStackTrace(e));
				throw e; // deliberately propogate this. This is a DEV fault & need be discovered early
			}
		}
	});
	return api;
}




