'use strict';

// Default options for waterline
module.exports = {
    // Default adapters
    adapters: {
        'sails-disk': require('sails-disk')
    },

    // Default collection
    collections: {},

    // Default connection
    connections: {
        disk: {
            adapter: 'sails-disk'
        }
    }
};
