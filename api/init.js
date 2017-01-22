/**
 * @license MIT
 * Copyright (c) 2016 Craig Monro (cmroanirgo)
 **/

var l  = require('ergo-utils').log;

module.exports = require('./api-base')(
 		'init', 				  // this api method name
 		'dir',				      // required parameter name
 		{'f': 'force'},			  // command line aliases
		"\tinit dir [skeleton]    Creates a new site in 'dir' with optional skeleton\n"+
		"\t                       eg. 'ergo init MyBlog'\n"+
		"\t                           'ergo init MyBlog some-repo/alt-skel'\n"+
		"\t                          The default skeleton is 'github:ergo-cms/ergo-skel'\n"+
		"\t                       Use 'ergo init . -f' to force creation in the current dir.\n"+
		"\t-f, --force            Removes safety restraints and forces the command to occur\n" +
		"" 		
 	);

var Spinner = require('cli-spinner').Spinner;

module.exports.init = function(dir, options) {
	var path = require('path');
	var skel = 'github:ergo-cms/ergo-skel';
	if (options._.length>1)
		skel = options._[1];
	spinner = new Spinner('Initializing... %s');
	spinner.setSpinnerString('|/-\\');
	spinner.start();		
	return require('ergo-core').init(dir, skel, options)
				.then(function(name) {
					if (spinner) spinner.stop(true); spinner = null;
					l.log(name ? "'"+name+"' installed to '"+dir+"'" : "failed")
				})
				.finally(function() { 
					if (spinner) spinner.stop(true); 
				});
}

