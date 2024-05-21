require('dotenv').config();
const { initCRUD } = require('./crud.js');
const { startServer } = require('./server.js');

const { connect, disconnect } = require('./mongo.js');

connect().then(initCRUD).then(startServer).catch(console.log);
