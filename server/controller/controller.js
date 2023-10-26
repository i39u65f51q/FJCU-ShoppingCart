import { Router } from 'express';
import { MemberService } from '../service/Member.service.js';
import { ProductService } from '../service/Product.service.js';
import { OrderService } from '../service/Order.service.js';

export const router = Router();

router.get('/api/member', (req, res) => {
  console.log(req);
  const service = new MemberService();
});

router.get('/api/member/:memberId', (req, res) => {
  console.log(req);
  const service = new MemberService();
});

router.get('/api/product', (req, res) => {
  console.log(req);
  const service = new ProductService();
});

router.get('/api/order', (req, res) => {
  console.log(req);
  const service = new OrderService();
});
