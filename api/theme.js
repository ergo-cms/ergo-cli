/**
 * @license MIT
 * Copyright (c) 2016 Craig Monro (cmroanirgo)
 **/


/*
* This is the public api for 'theme'
* Returns a Promise
*/
var l  = require('ergo-utils').log;
module.exports = require('./api-base')(
 		'theme', 				// this api method name
 		'command', 		
		{						// commandline aliases:
//			 'p': 'port'
		},			
		"\ttheme install name     Installs the named theme into the current working folder\n"+
		"\t                       eg. 'ergo theme install clean-blog'\n"+
		"\t                       eg. 'ergo theme install github:some-repo/other-theme'\n"+
		"\ttheme switch name      Changes the current theme\n"+
		"\ttheme remove name      Removes the theme\n"+
		"\ttheme list             Lists the installed themes\n"+
		"\t                       eg. 'ergo theme list'\n"+
//		"\t-c, --clean            Does a clean with every build.\n" +
		"" 		
 	);

var Spinner = require('cli-spinner').Spinner;

module.exports.theme = function(command, options) {
	var theme_api = require('ergo-core').theme;
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
			return theme_api.install(name, options)
				.then(function(name) {
					if (spinner) spinner.stop(true); spinner = null;
					l.log(name ? "'"+name+"' installed" : "failed")
				})
				.finally(function() { 
					if (spinner) spinner.stop(true); 
				});
		}
		case 'switch' : if (!name) throw Error("Expected name"); return theme_api.switch(name, options);

		case 'rm'     :  
		case 'remove' :  if (!name) throw Error("Expected name"); return theme_api.remove(name, options);

		case 'list'   : return theme_api.list(options);
		default:
			throw new Error("Unknown command: " + command)
	}
	return Promise.resolve(false);
}
