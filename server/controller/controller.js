import { Router } from 'express';
import { MemberService } from '../service/Member.service.js';
import { ProductService } from '../service/Product.service.js';
import { OrderService } from '../service/Order.service.js';

export const router = Router();

router.get('/api/member', (req, res) => {
  const service = new MemberService();

  res.status(200).json({ content: [1, 2, 3] });
});

router.get('/api/member/:memberId', (req, res) => {
  const { memberId } = req.params;
  const service = new MemberService();

  res.status(200).json({ content: [1, 2, 3] });
});

router.get('/api/product', (req, res) => {
  console.log(req);
  const service = new ProductService();

  res.status(200).json({ content: [1, 2, 3] });
});

router.get('/api/order', (req, res) => {
  console.log(req);
  const service = new OrderService();

  res.status(200).json({ content: [1, 2, 3] });
});
