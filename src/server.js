/*
import fs from 'fs';
import app from './app';

const options = {
  key: fs.readFileSync('certs/api.leonardosamara.key'),
  cert: fs.readFileSync('certs/api.leonardosamara.crt'),
};

app.createServer(options, () => {}).listen(3030);
*/

import fs from 'fs';
import http from 'http';
import https from 'https';
import app from './app';

const privateKey = fs.readFileSync(`${__dirname}/certs/cert.key`, 'utf8');
const certificate = fs.readFileSync(`${__dirname}/certs/cert.crt`, 'utf8');

const credentials = { key: privateKey, cert: certificate };

// your express configuration here

const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpsServer.listen(8443);
httpServer.listen(8080);
