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


