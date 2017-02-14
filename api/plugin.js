/**
 * @license MIT
 * Copyright (c) 2016 Craig Monro (cmroanirgo)
 **/


/*
* This is the public api for 'plugin'
* Returns a Promise
*/
var l  = require('ergo-utils').log;
module.exports = require('./api-base')(
 		'plugin', 				// this api method name
 		'command', 		// required param
		{						// commandline aliases:
//			 'p': 'port'
		},			
		"\tplugin install name    Installs the named plugin into the current working folder\n"+
		"\t                              and activates it\n"+
		"\t                       eg. 'ergo plugin install nextprev'\n"+
		"\t                       eg. 'ergo plugin install github:some-repo/other-plugin'\n"+
		"\tplugin remove name     Removes the plugin\n"+
		"\tplugin activate name   (Re)activates the plugin\n"+
		"\tplugin deactivate name Deactivates the plugin, but does not remove it\n"+
		"\tplugin list            Lists the installed plugins\n"+
		"\t                       eg. 'ergo plugin list'\n"+
		"\tplugin active          Lists the active installed plugins\n"+
		"" 		
 	);

var Spinner = require('cli-spinner').Spinner;

module.exports.plugin = function(command, options) {
	var plugin_api = require('ergo-core').plugin_man;
	var spinner;
	//console.log(require("util").inspect(options, {color:true}));
	var name;
	if (options._.length>1)
		name = options._[1];
	switch (command.toLowerCase()) {
		case 'install': {
			if (!name) throw Error("Expected name"); 
			options.progress = function(what) {
				if (spinner || l._verbosity()<0)
					return;
				spinner = new Spinner(command+'ing... %s');
				spinner.setSpinnerString('|/-\\');
				spinner.start();		
			}
			return plugin_api.install(name, options)
				.then(function(name) {
					if (spinner) spinner.stop(true); spinner = null;
					l.log(name ? "'"+name+"' installed" : "failed")
				})
				.finally(function() { 
					if (spinner) spinner.stop(true); 
				});
		}

		case 'rm'     :  
		case 'remove' :  if (!name) throw Error("Expected name"); return plugin_api.remove(name, options);

		case 'a'        :  
		case 'activate' :  if (!name) throw Error("Expected name"); return plugin_api.activate(name, true, options);

		case 'd'          :  
		case 'deactivate' :  if (!name) throw Error("Expected name"); return plugin_api.activate(name, false, options);

		case 'list'   : return plugin_api.list(options);
		case 'active' : return plugin_api.listActive(options);
		default:
			throw new Error("Unknown command: " + command)
	}
	return Promise.resolve(false);
}
