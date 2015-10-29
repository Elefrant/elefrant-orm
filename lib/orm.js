'use strict';

var _ = require('lodash'),
	defaultOptions = require('../config/config.js'),
	Waterline = require('waterline');

module.exports = function (options, callback) {
	if (!options) {
		options = {};
	}

	var adapters = options.adapters || defaultOptions.adapters;
	var connections = options.connections || defaultOptions.connections;
	var collections = options.collections || defaultOptions.collections;
	var defaults = options.defaults || {};

	_(adapters)
		.each(function (def, identity) {
			if (!def) {
				return callback(new Error('failed to load adapters in orm elefrant module'));
			}

			// Make sure our adapter defs have `identity` properties
			def.identity = def.identity || identity;
		});

	var extendedCollections = [];

	_.forEach(collections, function (def, identity) {
		if (!def) {
			return callback(new Error('failed to load collections in orm elefrant module'));
		}

		// Make sure our collection defs have `identity` properties
		def.identity = def.identity || identity;

		// Fold object of collection definitions into an array
		// of extended Waterline collections.
		extendedCollections.push(Waterline.Collection.extend(def, {models: {}}));
	});

	// Instantiate Waterline and load the already-extended
	// Waterline collections.
	var orm = new Waterline();
	extendedCollections.forEach(function (collection) {
		orm.loadCollection(collection);
	});

	// Initialize Waterline
	// (and tell it about our adapters)
	orm.initialize({
		adapters: adapters,
		connections: connections,
		defaults: defaults
	}, function (err, models) {
		if (err) {
			callback(err);
		} else {
			orm._collections.forEach(function (collection) {
				collection.models = models.collections;
			});

			// Resolve models
			callback(null, models);
		}
	});
};
