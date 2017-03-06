const server = require('./webpack/webpack.server.config.js');
const client = require('./webpack/webpack.client.config');

module.exports = [
    server,
    client,
];