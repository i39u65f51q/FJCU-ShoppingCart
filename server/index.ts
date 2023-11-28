import express, { Router, Express } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { TransactionTypeController } from './controller/TransactionType.controller';
import { MemberController } from './controller/Member.controller';
import { OrderController } from './controller/Order.controller';
import { OrderProductController } from './controller/OrderProduct.controller';
import { ProductController } from './controller/Product.controller';
import { DeliveryMethodController } from './controller/DeliveryMethod.controller';

function main(): void {
  const app: Express = express();
  const router: Router = Router();

  new MemberController(router); //會員
  new OrderController(router); //訂單
  new OrderProductController(router); //訂單商品
  new TransactionTypeController(router); //交易方式
  new ProductController(router); //商品
  new DeliveryMethodController(router); //運送方式

  app.use(bodyParser.json());
  app.use(cors(), router);

  app.listen(3000);
  console.log('Server: run on port:3000');
}
main();
