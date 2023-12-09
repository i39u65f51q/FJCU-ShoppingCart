//508062334 陳彥志
import express, { Router, Express } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { TransactionTypeController } from './controller/TransactionType.controller';
import { MemberController } from './controller/Member.controller';
import { OrderController } from './controller/Order.controller';
import { OrderProductController } from './controller/OrderProduct.controller';
import { ProductController } from './controller/Product.controller';
import { DeliveryMethodController } from './controller/DeliveryMethod.controller';
import { env } from './environment/env';

function main(): void {
  const app: Express = express();
  const router: Router = Router();

  new MemberController(router); //會員
  new OrderController(router); //訂單
  new OrderProductController(router); //訂單商品
  new TransactionTypeController(router); //交易方式
  new ProductController(router); //商品
  new DeliveryMethodController(router); //運送方式

  app.use(bodyParser.json()); //API Body封包解析
  app.use(cors(), router); //跨網域請求

  app.listen(env.port); //PORT
  console.log(`Server: run on port:${env.port}`);
}
main();
