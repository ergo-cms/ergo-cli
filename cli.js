#!/usr/bin/env node
/**
 * @license MIT
 * Copyright (c) 2016 Craig Monro (cmroanirgo)
 * This file is part of ergo-cms, specifically, the package ergo-cli/cli.js
 **/

"use strict";
var ergo = require('./index');
var path = require('path');
var fs = require('fs');
var l = require('ergo-utils').log.module('ergo-cli');
var _ = require('ergo-utils')._;


function dirExists(filename) {  try { return fs.statSync(filename).isDirectory(); } catch(e) { return false; } } // node.js has deprecated its fs.exists :(


(function main(_argv) {
	var argv = cli(_argv);
	l.init(argsToOptions(argv));

	// process the options
	l.logd('begin')
	if (argv._.length<1)
		showHelp("No command specified");
	
	if (argv._[0]=='init') {
		if (argv._.length<2)
			showHelp("No folder specified for init");
		ergo.init(argv._[1], argsToOptions(argv));
	}
	else {
		showHelp("Unknown command: "+argv._[0]);
	}

/*	if (argv['web-server']) {
		l.logd('begin webserver')
		// start the web server
		var web_options = {
			  book: argv._[0]
			, uri_root: argv['name'] || undefined
			, port: parseInt(argv['web-server'], 10)>1?argv['web-server']:undefined
		};

		var web_root;
		if (argv['web-template']) {
			web_options.web_root = argv['web-template'];
			if (!dirExists(web_options.web_root)) throw "Web template folder, '"+web_root+"', not found";	
		}
		require('./src/web')(web_options);
		return;
	}

	if (argv._.length<2) {
		l.logd('#args = ' + argv._.length);
		console.error("Missing required arguments")
		showHelp();
	}

	if (!argv.font) {
		l.logd('Missing font');
		showHelp();
	}

	//if (argv.disclaimer && !argv.disclaimer.length)
	//	argv.disclaimer = 'default';
	function _isString(x) { return typeof x == 'string'; }

	var source = argv._[0];
	var destName = path.basename(source);
	if (argv.name && argv.name.length>5)
		destName = argv.name;
	if (destName.indexOf('.')<0) destName += '.epub';

	var dest;
	if (argv['no-subfolder'])
		dest = argv._[1];
	else
		dest = path.join(argv._[1], path.basename(destName, path.extname(destName)));

	var options = {
		  source: source
		, destFolder: dest
		, name: destName
		, font  : argv.font
		, disclaimer: _isString(argv.disclaimer) ? argv.disclaimer : undefined
		, web_template: _isString(argv.web_template) ? argv['web-template'] : undefined
		, num_scramblers: argv['num-scramblers'] || 3
		, italics: !argv['no-italics'] && true
		, bold: !argv['no-bold'] && true
		, quiet: argv['quiet'] || false
		, verbose: argv['verbose'] || 0
		, explode: argv['explode'] || false
		, explode_web: argv['explode-web'] || false
		//, inlineembed: argv['inline-embed-font'] || false
		//, auto_charset: argv['auto-charset'] || false
		, kindle: argv['kindle'] || false
	};
	
	_scramble(options).done();
*/

})(process.argv.slice(2));

function cli(args, options) {
	options = options || {
		alias:{
			 'f':'force'
			, 'i':'init'
			, 'q':'quiet'
			, 'v':'verbose'
		},
		boolean:true
	};
	return require('minimist')(args, options);
}

function argsToOptions(args) {
	return {
		verbose: args.verbose
		, debug: args.debug
		, quiet: args.quiet
		, force: args.force
	}
}


function showHelp(str) {
	if (str) {
		l.loge(str);
	}
	console.log(
		"USAGE:\n" +
		"\tergo command [options]\n" +
		"\n"+
		"Valid commands are:\n"+
		"\tinit folder            Creates a new site in 'folder'\n"+
		"\t                       eg. 'ergo init MyBlog'\n"+
		"\t                       Use 'ergo init . -f' to force creation in the current folder.\n"+
		"\n"+
		"WHERE:\n"+
		"\t\n"+
		"\t--force, -f            Removes safety restraints and forces the command to occur\n" +
		"\t--quiet, -q            No output, except for warnings and errors\n" +
		"\t--verbose, -v          Verbose output. use -v2 or --verbose=2 for extra verbose\n" +
		

		"");
	process.exit(-1);
}


