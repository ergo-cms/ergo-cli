/**
 * @license MIT
 * Copyright (c) 2016 Craig Monro (cmroanirgo)
 *
 * This file simply defines the api that all modules in this lib should implement
 **/
var _ = require('ergo-utils')._;
var l = require('ergo-utils').log.module('ergo-cli-api-base')

function Api(commandName, requiredParamNames, optionAliases, helpText) {
	this._name = commandName;
	this._paramNames = [];
	if (requiredParamNames){
		if (_.isArray(requiredParamNames))
			this._paramNames = requiredParamNames;
		else if (_.isString(requiredParamNames))
			this._paramNames = requiredParamNames.split(',');
		else
			throw new Error("Unknown 'required parameter names' for api plugin " + commandName)
	}
	this._numParams = this._paramNames.length;

	this._aliases=_.extend(
		{   'q':'quiet'
		  , 'v':'verbose'
		  , 'h':'help'
		}, optionAliases);

	this._helpText = helpText;
}

Api.prototype.constructor = Api;

Api.prototype.getRequiredParamNames = function() {
 	return this._paramNames;
}; 
Api.prototype.getHelp = function() {
 	return this._helpText;
}; 
Api.prototype._cli_exec = function(command_args) {
	command_args = require('minimist')(command_args.slice(1), { alias:this._aliases,boolean:true} );
	if (command_args._.length < this._numParams) {
		var missing = [];
		for (var i=command_args._.length; i<this._numParams; i++)
			missing.push(this._paramNames[i])
		throw new Error('Command \''+this._name+'\' is missing parameter(s) \'' + missing.join('\', \'') +'\''); // this is a valid user-error
	}
	var args = command_args._.slice(0,this._numParams); // clone the required parameters
	args.push(command_args); // ... and then add all the options received as the final param
	if (!_.isDefined(this[this._name]))
		throw new Error('API function ' + this._name + ' is missing'); // this is a bad food error by devs

	l.vlogd("api fn '"+this._name + "' exists: " + _.isFunction(this[this._name]))	
	return this[this._name].apply(this, args);
};

module.exports = function(commandName, requiredParamNames, optionAliases, helpText) {
	return new Api(commandName, requiredParamNames, optionAliases, helpText);
}

