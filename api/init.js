/**
 * @license MIT
 * Copyright (c) 2016 Craig Monro (cmroanirgo)
 **/

module.exports = require('./api-base')(
 		'init', 				  // this api method name
 		'dir',				  // required parameter name
 		{'f': 'force'},			  // command line aliases
		"\tinit dir               Creates a new site in 'dir'\n"+
		"\t                       eg. 'ergo init MyBlog'\n"+
		"\t                       Use 'ergo init . -f' to force creation in the current dir.\n"+
		"\t-f, --force            Removes safety restraints and forces the command to occur\n" +
		"" 		
 	);

module.exports.init = function(dir, options) {
	var path = require('path');
	var skel_dir = path.join(path.dirname(__dirname), 'skel');
	return require('ergo-core').init(dir, skel_dir, options);
}

