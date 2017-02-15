/**
 * @license MIT
 * Copyright (c) 2016 Craig Monro (cmroanirgo)
 **/


/*
* This is the public api for 'deploy'
* Returns a Promise
*/

var l  = require('ergo-utils').log;
var _  = require('ergo-utils')._;
module.exports = require('./api-base')(
 		'deploy', 				// this api method name
 		null, 		
		{						// commandline aliases:
			 'f': 'force',
			 //'u': 'user',
		},			
		"\tdeploy                   Uploads to server. Config is stored in config.ergo.js under 'deploy'\n"+
		"" 		
 	);

var Spinner = require('cli-spinner').Spinner;

module.exports.deploy = function(options) {
	var sync_api = require('ergo-core').sync;
	/*var spinner;
	if (l._verbosity()>-1) {
		spinner = new Spinner('syncing... %s');
		spinner.setSpinnerString('|/-\\');
		spinner.start();		
	}*/
	//console.log(require("util").inspect(options, {color:true}));

	return sync_api.deploy(options)
		.then(function(result) {
			//if (spinner) spinner.stop(true);spinner = null; 
			l.log(result ? "OK" : "Failed")
			return true;
		})
		.catch(function(err) {
			//if (spinner) spinner.stop(true); spinner = null;
			l.loge("Failed: " + !!err ? _.niceStackTrace(err) : '');
			return false;
		})
		.finally(function() { 
		});

}
