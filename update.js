
/*
* This script just does a git clone, or a git pull
* This should exist in ergo-core
*/
"use strict";

var path = require('path');
var fs = require('fs');
var l = require("ergo-utils").log.module("ergo-cli-update");
var _ = require('ergo-utils')._;
var execFile = require('child_process').execFile;





(function main(_argv) {
	var argv = cli(_argv);
	l.init(argsToOptions(argv));

	// process the options
	l.logd('begin')
	if (argv._.length<1)
		showHelp("No repository specified");
	if (argv._.length<2)
		showHelp("No destination specified");
	
	var repo = argv._[0];
	var dir = argv._[1];

	if (_.dirExistsSync(dir))
		run('git','-C', dir, 'pull','origin','master')
	else
		run('git', 'clone', repo, dir)
	
})(process.argv.slice(2));

function run() {
	var args = _.toRealArray(arguments).slice(1);
	var cmd = arguments[0];
	var options = {
		cwd: __dirname
	};

	//TODO. Maybe this should be promisified
	execFile(cmd, args, options, function(err, stdout, stderr) {
		if (stdout && stdout.length>0) l.log(stdout.toString())
		if (err) {
			if (stderr && stderr.length>0) l.loge(stderr.toString())
			l.loge(err.toString())
		}
		else
		{
			// good ol' git puts things into stderr, when it shouldn't
			if (stderr && stderr.length>0) l.log(stderr.toString())

		}
	})
}

function cli(args, options) {
	options = options || {
		alias:{
			  'q':'quiet'
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
	}
}


function showHelp(str) {
	if (str) {
		l.loge(str);
	}
	console.log(
		"USAGE:\n" +
		"\tnode update.js repository destination [options]\n" +
		"\n\n"+
		"WHERE:\n"+
		"\n"+
		"\t--quiet, -q            No output, except for warnings and errors\n" +
		"\t--verbose, -v          Verbose output. use -v2 or --verbose=2 for extra verbose\n" +
		

		"");
	process.exit(-1);
}


