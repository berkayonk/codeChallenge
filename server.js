/**
 * This class for creation of our local server.
 * This is where we declare ports that we will use.
 * 
 * @author  Berkay Önk
 */

const http = require('http');
const app = require('./app');

// Local server's ports
const port = process.env.port || 3000;

const server = http.createServer(app);

// wait for response
server.listen(port);