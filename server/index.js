import express from 'express';
import cors from 'cors';
import { router } from './controller/controller.js';

function main() {
  const app = express();
  app.use(cors(), router);
  app.listen(3000);
  console.log('Server: run on port:3000');
}
main();
