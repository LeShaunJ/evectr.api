'use strict';

module.exports = function (Reflux) {

	return {
		App: 		Reflux.createActions([
			"connect",
			"pause",
			"progress",
			"identify",
			"disconnect",
		]),
		Nav: 		Reflux.createActions([
			"select",
		]),
		Content: 	Reflux.createActions([
			"setup",
			"build",
		]),
		Data: 		Reflux.createActions([
			"auth",
			"send",
			"receive",
		]),
	};

};
