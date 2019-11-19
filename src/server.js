import fs from 'fs';
import app from './app';

const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem'),
};

app.createServer(options, () => {}).listen(3030);
