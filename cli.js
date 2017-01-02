#!/usr/bin/env node

/**
 * @license MIT
 * Copyright (c) 2016 Craig Monro (cmroanirgo)
 * This file is part of ergo-cms, specifically, the package ergo-cli/cli.js
 **/

"use strict";
var bluebird = require('bluebird');
var path = require('path');
var fs = require('fs');
var l = require('ergo-utils').log.module('ergo-cli');
var _ = require('ergo-utils')._;
var api = require('./api/index');

l.debug = 2;


(function main(_argv) {
	var argv = cli(_argv);
	l.init(argv);

	// process the options
	if (argv._.length<1)
		showHelp(argv.help ? undefined : "No command specified");

	var apiName = argv._[0];
	l.logd('api command: ' + apiName)
	if (_.isDefined(api[apiName])) {
		if (argv.help)
			showComandHelp(apiName, api[apiName]);

		try {
			api[apiName]._cli_exec(_argv)
			.catch(function(err) {
				l.loge(_.niceStackTrace(err));
			})
		}
		catch(e) {
			// we catch errors that aren't promisified yet. These are the setup exceptions, such as missing parameters.
			// This is a good thing
			l.logd(e.toString())
			showComandHelp(apiName, api[apiName], e.message);
		}
	}
	else 
		showHelp("Unknown ergo command '"+apiName+"'");

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


function showHelp(str) {
	if (str) {
		l.loge(str);
	}

	var commandsStr = [];
	var apiNames = Object.keys(api).sort();
	for (var i=0; i<apiNames.length; i++) {
		var str = apiNames[i];
		var apiLib = api[str];
		var paramNames = apiLib.getRequiredParamNames().join(' ');
		if (paramNames.length)
			paramNames = ' ' + paramNames;
		commandsStr.push('\t'+str + paramNames)
	}

	console.log(
		"USAGE:\n" +
		"\tergo command [options]\n" +
		"\n"+
		"Valid commands are:\n"+
		commandsStr.join('\n')+
		"\n"+
		"WHERE:\n"+
		"\t--quiet,   -q          No output, except for warnings and errors\n" +
		"\t--verbose, -v          Verbose output. use -v2 or --verbose=2 for extra verbose\n" +
		"\t--help,    -h          Show Help. You can also use 'ergo [command] --help'\n" +
		"");
	process.exit(-1);
}

function showComandHelp(apiName, apiLib, str) {
	if (str)
		l.loge(str);

	var paramNames = apiLib.getRequiredParamNames().join(' ');
	if (paramNames.length)
		paramNames = ' ' + paramNames;

	console.log(
		"USAGE:\n" +
		"\tergo "+apiName+paramNames+" [options]\n" +
		"\n"+
		"WHERE:\n"+
		apiLib.getHelp()+
		"\t--quiet, -q            No output, except for warnings and errors\n" +
		"\t--verbose, -v          Verbose output. use -v2 or --verbose=2 for extra verbose\n" +
		

		"");
	process.exit(-1);

}

